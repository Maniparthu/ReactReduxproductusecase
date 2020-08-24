
const editClicked=function(product){
    console.log(product);
    console.log("Reducer will capture the event and payload..")
    return({
        type:"EDIT_PRODUCT",
        payload:product
    })
}

export default editClicked