import React from 'react';
import ReactDOM from 'react-dom'
import AddProduct  from '../containers/addproduct'
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup)

it('mybutton renders without crashing', ()=>{
    const div = document.createElement('div')
    ReactDOM.render(<AddProduct></AddProduct>, div)
})


it('check if button renders in correct way', ()=>{
    const {getByTestId} = render(<AddProduct label='click me'></AddProduct>)
    expect(getByTestId('button')).toHaveTextContent('Hello click me')
})


it('check if button renders in correct way', ()=>{
    const {getByTestId} = render(<AddProduct label='add'></AddProduct>)
    expect(getByTestId('button')).toHaveTextContent('add')
})
