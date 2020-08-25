import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from "axios"
import displayProductBroadcast from '../actions/displayproductsbroadcaster'
import { Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import deleteProductBroadcast from '../actions/deleteproductbroadcaster';
import productClickedBroadcast from '../actions/productonclicked';
import 'bootstrap/dist/css/bootstrap.min.css';
import './products.css'
class ProductList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchValue: "",
            filteredProducts: []
        }
    }
    componentWillMount() {
        console.log("Mounting all products");
        this.allProducts()
    }

    componentDidMount() {
        console.log(this.props)
    }

    searchProduct = (event) => {
        let value = event.target.value
        if (value === "") {
            this.allProducts()
        }
        this.setState({ searchValue: value })
        console.log(value)
        let searchFilter = []
        searchFilter = this.props.products.filter(w => {
            return (w.name.toLowerCase().startsWith(value.trim().toLowerCase())) || (w.category.toLowerCase().startsWith(value.trim().toLowerCase()))
        })
        this.setState({ filteredProducts: searchFilter })
        console.log(searchFilter)
    }

    allProducts() {
        axios.get("http://localhost:3000/products")
            .then(response => {
                console.log(response)
                this.props.sendAllProduct(response.data)
            }, error => {
                console.log(error)
            })
    }

    getAllProducts = () => {
        if (this.state.searchValue !== "") {
            if (this.state.filteredProducts.length === 0) {
                return (<Alert>no products found</Alert>)
            }
            else {
                return this.state.filteredProducts.map(product => {
                    return (
                    <Card className = 'products'>
                    <Card.Img src={"images/" + product.image} alt="Card image cap" />
                    <Card.Body>
                         <Card.Title><u>{product.name}</u></Card.Title>
                        <Card.Subtitle>Price : {product.price}</Card.Subtitle>
                        <Card.Text>
                            Category : {product.category}<br></br>
                            Stock : {product.stock}<br />
                        </Card.Text>
                        <Link to='/edit'>
                            <Button variant="primary" onClick={() => this.editProduct(product)}>Edit</Button>
                        </Link> &nbsp;
                           <Button variant="danger" onClick={() => this.deleteProduct(product)}>Delete</Button>
                        <br />
                        <br/>
                    </Card.Body>
                </Card>
                    )
                })
            }
        }
        else{
        return this.props.products.map(product => {
            return (
                <Card className = 'products'>
                    <Card.Img src={"images/" + product.image} alt="Card image cap" />
                    <Card.Body>
                        <Card.Title><u>{product.name}</u></Card.Title>
                        <Card.Subtitle>Price : {product.price}</Card.Subtitle>
                        <Card.Text>
                            Category : {product.category}<br></br>
                            Stock : {product.stock}<br />
                        </Card.Text>
                        <Link to='/edit'>
                            <Button variant="primary" onClick={() => this.editProduct(product)}>Edit</Button>
                        </Link> &nbsp;
                           <Button variant="danger" onClick={() => this.deleteProduct(product)}>Delete</Button>
                        <br />
                    </Card.Body>
                </Card>
            )
        })
    }
}
    editProduct = (product) => {
        this.props.history.push({
            pathname: '/editproduct', 
            state: { product: product }
        })
        this.props.clickedProduct(product)
    }
    deleteProduct = (product) => {
        axios.delete('http://localhost:3000/products/' + product.id)
            .then(response => {
                this.allProducts()
            }, error => {
                console.log(error)
            })
    }

    render() {
        return (
            <div>
                <input type="text" className="searchtext" placeholder="Search.." name="search" value={this.state.searchValue} onChange={this.searchProduct}></input>
                <button type="submit" className="searchbutton" >Search</button><hr></hr>
                {this.getAllProducts()}
            </div>
        )
    }
}

function convertStoreToProps(store) {
    console.log("Received complete store")
    console.log(store)
    return {
        products: store.allproductsreducer,
        product: store.productClickedReducer,
    }
}

function convertEventToProps(dispatch) {
    return bindActionCreators({
        clickedProduct: productClickedBroadcast,
        sendAllProduct:displayProductBroadcast,
        deleteProduct: deleteProductBroadcast
    }, dispatch)
}

export default connect(convertStoreToProps, convertEventToProps)( ProductList);