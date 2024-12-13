import { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { Product as ProductProps } from '../../types/StoreTypes';
import { StoreContext } from '../../context/StoreContext';
import Products from '../../components/product/Products';
import styles from '../Store/store.module.css';

export default function Store() {
  const { products, loadProducts } = useContext<any>(StoreContext);
  const [productsToShow, setProductsToShow] = useState<ProductProps[]>([]);
  const [search, setSearch] = useState<string>('');


  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    if (products) {
      setProductsToShow(products);
    }
  }, [products]);

  function sortByPrice(lowerFirst: boolean) {
    const sortedProducts = [...productsToShow].sort((a, b) => lowerFirst ? a.price - b.price : b.price - a.price);
    setProductsToShow(sortedProducts);
  }

  useEffect(() => {
    const filteredProducts = search === ''
      ? products
      : products.filter((item: ProductProps) => item.name.toLowerCase().includes(search.toLowerCase()));
    setProductsToShow(filteredProducts);
  }, [search, products]);

  return (
    <>
      <div>
        <Navbar />
        <p id={styles.koteretfix}>welcome to our store</p>
        <div id={styles.special_gap}>
        Search Products: {" "}
        <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} />
        <div id={styles.movebuttons}>
        <button onClick={() => sortByPrice(false)}>sort (higher first)</button>
        <button onClick={() => sortByPrice(true)}>sort (lower first)</button>
        </div>
        </div>
        <Products productsToShow={productsToShow} page='store'/>
        <footer id={styles.footerfix}>Created by IT Cellular&copy;</footer>
      </div>
    </>
  );
}
