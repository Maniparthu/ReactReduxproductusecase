const displayProductBroadcast=function(products){
    console.log("Received all products");
    console.log(products);
    console.log("Reducer will capture the event and payload..")
    return({
        type:"ALL_PRODUCT",
        payload:products
    })
}

export default displayProductBroadcast