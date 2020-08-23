import React from 'react'
import { Switch, Route } from 'react-router-dom';
import addproduct from './containers/addproduct';
import ProductDetails from './containers/productdetails'
import ProductList  from './containers/productlist'
import EditProduct from './containers/editprouct'
 
class Content extends React.Component {
    state = {}
    render() {
        return (
            <div style={{backgroundImage: "url(" + "https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/rm21-pd-sasi-03.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=cec9b4798fd70605e2a95fa61259c5db" + ")",}}>
                <Switch>
                   <Route path='/add' component={addproduct}></Route>
                    <Route path='/productlist' component={ProductList}></Route>
                    <Route path='/editproduct' component={EditProduct}></Route>
                    <Route path='/productdetails' component={ProductDetails}></Route>
                   
                
                </Switch>
            </div>
        );
    }
}

export default Content;