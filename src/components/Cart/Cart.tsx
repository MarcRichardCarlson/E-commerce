import React, { useState } from 'react';
import { Button, ListGroup, Offcanvas } from 'react-bootstrap';
import { useCart } from '../../context/CartContext';
import './Cart.css';

interface ProductDetailsProps {
  creationDate: string | number | Date;
  productName: string;
  description: string;
  price: number;
  imageUrl: string;
  id: string; 
}

const Cart: React.FC = () => {
  const [show, setShow] = useState(false);

  const {
    cartItems,
    cartTotal,
    removeFromCart,
    increaseCartQuantity,
    decreaseCartQuantity,
    getItemQuantity,
    isOpen, 
    closeCart 
  } = useCart();


  return (
    <Offcanvas show={show} onHide={() => setShow(false)} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ListGroup>
          {cartItems.map((item: ProductDetailsProps) => (
            <ListGroup.Item key={item.id} className='cart-item-group'>
              <img className='cart-item-image' src={item.imageUrl}></img>
              <div className='cart-item-body'>
                <div className='cart-item-top-body'>
                  <div>
                    {item.productName}
                  </div>
                  <div>
                    ${item.price}
                  </div>
                </div>
                <div className='cart-item-bottom-body'>
                  <Button className='btn btn-danger btn-sm' onClick={() => removeFromCart(item.id)}>
                    Remove
                  </Button>
                  <Button className='btn btn-primary btn-sm' onClick={() => increaseCartQuantity(item.id)}>
                    +
                  </Button>
                  (0{getItemQuantity})
                  <Button className='btn btn-primary btn-sm' onClick={() => decreaseCartQuantity(item.id)}>
                    -
                  </Button>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <p>Total: ${cartTotal}</p>
        <Button variant="secondary" onClick={closeCart}>
          Close Cart
        </Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;
