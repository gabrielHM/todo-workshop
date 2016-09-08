module.exports = function(pg){
  var dbUrl = "postgres://postgres:colegio802@192.168.230.129:5432/todo";
  var createTodo = "CREATE TABLE IF NOT EXISTS todo(_id uuid PRIMARY KEY, task text);";
  pg.connect(dbUrl, function(err, client, done) {

  if(err) {
    return console.error('error fetching client from pool', err);
  }

    client.query(createTodo, function(err, result) {
      //call `done()` to release the client back to the pool
      done();
      if(err) {
        return console.error('error running query', err);
      }
    });

  });
}
