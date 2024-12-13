import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Product as ProductProps, ProductInCart } from "../../types/StoreTypes";
import { StoreContext } from "../../context/StoreContext";
import Navbar from "../../components/navbar/Navbar";
import styles from "./item.module.css"

export default function Item() {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart, cart, setCart } = useContext<any>(StoreContext);
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [quantity, setQuantity] = useState<number>(1); // Start with 1
  const [isLimitReached, setIsLimitReached] = useState(false);

  useEffect(() => {
    const product = products.find((product: ProductProps) => product.id === Number(id));
    console.log('product', product);
    setProduct(product);
  }, [id, products]);

  if (!product) {
    return (
      <>
        <h1>Product not found</h1>
        <Link to='/'>Back to Home</Link>
      </>
    );
  }

  const handleQuantityChange = (change: number) => {
    setQuantity(prevQuantity => {
      // Calculate new quantity based on the change
      const newQuantity = prevQuantity + change;
      // Ensure the new quantity is between 1 and currentQty
      return newQuantity >= 1 && newQuantity <= product.currentQty ? newQuantity : prevQuantity;
    });
  };
  const handleAddToCartClick = () => {
    if (quantity + (cart.find((item: ProductInCart) => item.id === product.id)?.amount || 0) > product.currentQty) {
      setIsLimitReached(true);
    } else {
      addToCart(product, quantity, setIsLimitReached);
      setIsLimitReached(false); // Reset the limit flag if the item is successfully added
    }
  };
  
  

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
      <h1>{product.name}</h1>
      <img className={styles.imgSizer} src={product.img} alt={product.name} />
      <h2>{product.price?.toLocaleString()}₪</h2>
      <div>
        <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>-</button>
        <span className={styles.quantity_wrapper}>Quantity: {quantity}</span>
        <button onClick={() => handleQuantityChange(1)} disabled={quantity >= product.currentQty}>+</button>
      </div>
      {isLimitReached && <p>The limit has been reached.</p>}
      <button onClick={handleAddToCartClick}>Add To Cart</button>
    </div>
    </div>
  );
}
