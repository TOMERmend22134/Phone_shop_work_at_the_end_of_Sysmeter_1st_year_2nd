import { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { StoreContext } from '../../context/StoreContext';
import Products from '../../components/product/Products';
// import styles from '../components/product/product.module.css';
import { Product, ProductInCart } from '../../types/StoreTypes';
import { Link } from 'react-router-dom';
import { NavbarProps, cartProps } from '../../types/PropsTypes';
import { number } from 'yup';
import styles from "./shoppingcart.module.css"



export default function ShoppingCart() {
  const [cartToShow, setCartToShow] = useState<ProductInCart[]>([])
  const { cart, setCart } = useContext<any>(StoreContext)
  const [isLimitReached, setIsLimitReached] = useState(false);
  const [quantity, setQuantity] = useState<number>(1); // Start with 1


  const handleQuantityChange = (productId: number, change: number) => {
    const updatedCart = cart.map((item: ProductInCart) => {
      if (item.id === productId) {
        // Calculate new quantity based on the change
        const newQuantity = item.amount + change;
        // Ensure the new quantity is between 1 and item's currentQty
        return {
          ...item,
          amount: newQuantity >= 1 && newQuantity <= item.currentQty ? newQuantity : item.amount,
        };
      }
      return item;
    });
    
        // Update cart state and persist to sessionStorage
        setCart(updatedCart);
        sessionStorage.setItem('cart', JSON.stringify(updatedCart));
      };

      const calculateTotalPrice = (price: number, quantity: number) => {
        return (price * quantity).toLocaleString();
      };

  return (
    <>
      <div>
        <Navbar />
        <h1 id={styles.cartKoteret}>Your shopping cart:</h1>
        <div className={styles.cartContainer}>
          <ul>
          {
          cart.map((item: ProductInCart) => (
              <li className={styles.cartItem} key={item.id}>
                <img src={item.img} alt={item.name} className={styles.cart_image} />
                <h3 className={styles.cart_name}>{item.name}</h3>
                <h2>{calculateTotalPrice(item.price, item.amount)}₪</h2>
                <div>
                  <button onClick={() => handleQuantityChange(item.id, -1)} disabled={item.amount <= 1}>-</button>
                  <span>Quantity: {item.amount}</span>
                  <button onClick={() => handleQuantityChange(item.id, 1)} disabled={item.amount >= item.currentQty}>+</button>
                </div>
                {isLimitReached && <p>The limit has been reached.</p>}
              </li>
            ))
            }
          </ul>
        </div>
      </div>
    </>
  )
}
