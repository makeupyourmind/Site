var myApp = angular.module('myApp',[ ]);

myApp.controller('myController', ['$scope', '$http', function ($scope,$http){
  $scope.name = '';
  $scope.password = '';

  $scope.getUser = function ()
  {
      $http.get('getDb')
     .then(function(response)
     {
        $scope.dataset = response.data;
     });

  }

 $scope.delUser = function(recId)
  {
        console.log(recId);
        if(recId == 1)
        {
          alert("You can't do it");
        }
        else
      {
        if(confirm('Are you sure you want to delete this record ? '))
        {
          $http({method: 'GET', url: '/getDb/delUser?id='+recId})
          .then(function(response)
            {
                $scope.getUser();
            });
        }
      }
  }

   $scope.linkUser = function(Email)
    {
         $scope.dataLink = document.getElementById('addEmail').innerHTML = Email;
    }

   $scope.getUser();

}]);
