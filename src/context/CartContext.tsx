import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product, CartItem } from '../types';
import { useAuth } from './AuthContext';

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

interface CartContextType extends CartState {
  addItem: (product: Product, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const calculateTotals = (items: CartItem[]): { totalItems: number; totalPrice: number } => {
  return items.reduce(
    (acc, item) => ({
      totalItems: acc.totalItems + item.quantity,
      totalPrice: acc.totalPrice + item.product.price * item.quantity,
    }),
    { totalItems: 0, totalPrice: 0 }
  );
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<CartState>({
    items: [],
    totalItems: 0,
    totalPrice: 0,
  });
  const { user } = useAuth();

  // Load cart from Firestore when user changes
  useEffect(() => {
    const loadCart = async () => {
      if (!user) {
        setState({ items: [], totalItems: 0, totalPrice: 0 });
        return;
      }

      try {
        const cartRef = doc(db, 'carts', user.uid);
        const cartDoc = await getDoc(cartRef);
        
        if (cartDoc.exists()) {
          const cartData = cartDoc.data();
          const { totalItems, totalPrice } = calculateTotals(cartData.items);
          setState({ items: cartData.items, totalItems, totalPrice });
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    };

    loadCart();
  }, [user]);

  // Save cart to Firestore whenever items change
  useEffect(() => {
    const saveCart = async () => {
      if (!user) return;

      try {
        const cartRef = doc(db, 'carts', user.uid);
        await setDoc(cartRef, { items: state.items }, { merge: true });
      } catch (error) {
        console.error('Error saving cart:', error);
      }
    };

    if (user && state.items.length > 0) {
      saveCart();
    }
  }, [state.items, user]);

  const addItem = async (product: Product, quantity: number) => {
    if (!user) return;

    const existingItemIndex = state.items.findIndex(
      (item) => item.product.id === product.id
    );

    let updatedItems: CartItem[];

    if (existingItemIndex >= 0) {
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + quantity,
      };
    } else {
      updatedItems = [...state.items, { product, quantity }];
    }

    const { totalItems, totalPrice } = calculateTotals(updatedItems);
    setState({ items: updatedItems, totalItems, totalPrice });
  };

  const removeItem = async (productId: string) => {
    if (!user) return;

    const updatedItems = state.items.filter(
      (item) => item.product.id !== productId
    );
    
    const { totalItems, totalPrice } = calculateTotals(updatedItems);
    setState({ items: updatedItems, totalItems, totalPrice });
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!user) return;

    if (quantity <= 0) {
      await removeItem(productId);
      return;
    }

    const updatedItems = state.items.map((item) =>
      item.product.id === productId
        ? { ...item, quantity }
        : item
    );
    
    const { totalItems, totalPrice } = calculateTotals(updatedItems);
    setState({ items: updatedItems, totalItems, totalPrice });
  };

  const clearCart = async () => {
    if (!user) return;

    setState({ items: [], totalItems: 0, totalPrice: 0 });
    await deleteDoc(doc(db, 'carts', user.uid));
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};