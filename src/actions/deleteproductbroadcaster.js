const deleteProductBroadcast=function(product){
    console.log("Received product for delete");
    console.log(product);
    console.log("Reducer will capture the event and payload..")
    return({
        type:"DELETE_PRODUCT",
        payload:product
    })
}

export default deleteProductBroadcast