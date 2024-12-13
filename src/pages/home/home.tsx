import React, { useContext, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { Product, ProductInCart } from '../../types/StoreTypes'
import ContactUs from '../../components/Contact Us/ContactUs'
import { StoreContext } from '../../context/StoreContext'
import { Link } from 'react-router-dom'
import styles from "./home.module.css"

export default function Home() {

  const { productsInSale, setProductsInSale, ProductInSale } = useContext<any>(StoreContext)


  return (
    <>
      <div>
        <Navbar />
        {/* <p>Home Page</p> */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.herocontent}>
              <h2 className={styles.index}>Welcome to IT Cellular</h2>
              <p className={styles.index}>Get the latest and greatest mobile phones and accessories at unbeatable prices.</p>
              <a href="#new-games-container">
                <div id={styles.gallery}>
                </div>
              </a>
            </div>
          </div>
          <div id="new-games-container">
            <h2 id={styles.headeraligner}>Products in Sale</h2>
            <ul className={styles.product_images}>
            {productsInSale.map((product: Product) =>
  <li key={product.id}><Link to={`/item/${product.id}`}><img src={product.img} alt={product.name} className={styles.product_image} /><h3 className={styles.product_name}>{product.name}</h3></Link></li>
)}
            </ul>
          </div>
        </section>
        <p id={styles.details}>Leave your details:</p>
        <ContactUs />
      </div>
    </>
  )
}