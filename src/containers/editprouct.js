import React from 'react';
import { Button } from "react-bootstrap";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import editClicked from '../actions/editproductbroadcaster'
import { Link } from 'react-router-dom';

const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
}
class EditProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.product.id,
            name: this.props.product.name,
            category: this.props.product.category,
            price: this.props.product.price,
            stock: this.props.product.stock,
            image: this.props.product.image,
            errors: {
                nameError: '',
                priceError: '',
                catError: '',
                imgError: '',
                stockError: ''
            },
            buttonStatus: true
        }

    }
    handleSubmit = e => {
        e.preventDefault()
        if (validateForm(this.state.errors)) {
            this.setState({ buttonStatus: false })
        } else {
            this.setState({ buttonStatus: true })
        }
    }

    checkValidation = () => {
        console.log('checking')
        console.log(this.props.edit);
        let errors = this.state.errors
        if (this.state.name === '') {
            this.setState({ buttonStatus: true })
            errors.nameError = 'Product Name must not be empty'
            return false
        }
        if (this.state.image === '') {
            this.setState({ buttonStatus: true })
            errors.imgError = 'Please attach image'
            return false
        }
        if (this.state.price === 0) {
            this.setState({ buttonStatus: true })
            errors.priceError = 'Price field cannot be empty'
            return false
        }
        if (this.state.category === '') {
            this.setState({ buttonStatus: true })
            errors.catError = 'Please select respective category'
            return false
        }
       
        if (this.state.stock === '') {
            this.setState({ buttonStatus: true })
            errors.stockError = 'Stock field cannot be empty'
            return false
        }

        return true
    }

    getId = (event) => {
        let errors = this.state.errors;
        errors.priceError = (!event.target.value.match(/^(?:0|[1-9]\d*)?$/)) ? "ID is invalid!!" : ""
        this.setState({ id: event.target.value })
    }
    getName = (event) => {
        let errors = this.state.errors;
        errors.nameError = "" || (!event.target.value.match(/^([a-zA-Z0-9_-]+)$/)) ? " Product Name shouldn't be empty" : ""
        this.setState({ name: event.target.value })
    }


    getPrice = (event) => {
        let errors = this.state.errors;
        errors.priceError = (!event.target.value.match(/^(?:0|[1-9]\d*)(?:\.(?!.*000)\d+)?$/)) ? "Price is invalid!!" : ""
        this.setState({ price: event.target.value })
    }

    
    getCategory = (event) => {
        this.setState({ category: event.target.value })
    }

    getStock = (event) => {
        this.setState({ stock: event.target.value })
    }
    getImage = (event) => {
        this.setState({ image: event.target.value.substr(12) })
    }
    allProducts() {
        axios.get("http://localhost:3000/products")
            .then(response => {
                console.log(response)
                this.props.edit(response.data)
            }, error => {
                console.log(error)
            })
    }
    editProduct = () => {
        if (this.checkValidation()) {
            let product = {
                id: this.state.id,
                name: this.state.name,
                
                category: this.state.category,
                price: this.state.price,
                stock: this.state.stock,
                image: this.state.image
            }
            axios.put('http://localhost:3000/products/' + product.id, product)
                .then(response => {
                    console.log(response);
                    this.allProducts()
                }, error => {
                    console.error(error)
                })
        }
    }
    render() {
        const { errors } = this.state;
        const textStyle = {
            width: '40%',
            padding: '12px 20px'
        }
        const errorStyle = {
            color: 'red'
        }
        let Cointainer={
              
            marginLeft:'200px',
            marginRight:'200px',
            marginTop: '0px',
             padding: '25px',   
             backgroundColor: 'lightblue',
             opacity: '0.8'  
    }
        return (
            <div>
            <div className="form"> 
                <form name="form" onChange={this.handleSubmit} style={Cointainer}>
                    <h3>Edit Product</h3>
                    <div>
                        <label>Product Id  </label> &emsp;  &emsp; &emsp; &emsp; &emsp;
                            <input type="text" style={textStyle} value={this.state.id} onChange={this.getId} readOnly />
                    </div><br />
                    <div className="name">
                        <label htmlFor="name"> Product Name</label> &emsp; &emsp; &emsp; &nbsp;
                            <input type="text" style={textStyle} id="name" value={this.state.name} onChange={this.getName}
                            placeholder="Product Name *" noValidate />
                        <br></br>
                        {errors.nameError.length > 0 && (
                            <span style={errorStyle} className="error">{errors.nameError}</span>
                        )}
                    </div><br />
                   
                    <div className="price">
                        <label htmlFor="price">Product Price</label> &emsp;&emsp;&emsp; &ensp; &nbsp;
                            <input
                            type="number" name="price" style={textStyle} id="price" value={this.state.price} onChange={this.getPrice} required
                            placeholder="Product Price *"
                            noValidate />
                        <br></br>
                        {errors.priceError.length > 0 && (
                            <span style={errorStyle} className="error">{errors.priceError}</span>
                        )}
                    </div><br />
                    <div className="category">
                        <label htmlFor="category"> Product Category</label> &ensp;&emsp;&emsp;
                            <select defaultValue={this.state.selectValue} id="category" value={this.state.category} style={textStyle}
                            onChange={this.getCategory} noValidate
                        >
                            <option value="">--select--</option>
                            <option value="Mobiles">electronics</option>
                            <option value="Laptops">clothing</option>
                            <option value="Cameras">stationary</option>
                        </select>
                        <br></br>
                        {errors.catError.length > 0 && (
                            <span style={errorStyle} className="error">{errors.catError}</span>
                        )}
                    </div><br />

                   
                    <div className="stock">
                        <label htmlFor="stock">Product Stock</label> &emsp; &emsp;&emsp; &ensp;
                        <input type='number' defaultValue={this.state.selectValue} id="stock" value={this.state.stock} style={textStyle}
                            onChange={this.getStock}
                        />
                             
                        <br></br>
                        {errors.stockError.length > 0 && (
                            <span style={errorStyle} className="error">{errors.stockError}</span>
                        )}
                    </div><br />
                    <div>
                        <label>Product Image: </label> &emsp; &ensp;
                        <input type="file" style={textStyle} onChange={this.getImage} multiple accept='images/*' />
                        <br></br>
                        {errors.imgError.length > 0 && (
                            <span className="error">{errors.imgError}</span>
                        )}
                    </div> <br></br>
                    <div>
                        <Link to='/productlist'>
                            <Button variant="primary" disabled={this.state.buttonStatus} onClick={this.editProduct}>Save</Button>
                        </Link>
                        <br />
                        <Link to='/productlist'>
                            <Button style={{ float: 'right' }} variant="danger" >Cancel</Button>
                        </Link>
                    </div>
                    <br />
                </form>
            </div>
            </div>
        );
    }
}

function convertStoreToPropsForProductDetail(store) {
    console.log("ProductDetail has received store....")
    console.log(store);
    return {
        product: store.editProductclicked
    }
}
function eventDispatch(dispatch) {
    return bindActionCreators({
         edit: editClicked }, dispatch)
}

export default connect(convertStoreToPropsForProductDetail, eventDispatch)(EditProduct);