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
          refresh();
        });
      }
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
