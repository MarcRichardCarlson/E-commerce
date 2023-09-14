import React, { createContext, useContext, useState } from 'react';

// Create a context for the cart
const CartContext = createContext<any>(null);

// Custom hook to access the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface ProductDetailsProps {
  creationDate: string | number | Date;
  productName: string;
  description: string;
  price: number;
  imageUrl: string;
  id: string; 
}

// CartProvider component
export const CartProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  // State for cart items
  const [cartItems, setCartItems] = useState<any[]>([]);

  // Add an item to the cart
  // Add an item to the cart
const addToCart = (item: ProductDetailsProps) => {
  const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      // If the item already exists in the cart, increment its quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex] = {
        ...updatedCartItems[existingItemIndex],
        quantity: updatedCartItems[existingItemIndex].quantity + 1,
      };
      setCartItems(updatedCartItems);
    } else {
      // If the item doesn't exist in the cart, add it with quantity 1
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };


  // Remove an item from the cart
  const removeFromCart = (itemId: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  };

  // Get the quantity of a specific item in the cart
  const getItemQuantity = (itemId: string) => {
    const item = cartItems.find((item) => item.id === itemId);
    return item ? item.quantity : 0;
  };

  // Increase the quantity of a specific item in the cart
  const increaseCartQuantity = (itemId: string) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  };

  // Decrease the quantity of a specific item in the cart
  const decreaseCartQuantity = (itemId: string) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCart);
  };

  // Calculate the total price of items in the cart
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Calculate the total quantity of items in the cart
  const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  // State for cart open/close
  const [isOpen, setIsOpen] = useState(false);

  // Open the cart
  const openCart = () => {
    setIsOpen(true);
  };

  // Close the cart
  const closeCart = () => {
    setIsOpen(false);
  };

  // Provide the cart data to components
  return (
    <CartContext.Provider
      value={{
        addToCart,
        removeFromCart,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        openCart,
        closeCart,
        isOpen,
        cartTotal,
        cartQuantity,
        cartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
