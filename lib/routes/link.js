const { Router } = require('express');
const Url = require('../model/Url');

module.exports = Router()
  .get('/:shortUrl', (req, res, next) => {

    let { shortUrl } = req.params;

    Url
      .findOne({ customUrl: shortUrl })
      .then(doc => {
        if(doc) res.redirect(doc.longUrl);
      })
      .then(() => {
        Url
          .findOne({ _id: shortUrl })
          .then(doc => {
            if(doc) {
              res.redirect(doc.longUrl);
            } else {
              throw new Error('no such url');
            }
          }).catch(next);
      });
  });

