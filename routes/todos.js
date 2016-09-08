var express = require('express');
var router = express.Router();
var pg = require('pg');
var uuid = require('uuid');
var getAllTodos = 'SELECT * from todo;';
var dbUrl = 'postgres://postgres:colegio802@192.168.230.129:5432/todo';

/* GET home page. */

router.get('/', function(req, res, next) {

    pg.connect(dbUrl, function(err, client, done) {

        if (err) {
            return console.error('error fetching client from pool', err);
        }

        client.query(getAllTodos, function(err, result) {
            //call `done()` to release the client back to the pool

            if (err) {
                res.send(err);
            }

            res.json(result.rows);
            done();
        });

    });
});

router.post('/', function(req, res, next) {
    var createTodo = "INSERT INTO todo VALUES($1, $2)";
    // Generate a v4 (random) id
    var postId = uuid.v4();
    pg.connect(dbUrl, function(err, client, done) {

        if (err) {
            return console.error('error fetching client from pool', err);
        }
        client.query(createTodo, [postId, req.body.task], function(err, result) {
            //call `done()` to release the client back to the pool

            if (err) {
                res.send(err);
            }
            done();
        });
        client.query(getAllTodos, function(err, result) {
            //call `done()` to release the client back to the pool

            if (err) {
                res.send(err);
            }
            res.json(result.rows);
            done();
        });

    });

});

router.delete('/:id', function(req, res, next) {
  var deleteTodo = "DELETE FROM todo WHERE _id=$1"
  console.log("From delete route");
  console.log(req.params.id);
  pg.connect(dbUrl, function(err, client, done) {

      if (err) {
          return console.error('error fetching client from pool', err);
      }
      client.query(deleteTodo, [req.params.id], function(err, result) {
          //call `done()` to release the client back to the pool

          if (err) {
              res.send(err);
          }
          done();
      });
      client.query(getAllTodos, function(err, result) {
          //call `done()` to release the client back to the pool

          if (err) {
              res.send(err);
          }
          res.json(result.rows);
          done();
      });

  });
});



module.exports = router;
