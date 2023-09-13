import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import productsService from '../../Utils/productService';
import './Details.css';
import { useCart } from '../../context/CartContext';

interface ProductDetailsProps {
  creationDate: string | number | Date;
  productName: string;
  description: string;
  price: number;
  imageUrl: string;
  id: string; 
}

const DetailsPage: React.FC = () => {
  const [product, setProduct] = useState<ProductDetailsProps | null>(null);
  const { productId } = useParams<{ productId: string }>();

  const { addToCart, increaseCartQuantity, decreaseCartQuantity, getItemQuantity } = useCart();

  useEffect(() => {
    if (productId) {
      console.log(`Fetching product with ID: ${productId}`);
      const fetchProductData = async () => {
        try {
          const productData = await productsService.getProductById(productId);

          if (productData) {
            setProduct(productData as ProductDetailsProps);
          } else {
            console.error(`Product with ID ${productId} not found`);
          }
        } catch (error) {
          console.error('Error fetching product data:', error);
        }
      };

      fetchProductData();
    } else {
      console.error('Missing productId');
    }
  }, [productId]);

  if (!product) {
    // Placeholder card here if data is not loading in
    return <div className="spinner"></div>;
  }

  return (
    <Container className='details-container'>
      <Row>
        <Col md={6}>
          <Card className='details-card'>
            <Card.Header className='details-card-header'>
              <img className='details-card-image' src={product.imageUrl} alt={`Image of ${product.productName}`} />
            </Card.Header>
            <Card.Body className='details-card-body'>
              <Card.Title className='details-card-title'>{product.productName}</Card.Title>
              <Card.Text className='details-card-description'>{product.description}</Card.Text>
              <Card.Text className='details-card-price'>Price: $ {product.price}</Card.Text>
              <div className='details-card-quantity'>
                <Button variant="primary" onClick={() => addToCart(product)}>Add to cart</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailsPage;
