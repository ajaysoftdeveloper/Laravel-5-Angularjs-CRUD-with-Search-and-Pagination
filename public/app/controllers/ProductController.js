app.controller('AdminController', function($scope,$http){
 
  $scope.pools = [];
   
});

app.controller('ProductController', function(dataFactory,$scope,$http,apiUrl){
 
  $scope.data = [];
  $scope.libraryTemp = {};
  $scope.totalProductsTemp = {};

  $scope.totalProducts = 0;
  $scope.pageChanged = function(newPage) {
    getResultsPage(newPage);
  };

  getResultsPage(1);
  function getResultsPage(pageNumber) {
      if(! $.isEmptyObject($scope.libraryTemp)){
          dataFactory.httpRequest(apiUrl+'/products?search='+$scope.searchText+'&page='+pageNumber).then(function(data) {
            $scope.data = data.data;
            $scope.totalProducts = data.total;
          });
      }else{
        dataFactory.httpRequest(apiUrl+'/products?page='+pageNumber).then(function(data) {
          console.log(data);
          $scope.data = data.data;
          $scope.totalProducts = data.total;
        });
      }
  }

  $scope.searchDB = function(){
      if($scope.searchText.length >= 3){
          if($.isEmptyObject($scope.libraryTemp)){
              $scope.libraryTemp = $scope.data;
              $scope.totalProductsTemp = $scope.totalProducts;
              $scope.data = {};
          }
          getResultsPage(1);
      }else{
          if(! $.isEmptyObject($scope.libraryTemp)){
              $scope.data = $scope.libraryTemp ;
              $scope.totalProducts = $scope.totalProductsTemp;
              $scope.libraryTemp = {};
          }
      }
  }

  $scope.saveAdd = function(){
    dataFactory.httpRequest('products','POST',{},$scope.form).then(function(data) {
      $scope.data.push(data);
      $(".modal").modal("hide");
    });
  }

  $scope.edit = function(id){
    dataFactory.httpRequest(apiUrl+'/products/'+id+'/edit').then(function(data) {
    	console.log(data);
      	$scope.form = data;
    });
  }

  $scope.saveEdit = function(){
    dataFactory.httpRequest(apiUrl+'/products/'+$scope.form.id,'PUT',{},$scope.form).then(function(data) {
      	$(".modal").modal("hide");
        $scope.data = apiModifyTable($scope.data,data.id,data);
    });
  }

  $scope.remove = function(product,index){
    var result = confirm("Are you sure delete this product?");
   	if (result) {
      dataFactory.httpRequest(apiUrl+'/products/'+product.id,'DELETE').then(function(data) {
          $scope.data.splice(index,1);
      });
    }
  }
   
});