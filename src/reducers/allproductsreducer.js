const allProductReducer = function allProductReducer(state = null, action) {
    var products = []

    switch (action.type) {
        case "ALL_PRODUCT":
            console.log("All products loaded !")
            console.log(action.payload)
            return action.payload
        case "ADD_PRODUCT":
            return action.payload
        case "EDIT_PRODUCT":
            return action.payload
        case "PRODUCT_CLICKED":
            return state
        case "EDIT_CLICKED":
            return state
        case "DELETE_PRODUCT":
            console.log(action.payload)
            return action.payload
        default:
            break
    }

    return products
}

export default allProductReducer