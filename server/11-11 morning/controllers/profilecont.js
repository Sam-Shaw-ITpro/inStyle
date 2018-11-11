var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var Profile = sequelize.import('../models/profile');
var validateSession = require('../middleware/validate-session');

// MAKE A DELETE USER??

// find user only
router.get('/all/:id', validateSession, function (req, res) {
  Profile.findAll()
    .then(
      function findAllSuccess(data) {
        res.json(data);
      },
      function findAllError(err) {
        res.send(500, err.message);
      }
    );
});

router.put('/update/:id', validateSession, function (req, res) {
  var data = req.params.id;
  Profile.update({
    description: req.body.log.description,
    definition: req.body.log.definition,
    result: req.body.log.result
  },
    { where: { id: data } }
  ).then(
    function updateSuccess(updatedLog) {
      res.json({
        logdata: updatedLog
      });
    },
    function updateError(err) {
      res.send(500, err.message);
    }
  )
});

router.post('/create', validateSession, function (req, res) {
  if (!req.errors) {
    let des = req.body.log.description; //added log
    let def = req.body.log.def;  //added log
    let resu = req.body.log.result;  //added log
    let own = req.user.id;

    Profile.create({
      description: des,
      definition: def,
      result: resu,
      owner: own
    }).then(
      function (log) {   //  adding log
        res.send(log);  // log here too
        // console.log(log);
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

  Profile.destroy({
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