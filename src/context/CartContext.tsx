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

 // Add an item to the cart or increment its quantity if it already exists
const addToCart = (item: ProductDetailsProps) => {
    // Check if the item already exists in the cart by searching for its 'id'.
  const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);

  if (existingItemIndex !== -1) {
    // If the item already exists in the cart, increment its quantity
    const updatedCartItems = [...cartItems];
    updatedCartItems[existingItemIndex] = {
      ...updatedCartItems[existingItemIndex],
      quantity: updatedCartItems[existingItemIndex].quantity + 1,
    };
    // Update the cart with the modified cartItems.
    setCartItems(updatedCartItems);
  } else {
    // If the item doesn't exist in the cart, add it with quantity 1
    setCartItems([...cartItems, { ...item, quantity: 1 }]);
  }
};


  // Remove an item from the cart
  const removeFromCart = (itemId: string) => {
    // Map through cartItems, increment 'quantity' by 1 for the item with a matching id, or keep it unchanged
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    // Update the cart with the modified cartItems.
    setCartItems(updatedCart);
  };

  // Get the quantity of a specific item in the cart
  const getItemQuantity = (itemId: string) => {
    //Uses find method on array cartItems, searching for item with id property matching provided itemId
    const item = cartItems.find((item) => item.id === itemId);
    //if item found, return item.quantity else 0
    return item ? item.quantity : 0;
  };

  // Increase the quantity of a specific item in the cart
  const increaseCartQuantity = (itemId: string) => {
    /* Uses map method on cartItems, checks if id matches provided itemId. If matching, 
    then create new object with same properties as the item but increment 'quantity' by 1.
    Else keep unchanged */
    const updatedCart = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    // Update the cart with the modified cartItems.
    setCartItems(updatedCart);
  };

  // Decrease the quantity of a specific item in the cart
  const decreaseCartQuantity = (itemId: string) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    // Update the cart with the modified cartItems.
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
