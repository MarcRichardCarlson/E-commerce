import "./Card.css";


interface ProductCardProps { // Updated interface
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => { // Updated component name
  

  return (
    <div>
      <h1>CARD</h1>
    </div>
  );
};

export default ProductCard;
