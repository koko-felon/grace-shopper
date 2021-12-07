import React, { useEffect } from 'react'
import Nav from './Nav'
import Footer from './Footer'
import SideBar from './SideBar'
import axios from 'axios'

function Home(props) {
  useEffect(() => {
    const getProductsWithFetch = async () => {
      const response = await fetch('/api/products')
      const data = await response.json()
      console.log(data)
    }
    const getProductsWithAxios = async () => {
      const response = await axios.get('/api/products')
      const data = response.data
      console.log('From axios', data)
    }
    getProductsWithFetch()
    getProductsWithAxios()
  }, [])

  return (
    <>
      <Nav />
      <div>This is the Home Page!</div>;
      <SideBar />
      <Footer />
    </>
  )
}

export default Home
