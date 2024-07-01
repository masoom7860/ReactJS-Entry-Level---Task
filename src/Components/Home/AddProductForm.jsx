import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { nanoid } from 'nanoid'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { ProductContext } from '../ContextApi/ProductContext';
function AddProductForm({ show, setShow }) {

    const handleClose = () => setShow(false);
    const [formData, setFormData] = useState({
        name: "",
        price: ""
    })
    const { pushInToList,list } = useContext(ProductContext);
    const [error, setError] = useState(false);
    const handleSubmit = (e) => {
        pushInToList({...formData, id: nanoid()});
        handleClose();
    }
    const checkError = (productName) => {
        const flag = list.some((item) => {
            return item.name == productName;
        });
        setError(flag);
        return flag;
    }
    return (
        <div className='add-product-form'>
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor='product_name'>Product Name</Form.Label>
                        <Form.Control
                            id="product_name"
                            typeof='product_name'
                            placeholder="Enter product name"
                            onChange={(e) => {
                                if(!checkError(e.target.value)) {
                                    setFormData({ ...formData, name: e.target.value })
                                }
                            }}
                            autoFocus
                        />
                        {error && <span className='text-danger'>Product name already exist</span>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor='price'>Price </Form.Label>
                        <Form.Control
                            type='number'
                            id='price'
                            typeof="price"
                            placeholder="Enter product Price"
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            autoFocus
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" disabled={error} onClick={(e) => handleSubmit(e)} >
                        Save
                    </Button>

                </Modal.Footer>
            </Modal>

        </div>

    )
}

export default AddProductForm