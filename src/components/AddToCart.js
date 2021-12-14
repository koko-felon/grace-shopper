import React, { useContext, useState, useEffect } from 'react'
import { userContext } from '../context/userContext'
import { cartContext } from '../context/cartContext'

function AddToCart({ productId, currentPrice, setProducts }) {
  const [cart, setCart] = useState([])

  const { userState, userDispatch } = useContext(userContext)
  const { cartState, cartDispatch } = useContext(cartContext)
  console.log({ userState, cartState })
  async function handleSubmit(e) {
    e.preventDefault()
    const response = await fetch('/api/order_products', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        orderId: cartState.orderId,
        productId,
        historicalPrice: currentPrice,
        quantity: 1,
      }),
    })
    const data = await response.json()
    console.log(data)
    const responseTwo = await fetch(`
    /api/orders/users/${userState.id}/cart
    `)
    const dataTwo = await responseTwo.json()
    console.log({ dataTwo })
    cartDispatch({
      type: 'SET_CART',
      value: dataTwo,
    })
  }

  return (
    <div>
      <button onClick={handleSubmit}>Add to Cart!</button>
    </div>
  )
}

export default AddToCart
