function apiModifyTable(originalData,id,response){
    angular.forEach(originalData, function (product,key) {
        if(product.id == id){
            originalData[key] = response;
        }
    });
    return originalData;
}