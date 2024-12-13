import { FormEvent, useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import styles from './product.module.css';
import { ProductProps } from "../../types/PropsTypes";
import { Product, ProductInCart } from "../../types/StoreTypes";
import { Link } from "react-router-dom";



export default function Products({ productsToShow, page }: ProductProps) {
  const { products, cart, addToCart, removeProduct, setProducts, isEditView, setIsEditView, editStock, updateStock } = useContext<any>(StoreContext);
  const [isLimitReached, setIsLimitReached] = useState(false);
  const [product, setProduct] = useState<Product>(products);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [showQuantity, setShowQuantity] = useState<number>();
  // const [checkPage, setCheckPage] = useState<string>('');

  // useEffect (() => {
  //     if (page == admin)
  //     setCheckPage(<button onClick={() => remove(product)}>Remove </button>)
  //     //?????
  //     if (page == store)
  //     if (currentQty === 0)
  //      mashehu = filter(?);
  //     setCheckPage(<button onClick={() => addToCart(product)}>Add To Cart</button>)
  //     //?????
  // }, [])

  const handleAddToCartClick = (product: Product) => {
    if ((cart.find((item: ProductInCart) => item.id === product.id)?.amount || 0) + 1 > product.currentQty) {
      setIsLimitReached(true);
    } else {
      addToCart(product, 1);  // Assuming you want to add one quantity at a time from this component
      setIsLimitReached(false); // Reset the limit flag if the item is successfully added
    }
  };


  return (
    <div className={styles.container}>
      <ul className={styles.product_images}>
        {productsToShow.map((product: Product) =>
          <li key={product.id}><Link to={`/item/${product.id}`}> <img className={styles.product_images} src={product.img} alt={product.name}/><h3 className={styles.product_name}>{product.name}</h3>{
            (product.salePrice as number < product.price) ?
              <p className={styles.sale}>{product.salePrice?.toLocaleString()}₪</p>
              :
              <p className={styles.price}>{product.price?.toLocaleString()}₪</p>
          }
          </Link>
            {page === 'admin' ? (
              <>
                <button onClick={() => removeProduct(product.id)}>Remove</button>
                <button onClick={() => setEditingProductId(product.id)}>Edit Details</button>
                {editingProductId === product.id && (
                  <form onSubmit={(event) => {
                    event.preventDefault();
                    updateStock(product);
                    setEditingProductId(null); // Reset editingProductId state after saving
                  }}>
                    <p>Current Quantity: {product.currentQty}</p>
                    Change Name<input type="text" value={product.name}
                      onChange={(event) => {
                        setProducts((prevProducts: Product[]) => prevProducts.map((item) => {
                          if (item.id === product.id) {
                            return { ...item, name: event.target.value };
                          }
                          return item;
                        }));
                      }} />
                    Change Price<input type="number" value={product.price}
                      onChange={(event) => {
                        setProducts((prevProducts: Product[]) => prevProducts.map((item) => {
                          if (item.id === product.id) {
                            return { ...item, price: Number(event.target.value) };
                          }
                          return item;
                        }));
                      }} />
                    Change Quantity<input type="number" value={product.currentQty}
                      onChange={(event) => {
                        setProducts((prevProducts: Product[]) => prevProducts.map((item) => {
                          if (item.id === product.id) {
                            return { ...item, currentQty: Number(event.target.value) };
                          }
                          return item;
                        }));
                      }} />
                    <button type="submit">Save!</button>
                  </form>
                )}
              </>
            ) : (
              <button onClick={() => handleAddToCartClick(product)}>Add To Cart</button>
            )}
          </li>
        )}
      </ul>
    </div>
  )
}


//<button onClick={() => addToCart(product)}>Add To Cart</button>

//((checkPage))

{/* <button onClick={(handleAddToCartClick) => addToCart(product)}>Add To Cart</button> */ }