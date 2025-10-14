"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  inspectionCharge?: number
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getInspectionTotal: () => number
  getGrandTotal: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.id === item.id)
      if (existing) {
        return prev.map((ci) => 
          ci.id === item.id 
            ? { ...ci, quantity: ci.quantity + 1 } 
            : ci
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((ci) => ci.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setCart((prev) => 
      prev.map((ci) => 
        ci.id === id ? { ...ci, quantity } : ci
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const getTotalPrice = () => {
    return cart.reduce((sum, ci) => sum + ci.price * ci.quantity, 0)
  }

  const getInspectionTotal = () => {
    return cart.reduce((sum, ci) => sum + (ci.inspectionCharge || 0) * ci.quantity, 0)
  }

  const getGrandTotal = () => {
    return getTotalPrice() + getInspectionTotal()
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getInspectionTotal,
        getGrandTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
