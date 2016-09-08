//This is our application service in charge of doing the server requests.
app.service('todoService', function($http) {

    this.getAll = function() {
        return $http.get('/todos');
    }

    this.add = function(task) {
        return $http.post('/todos', {
            task: task
        });
    };

    this.delete = function(_id) {
        return $http.delete('/todos/'+_id);
    };


});
