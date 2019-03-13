const axios = require('axios');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const moment = require('moment');
const sh = require('string-hash');
const cache = require('memory-cache');

const paths = require('../paths');

const { HOST, PORT } = process.env;

const debug = require('./debugMessages');
const fetchToken = require('./fetchToken');

const api = 'https://graph.microsoft.com/v1.0';

const getToken = () =>
  new Promise((resolve, reject) => {
    debug('getToken() called');
    if (!fs.existsSync(paths.token)) {
      debug(`Couldn't locate the token file: ${paths.token}`);
      reject(
        new Error(
          `No saved token.\nPlease reinitialise authorisation by going to http://${HOST}:${PORT}/token/initialiseAuthorisationFlow .`
        )
      );
    } else {
      debug('Token file exists.');
      const token = fs.readFileSync(paths.token);
      const decodedToken = jwt.decode(token);

      const decodedTokenExpiry = moment(decodedToken.exp * 1000);

      if (decodedTokenExpiry.isBefore(moment())) {
        debug(
          `Token has expired (${decodedTokenExpiry.format(
            'DD MM YYYY, HH mm ss'
          )} is older than ${moment().format('DD MM YYYY, HH mm ss')}`
        );

        if (!fs.existsSync(paths.refreshToken)) {
          debug(`No refresh token found. File ${paths.refreshToken} doesn't exist.`);
          reject(
            new Error(
              `No saved refresh token.\nPlease reinitialise authorisation by going to http://${HOST}:${PORT}/token/initialiseAuthorisationFlow .`
            )
          );
        } else {
          const refreshToken = fs.readFileSync(paths.refreshToken);
          debug('Picking up the refresh token.');

          if (!refreshToken) {
            debug('Refresh token is empty.');
            reject(
              new Error(
                `Token has expired and there is no refresh token available.\nPlease reinitialise authorisation by going to http://${HOST}:${PORT}/token/initialiseAuthorisationFlow .`
              )
            );
          } else {
            debug('Got the token, now to fetch a new access token.');
            fetchToken({ refreshToken })
              .then(newToken => {
                debug(`Success! Got a new token: ${newToken.slice(0, 32)}...`);
                resolve(newToken);
              })
              .catch(error => {
                debug(`Failed to fetch a new token. ${error}`);
                reject(new Error(`Unable to get token.\n${error}`));
              });
          }
        }
      } else {
        debug('Token is still valid. NOT requesting a new token.');
        resolve(token);
      }
    }
  });

const get = endpoint =>
  new Promise((resolve, reject) => {
    getToken()
      .then(token => {
        const { upn } = jwt.decode(token);
        const cacheKey = sh(`${upn}_${endpoint}`);
        const cachedData = cache.get(cacheKey);

        if (cachedData) {
          debug(`Cached data found (key: ${cacheKey}). Returning cached data.`);
          resolve(cachedData);
        } else {
          axios
            .get(`${api}${endpoint}`, {
              headers: { authorization: `Bearer ${token}` },
              debug: process.env.NODE_ENV === 'development',
            })
            .then(response => {
              debug(`No cache found for key: ${cacheKey}. Returning fresh data.`);
              cache.put(cacheKey, response.data, 5 * 60 * 1000);
              resolve(response.data);
            })
            .catch(error => reject(error));
        }
      })
      .catch(error => reject(error));
  });

// const post = (endpoint, body) => new Promise((resolve, reject) => {});

const put = (endpoint, options, data) =>
  new Promise((resolve, reject) => {
    getToken()
      .then(token => {
        const request = `${api}${endpoint}`;
        const headers = { authorization: `Bearer ${token}`, ...options.headers };
        console.log(`Doing ${request}, with data ${data.toString().slice(0, 32)}, with headers ${JSON.stringify(headers)}`);
        axios
          .put(request, data, {
            headers,
          })
          .then(response => resolve(response.data))
          .catch(requestError => reject(requestError));
      })
      .catch(error => reject(error));
  });

module.exports = {
  get,
  put,
  //  post,
};
