var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var Favorites = sequelize.import('../models/favorites');
var validateSession = require('../middleware/validate-session');

router.get('/all', validateSession, function (req, res) {
    Favorites.findAll()
    .then(
      function findAllSuccess(data) {
        res.json(data);
      },
      function findAllError(err) {
        res.send(500, err.message);
      }
    );
});

// router.post('/create', validateSession, function (req, res) {
//   if (!req.errors) {
//     let col = req.body.fav.color; //added log
//     let bor = req.body.fav.bordercolor;  //added log
//     let fSiz = req.body.fav.fSize;  //added log
//     let own = req.user.id;


router.post('/create', validateSession, function (req, res) {
  if (!req.errors) {
    let col = req.body.color; //added log
    let bor = req.body.bordercolor;  //added log
    let fSiz = req.body.fSize;  //added log
    let own = req.user.id;
console.log('log it sam - favcont' + own)
    Favorites.create({
      color: col,
      bordercolor: bor,
      fSize: fSiz,
      owner: own
    }).then(
      function (log) {   //  adding log
        res.send(log);  // log here too
        console.log(log);
      },
      function (err) {
        console.log(err);
      }
    )
  } else {
    res.status(500).json(req.errors);
  }
})

router.delete('/delete/:id', validateSession, function (req, res) {
  let id = req.body.log.id;

  Favorites.destroy({
    where: { id: id }
  })
    .then(
      function () {
        res.send("DELETED");
      },
      function (err) {
        console.log(err)
      }
    )
})

module.exports = router;