import AddProductForm from './AddProductForm'
import ProductList from './ProductList'
import { ProductContext } from '../ContextApi/ProductContext'
import React, { useContext, useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom';
function Index() {
    const navigate = useNavigate();
    useEffect(() => {
        console.log(localStorage.getItem('user-info'));
        if(localStorage.getItem('user-info') == null) {
            navigate("/");
        }
    }, [])

    const [list, setList] = useState([
        {
            id: 1,
            name: "Product1",
            price: 10
        },
        {
            id: 2,
            name: "Product2",
            price: 20
        },
        {
            id: 3,
            name: "Product3",
            price: 30
        }
    ]);
    useEffect(() => {
        console.log('list', list);
    })
    const pushInToList = (formData) => {
        setList((listTemp) => {
            const a = [...listTemp];
            a.push(formData);
            return a;
        });
    }
    const removeFromList = (id) => {
        let newList = list.filter(function(e){
            return id !== e.id;
          });
          console.log(newList);
          setList(newList);
    }
    const [show, setShow] = useState(false);

    const searchList = (value) => {
        let newList = list.map(function(e){
            const  pat = RegExp(value, 'i');
            if(pat.test(e.name) || pat.test(e.price)) {
                e.search = true;
            } else {
                e.search = false;
            }
            return e;
          });
          console.log(newList);
          setList(newList);
    }
    return (
        <div>
            <button onClick={() => {
            localStorage.removeItem("user-info");
            navigate("/");
        }} className='btn btn-danger' style={{position:'fixed', top: '1rem', right:'1rem'}}>Log Out</button>
            <ProductContext.Provider value={{ list, pushInToList, removeFromList,searchList }}>
                <h1>Home Page</h1>
                <AddProductForm show={show} setShow={setShow}/>
                <ProductList show={show} setShow={setShow}/>
            </ProductContext.Provider>
        </div>
    )
}

export default Index;
