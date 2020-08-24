
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import  addProductBroadcast from '../actions/addproductbroadcaster'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
}
class AddProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            image:"",
            name: "",
            category: "",
            price: 0,
            stock: "",
            errors: {
                nameError: "",
                categoryError: "",
                priceError: "",
                stockError: ""
            },
            buttonStatus: true
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        validateForm(this.state.errors)
            this.setState({ buttonStatus: false })
   }

    
    getName = (event) => {
        console.log(event)
        console.log(event.target)
        console.log(event.target.value)
        let errors = this.state.errors
        errors.nameError = "" || (!event.target.value.trim().match(/^([a-zA-Z0-9 _-]+)$/)) ? "Only non-empty alphanumeric values allowed !!" : ""
        this.setState({
            name: event.target.value
        })

    }
    getCategory = (event) => {
        console.log(event)
        console.log(event.target)
        console.log(event.target.value)
        let errors = this.state.errors
        errors.categoryError = event.target.value === "" ? "Select a category !!" : ""
        this.setState({ category: event.target.value })

    }
    getPrice = (event) => {
        console.log(event)
        console.log(event.target)
        console.log(event.target.value)
        let errors = this.state.errors
        errors.priceError = (!event.target.value.match(/^(?:[1-9]\d*)(?:\.(?!.*000)\d+)?$/)) ? "Invalid price !!" : ""
        this.setState({
            price: event.target.value
        })

    }
   
    
    getStock = (event) => {
        console.log(event)
        console.log(event.target)
        console.log(event.target.value)
        let errors = this.state.errors
        errors.stockError = event.target.value === "" ? "Select stock availability !!" : ""
        this.setState({
            stock: event.target.value
        })

    }
    getImage= (event) => {
        console.log(event)
        console.log(event.target)
        console.log(event.target.value)
        this.setState({image: event.target.value.substr(12)})

    }
    allProducts() {
        axios.get("http://localhost:3000/products")
            .then(response => {
                console.log(response)
                this.props.newProduct(response.data)
            }, error => {
                console.log(error)
            })
    }

    addProduct = (event) => {
        
            event.preventDefault()
            let product = {
                image:this.state.image,
                name: this.state.name,
                category: this.state.category,
                price: this.state.price,
                stock: this.state.stock
            }
            axios.post("http://localhost:3000/products", product)
                .then(response => {
                    console.log(response)
                    console.log("New Product Added !")
                    this.allProducts()
                    this.props.history.push('/productlist')
                }, error => {
                    console.log(error)
                })

                                            
    }
    

    render() {
        const { errors } = this.state;
         
      
        let Cointainer={
              
            marginLeft:'200px',
            marginRight:'200px',
            marginTop: '0px',
             padding: '25px',   
             backgroundColor: 'lightblue',
             opacity: '0.8'  
    }
    let CBButtonStyle={
              
        backgroundColor: 'blueviolet',   
        width: '70px',  
         color: 'orange',   
         padding: '10px',   
         margin: '50px  0px', 
         border: 'none',   
         cursor: 'pointer',
         borderRadius: '15px',  
         boxShadow: '2px 3px',
        float:'right'
         
        
           
}
const textStyle = {
    width:'40%',
    padding:'6px 10px',
    marging: '8px 0',
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center'
    
}
        return (
            <div className="form">
            <div>
                <form name="form" onChange={this.handleSubmit} style={Cointainer}>
                    <h2>Add Product</h2>
                    <div className="name">
                        <label htmlFor="name">Name:</label> &emsp;  &emsp;
                            <input type="text" style={textStyle} id="name" onChange={this.getName}
                            placeholder="Product Name *" noValidate />
                        <br></br>
                        {errors.nameError.length > 0 && (
                            <span className="error">{errors.nameError}</span>
                        )}
                    </div><br />
                    <div>
                        <label>Category:</label> &emsp;
                            <select defaultValue={this.state.selectValue} id="category" style={textStyle}
                            onChange={this.getCategory}
                        >
                            <option value="">--select--</option>
                            <option value="Mobiles">Electronics</option>
                            <option value="Laptops">Clothing</option>
                            <option value="Cameras">Stationary</option>
                        </select>
                        <br></br>
                        {errors.categoryError.length > 0 && (
                            <span className="error">{errors.categoryError}</span>
                        )}
                    </div><br />
                    <div className="price">
                        <label htmlFor="price">Price:</label> &emsp;  &emsp;  &nbsp;
                            <input
                            type="number" name="price" style={textStyle} id="price" onChange={this.getPrice} required
                            placeholder="Product Price *"
                            noValidate />
                        <br></br>
                        {errors.priceError.length > 0 && (
                            <span className="error">{errors.priceError}</span>
                        )}

                    </div><br />
                  
                    <div className="stock">
                        <label htmlFor="stock">Stock Available:</label> &emsp; &emsp; &nbsp;
                        <input type='number' defaultValue={this.state.selectValue} id="stock" style={textStyle}
                            onChange={this.getStock}
                        />
                          
                        <br></br>
                        {errors.stockError.length > 0 && (
                            <span className="error">{errors.stockError}</span>
                        )}
                    </div><br />
                    <label>IMAGE</label> &nbsp;

                  <input type="file" defaultValue={this.state.selectValue} id="file-id" name="file_name"  style={textStyle} onChange={this.getImage} multiple accept='image/*'></input>
                <div >
                   
                        <button data-testid='button' disabled={this.state.buttonStatus} style={CBButtonStyle} onClick={this.addProduct}>Add</button>
                    </div>
                    <br />
                </form>
            </div>
            </div>
        );
    }
}

function convertPropsToEvent(dispatch) {
    return bindActionCreators({
        newProduct: addProductBroadcast
    }, dispatch)
}
export default connect(null, convertPropsToEvent)(AddProduct);