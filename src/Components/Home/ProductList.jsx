// import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import {ProductContext} from '../ContextApi/ProductContext'
import SearchBar from './SearchBar'
import Button from 'react-bootstrap/Button';

function ProductList({setShow}) {
  const {list, removeFromList} = useContext(ProductContext);
  useEffect(() => {
    console.log('list', list);
  })

  function handleDelete(id) {
    removeFromList(id)
    //index.splice(index, 1,)
    // console.log('delete', index)
    

    // console.log(index);e
  }

  // const handleDelete = (id) => {
  //   const deleteItems  = list.filter(items => items.id !== id)
  //   setList(deleteItems)
  // }
  
  const handleShow = () => setShow(true);
  return (
    <div className='product-list'>
      <div className="container">


        <div className='d-flex justify-content-between mt-5'>
                <Button variant="primary" title='Add Procuct' onClick={handleShow}>
                    + Add Procuct
                </Button>
                <SearchBar />
                </div>

        <Table>
          <thead>
            <tr>
              <th>id</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

            {
              list.map((item,index) => {
                if(!item.hasOwnProperty("search") || (item.hasOwnProperty("search") && item.search)) {
                return (<tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.price} $</td>
                  <td>
                  <button onClick={(e)=> handleDelete(item.id)} className='btn btn-sm btn-danger'>
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                  </td>
                </tr>);
                }
              })
            }
          </tbody>
        </Table>
      </div>
    </div >
  )
}

export default ProductList
