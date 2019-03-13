const router = require('express').Router();
const fs = require('fs');

const debug = require('../helpers/debugMessages');

const { put, get } = require('../helpers/api');

router.post('/file', (req, res) => {
  const { parentId } = req.body;
  const { name, mimetype, data } = req.files.file;

  if (!name) {
    res.status(400).send('No file specified.');
  }

  get(`/me/drive/root/children`)
    .then(response => {
      const uploadDirectory = response.value.filter(item => item.name === 'upload_test')[0];

      console.log(uploadDirectory)

      if (uploadDirectory.length === 0) {
        res.status(500).send('Upload directory does not exist');
      } else {
        put(
          `/me/drive/items/${uploadDirectory.id}:/${name}:/content`,
          {
            headers: { 'Content-Type': mimetype },
          },
          data
        )
          .then(response => {
            const { webUrl, size, file } = response;
            res.json({ webUrl, size, file });
          })
          .catch(error => {
            debug("Couldn't upload the file.");
            res.status(500).send(error.response.data);
          });
      }
    })
    .catch(listError => {
      debug("Couldn't get directory listing.");
      console.log(listError);
      res.status(500).send(listError);
    });
});

module.exports = router;
