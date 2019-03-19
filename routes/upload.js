const router = require('express').Router();
const moment = require('moment');

const debug = require('../helpers/debugMessages');

const { put, get } = require('../helpers/api');

const { UPLOAD_TARGET } = process.env;

router.post('/fileDummy', (req, res) => {
  res.send('Cheers luv');
});

router.post('/file', (req, res) => {
  const datestamp = moment().format('YYYYMMDD HHmm');

  if (Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  get(`/me/drive/root/children`)
    .then(childrenResponse => {
      const uploadDirectory = childrenResponse.value.filter(item => item.name === UPLOAD_TARGET)[0];

      if (uploadDirectory.length === 0) {
        res.status(500).send('Upload directory does not exist');
        return;
      }

      if (req.files.file.length > 0) {
        const uploads = req.files.file.map(({ name, mimetype, data }) =>
          put(
            `/me/drive/items/${uploadDirectory.id}:/${datestamp} - ${encodeURIComponent(name)}:/content`,
            {
              headers: { 'Content-Type': mimetype },
            },
            data
          )
        );

        Promise.all(uploads).then(values => {
          res.json(values.map(({ webUrl, size, file }) => ({ webUrl, size, file })));
        });
      } else {
        const { name, mimetype, truncated, data } = req.files.file;
        put(
          `/me/drive/items/${uploadDirectory.id}:/${datestamp} - ${encodeURIComponent(name)}:/content`,
          {
            headers: { 'Content-Type': mimetype },
          },
          data
        )
          .then(uploadResponse => {
            const { webUrl, size, file } = uploadResponse;
            res.json({ webUrl, size, file });
          })
          .catch(error => {
            debug("Couldn't upload the file.");
            res.status(500).json(error.response);
            console.error(error);
          });
      }
    })
    .catch(listError => {
      debug("Couldn't get directory listing.");
      res.status(500).send(listError);
    });
});

module.exports = router;
