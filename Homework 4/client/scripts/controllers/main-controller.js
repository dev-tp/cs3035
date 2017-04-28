angular
  .module('mainController', [])
  .controller('MainController', function($http, $scope) {
    $scope.addReminder = function() {
      if ($scope.title && $scope.due) {
        var todo = {
          title: $scope.title,
          description: $scope.description,
          due: $scope.due,
          done: false
        };

        $http.post('/todolist', todo).then(function(response) {
          $scope.title = '';
          $scope.description = '';
          $scope.due = '';

          refresh();
        }, function(error) {
          console.log('[ ERROR ]' + JSON.stringify(error));
        });
      }
    };

    $scope.changeState = function(id, state) {
      $http.get('/todolist/done/' + id + '/' + state).then(function(response) {
        refresh();
      }, function(error) {
        console.log('There was an error updating: ' + id);
        console.log(error);
      });
    };

    $scope.getTodo = function(todo) {
      $scope.todo = {
        _id: todo._id,
        title: todo.title,
        description: todo.description,
        due: todo.due,
        done: false
      };
    };

    $scope.remove = function(id) {
      $http.get('/todolist/remove/' + id).then(function(response) {
        refresh();
      }, function(error) {
        console.log('There was an error removing: ' + id);
        console.log(error);
      });
    };

    function refresh() {
      $http.get('/todolist').then(function(response) {
        $scope.todos = response.data;
      }, function(error) {
        console.log('There was an error refreshing the page!');
      });
    }

    refresh();
  });
