const productClickedBroadcast=function(product){
    console.log("Received product");
    console.log(product);
    console.log("Reducer will capture the event and payload..")
    return({
        type:"PRODUCT_CLICKED", 
        payload:product
    })
}

export default productClickedBroadcast