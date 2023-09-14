import React, { Key, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import productsService from '../../Utils/productService';

interface Product {
  creationDate: string | number | Date;
  productName: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface CreateProductModalProps {
  show: boolean;
  onHide: () => void;
}

const CreateProductModal: React.FC<CreateProductModalProps> = ({
  show,
  onHide,
}) => {
  const [product, setProduct] = useState<Product>({
    creationDate: new Date(),
    productName: '',
    description: '',
    price: 0,
    imageUrl: '',
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    handleCreateProduct(product)
    onHide();
  };

  const handleCreateProduct = async (product: Product) => {
    try {
      await productsService.createProduct(product);
      console.log('Product created successfully');
      window.location.reload()
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="productName"
              value={product.productName}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={product.description}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="imageUrl">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="imageUrl"
              value={product.imageUrl}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateProductModal;
