import React, { useEffect, useState } from 'react';
import './Products.css';
import CreateProductModal from '../../components/CreateProductModal/ProductModal';
import { Button, Col, Container, Row } from 'react-bootstrap';
import StoreProduct from '../../components/StoreProduct/StoreProduct';
import productsService from '../../Utils/productService';

const ProductPage = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
 
  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsData = await productsService.getProducts();
        setProductList(productsData as Product[]);
        
      } catch (error) {
        console.log(error)
      }
    }
    fetchProducts();
  }, []);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  return (
    <div className='products-container'> 
      <h1>Products</h1>
      <div className='top-product-section'>
        <Button onClick={handleShowModal}>Create Product</Button>
      </div>
  
      <CreateProductModal
        show={showModal}
        onHide={handleCloseModal}
      />
  
  <Container>
  <Row>
    {productList.map((product) => {
      const key = product.id; // Store the key in a variable
      console.log("Key:", key); // Log the key to the console
      return (
        <Col key={key} md={3} xs={1} lg={4} className='g-3'>
          <StoreProduct {...product} />
        </Col>
      );
    })}
  </Row>
</Container>

    </div>
  );
  
};

export default ProductPage;
