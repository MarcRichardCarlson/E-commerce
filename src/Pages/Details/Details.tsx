import React from 'react'

export const Details = () => {
  return (
    <div>Details</div>
  )
}

/*
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import productsService from '../../Utils/productService'

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

const DetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (productId) { // Check if productId is defined
      // Call the function to fetch the product by its ID
      const fetchProductData = async () => {
        try {
          const productData = await productsService.getProductById(productId);
          if (productData) {
            // Check if 'name' exists before setting it
            if ('name' in productData) {
              setProduct(productData as unknown as Product);
            } else {
              console.error(`Product with ID ${productId} does not have a 'name' property`);
            }
          } else {
            console.error(`Product with ID ${productId} not found`);
          }
        } catch (error) {
          console.error('Error fetching product data:', error);
        }
      };

      fetchProductData();
    }
  }, [productId]);

  if (!product) {
    // You can add loading indicator here while waiting for data to load
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <Card.Text>Price: ${product.price}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailsPage;
*/