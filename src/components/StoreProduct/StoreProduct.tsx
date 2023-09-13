import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import productsService from '../../Utils/productService'
import './StoreProduct.css'


export type StoreProductProps = {
    id?: any;
    productName: string;
    price: number;
    imageUrl: string;
    description: string;
};

const StoreProduct: React.FC<StoreProductProps> = ({ id, productName, price, imageUrl, description,}) => {  

return (
    <Card className='product-card'>
      <Link to={`/details/${id}`}>
          <Card.Img
            variant='top'
            height='250px'
            style={{ objectFit: 'cover' }}
            src={imageUrl}
            alt={productName}
            />
        <Card.Body className='d-flex flex-column product-card-body'>
          <Card.Title className='product-card-title'>{productName}</Card.Title>
          <Card.Text className='product-card-description'>{description}</Card.Text>
          <Card.Text>Price: ${productsService.formatCurrency (price)}</Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default StoreProduct;
