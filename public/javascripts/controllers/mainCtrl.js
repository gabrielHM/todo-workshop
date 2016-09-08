// Our app main controller. It will be in charge of the data binding.
app.controller('MainCtrl', function($scope, todoService) {

    /*This calls our getAll function from our todo service to populate todo
    list when 'home' is loaded.*/
    todoService.getAll().success(function(data) {
        $scope.todos = data;
    }).error(function(data, status) {
        console.log(data, status);
        $scope.todos = [];
    });

    /*Calls our add function from our todo service and updates todo list */
    $scope.newTodo = function(task) {
        todoService.add(task).success(function(data) {
            $scope.task = '';
            $scope.todos = data;
        }).error(function(data, status) {
            console.log(data, status);
            $scope.todos = [];
        });
    };
    /*Calls our delete function from our todo service and updates todo list */
    $scope.deleteTodo = function(_id) {
        todoService.delete(_id).success(function(data) {
            $scope.todos = data;
        }).error(function(data, status) {
            console.log(data, status);
            $scope.todos = [];
        });
    };

});
