import React from "react";
import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import productsService from "../../Utils/productService";
import { StoreProductProps } from "../StoreProduct/StoreProduct"; // Import the StoreProductProps type

type CartItemProps = {
  id: number;
  quantity: number;
  product: StoreProductProps | null; // Update the type to StoreProductProps
};

export function CartItem({ id, quantity, product }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();

  if (product == null) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={product.imageUrl}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
        alt={product.productName}
      />
      <div className="me-auto">
        <div>
          {product.productName}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {productsService.formatCurrency(product.price)}
        </div>
      </div>
      <div> {productsService.formatCurrency(product.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(id)}
      >
        &times;
      </Button>
    </Stack>
  );
}
