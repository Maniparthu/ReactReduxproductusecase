import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import deleteProductBroadcast from '../actions/deleteproductbroadcaster'
import axios from 'axios'
import { withRouter } from 'react-router-dom';
 
class ProductDetails extends React.Component{

    
    deleteProduct=()=>{
        axios.delete("http://localhost:3000/products/"+this.props.product.id)
        .then(response=>{
            console.log(response);
            console.log("Product with id: "+this.props.product.id+" and name: "+this.props.product.name+" deleted")
            this.allProducts()
        }, error=>{})
    }
    editProduct = (event) => {
        event.preventDefault()
        this.props.history.push('/editproduct')
    }
    render(){
        if (this.props.product === null) {
            return (
                <div>
                    <h2 style={{color:'blue'}}>Select the Product to display details </h2>
                </div>
            )
        }
        return(
            <div>
                 <h2>Product Details</h2>
                Name:{this.props.product.name}  <br></br>
                price:{this.props.product.price} <br></br>
                category:{this.props.product.category} <br></br>
                stock:{this.props.product.stock}     <br></br>
                <button onClick={this.deleteProduct}>Delete</button>
                <button onClick={this.editProduct}>Edit</button>
            </div>
        )
    }
}

function convertStoreToProps(store) {
    console.log("Product detail received from store")
    console.log(store)
    return {
        product: store.productClicked
    }
}
function eventDispatch(dispatch){
    return bindActionCreators({
        delete:deleteProductBroadcast
    },dispatch)
}
export default withRouter(connect( convertStoreToProps,eventDispatch) (ProductDetails))