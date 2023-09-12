import React, { useState, useEffect } from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { CartItem } from "../CartItem/CartItem";
import productsService from "../../Utils/productService";

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();
  const [productData, setProductData] = useState<(Product | null)[]>([]);

  // Function to fetch product data for cart items
  const fetchProductData = async () => {
    const productDataArray: (Product | null)[] = [];
    for (const cartItem of cartItems) {
      const product = await productsService.getProductById(cartItem.id.toString());
      productDataArray.push(product as unknown as Product);
    }
    setProductData(productDataArray);
  };

  useEffect(() => {
    fetchProductData();
  }, [cartItems]);

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item, index) => (
            <CartItem key={item.id} id={item.id} quantity={item.quantity} product={productData[index]} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {productsService.formatCurrency(
              cartItems.reduce((total, cartItem, index) => {
                const product = productData[index];
                return total + (product?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
