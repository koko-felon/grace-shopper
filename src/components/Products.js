import React, { useState, useEffect } from 'react'
import AddToCart from './AddToCart'
import { Link } from 'react-router-dom'

function Products(props) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(`/api/products`)
      const data = await response.json()
      setProducts(data)
    }

    getProducts()
  }, [])

  const productsToRender = products.map((product) => {
    return (
      <>
        <div>
          <h2>{product.productName}</h2>
          {/*I know Image is not <p> just for testing purposes*/}
          <img src={product.image} />
          <p>{product.productDescription}</p>
          <p>Our Price: ${product.currentPrice}</p>
          <p>Qty In Stock: {product.productQuantity}</p>
          <p>MSRP: ${product.MSRP}</p>
          <p>SKU: {product.SKU}</p>
          {
            // If the cartState.products array contains a product with this product's id
            // we can conditianlly render a message saying it's already in the cart
          }
          <AddToCart
            productId={product.id}
            currentPrice={product.currentPrice}
            setProducts={setProducts}
          />
          <Link to={`/Product/${product.id}`}>Go to Product!</Link>
        </div>
      </>
    )
  })

  return (
    <>
      <h2>Welcome to your ultimate Coco HQ - Go Nuts!</h2>
      <div>{productsToRender}</div>
    </>
  )
}

export default Products
