const { Router } = require('express');
const User = require('../model/User');

module.exports = Router()
  .get('/:userId', (req, res, next) => {

    let { userId } = req.params;

    User
      .findById(userId)
      .then(user => {
        if(user) {
          return user.urls;
        } else {
          throw new Error('no such user');
        }
      }).catch(next);
  });

