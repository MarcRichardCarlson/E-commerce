// CartContext.tsx
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext<any>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  const addToCart = (item: any) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (itemId: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  };

  const getItemQuantity = (itemId: number) => {
    const item = cartItems.find((item) => item.id === itemId);
    return item ? item.quantity : 0;
  };

  const increaseCartQuantity = (itemId: number) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  };

  const decreaseCartQuantity = (itemId: number) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCart);
  };

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);


  const [isOpen, setIsOpen] = useState(false);

  const openCart = () => {
    setIsOpen(true);
    console.log('opening cart');
  };

  const closeCart = () => {
    setIsOpen(false);
    console.log('closing cart');
  };
  

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        cartTotal,
        cartQuantity,
        openCart,
        closeCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
