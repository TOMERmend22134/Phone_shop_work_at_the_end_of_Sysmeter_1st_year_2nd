import { createContext, useState, useEffect, FormEvent } from 'react';
import { Product, ProductInCart, StoreContextProviderProps } from '../types/StoreTypes';
import { ProductProps } from '../types/PropsTypes';
import { Customer } from '../types/CustomerType';

export const StoreContext = createContext({});

export default function StoreContextProvider({ children }: StoreContextProviderProps) {

  const [products, setProducts] = useState<Array<Product>>([]);

  const [cart, setCart] = useState<ProductInCart[]>(() => {
    // Load cart from sessionStorage when component mounts
    const savedCart = sessionStorage.getItem('updatedCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isLimitReached, setIsLimitReached] = useState(false);

  const [quantity, setQuantity] = useState<number>(1); // Start with 1

  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const [isEditView, setIsEditView] = useState<Boolean>(false);

  const [productsInSale, setProductsInSale] = useState<Array<Product>>([]);

  const [clients, setClients] = useState<Customer[]>(() => {
    // Get the stored clients from localStorage and parse them
    const storedClients = localStorage.getItem('clients');
    // If there are stored clients, return them, otherwise return an empty array
    return storedClients ? JSON.parse(storedClients) : [];
});


  

  // const [product, setProduct] = useState<ProductProps>();

    // useEffect(() => {
    //   localStorage.setItem('products', JSON.stringify(products));
    // }, [products]);
    useEffect(() => {
      // Save cart to sessionStorage whenever it changes
      sessionStorage.setItem('updatedCart', JSON.stringify(cart));
    }, [cart]);

  function loadProducts() {
    // debugger;
    let products = localStorage.getItem('products');
    if (products) //if(products !== undefined)
        return JSON.parse(products) as Product[];
    return [];
  }
  function loadCart() {
    let cart = sessionStorage.getItem('cart');
    if (cart) //if(products !== undefined)
      return JSON.parse(cart) as Product[];
  return [];
  }

  // useEffect(() => {
  //   let cart = loadCart();
  //   const storedProductsInCart = localStorage.getItem('updatedCart');
  //   if (storedProductsInCart)
  //   setCart(JSON.parse(storedProductsInCart));
  // else {
  //   setCart([])
  // }
  // }, [])
  useEffect(() => {
    let products = loadProducts();
    let cartLoading = loadCart();
    const storedProductsInCart = sessionStorage.getItem('updatedCart');
    if (storedProductsInCart)
    setCart(JSON.parse(storedProductsInCart));
  const storedProducts = localStorage.getItem('products');
  if (storedProducts) {
    setProducts(JSON.parse(storedProducts));
    } else {
      setProducts([
        {
          id:13,
          name:'iPhone 15 Pro',
          shortDesc:'black iPhone',
          img:'https://d3m9l0v76dty0.cloudfront.net/system/photos/13355886/extra_large/8a9bf646a7868b67354e1d7f8714e038.png',
          minimalQty:2,
          currentQty:10,
          price:4000,
          salePrice:4000
        },
        {
          id:14,
          name:'iPhone 14',
          shortDesc:'purple iPhone',
          img:'https://d3m9l0v76dty0.cloudfront.net/system/photos/10206000/extra_large/94c62d70f943da3b0e05049593800487.png',
          minimalQty:2,
          currentQty:7,
          price:3500,
          salePrice:3500
      
        },
        {
          id:3,
          name:'Samsung Galaxy S24 Ultra',
          shortDesc:'Black Hot Mobile Phone',
          img:'https://d3m9l0v76dty0.cloudfront.net/system/photos/13776721/extra_large/6571a3a3890ca7f6dedc02b23b1f1c55.png',
          minimalQty:2,
          currentQty:11,
          price:4100,
          salePrice:4000
      
        },
        {
          id:4,
          name:'Samsung Galaxy S23 Ultra',
          shortDesc:'Sunny Falcon Phone',
          img:'https://d3m9l0v76dty0.cloudfront.net/system/photos/11299314/extra_large/0a1ac2e27d65cea88f0e47ef52a6ca4e.png',
          minimalQty:2,
          currentQty:15,
          price:3600,
          salePrice:3500
          
        },
        {
          id:5,
          name:'Xiaomi Poco X6 Pro',
          shortDesc:'black Phone',
          img:'https://www.ivory.co.il/files/catalog/org/1705589870t70Wf.webp',
          minimalQty:2,
          currentQty:20,
          price:1700,
          salePrice:1600
          
        },
        {
          id:6,
          name:'Redmi Note 13 Pro',
          shortDesc:'green Phone',
          img:'https://d3m9l0v76dty0.cloudfront.net/system/photos/13721867/large/9ae44c4df69441e10e571df3796586f7.png',
          minimalQty:2,
          currentQty:20,
          price:2600,
          salePrice:2500
      
        },
        {
          id:7,
          name:'iPhone Black Case',
          shortDesc:'A silicon case for iPhone 13',
          img:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MM2A3?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1629924876000',
          minimalQty:2,
          currentQty:30,
          price:159.90,
          salePrice:159.90
        },
        {
          id:8,
          name:'Apple 30W USB-C Power Adaptor',
          shortDesc:'A Strong, fast, power adaptor for iPhone devices',
          img:'https://media.istoreil.co.il/57482e8d-29d5-4d9f-84d5-bd696304a4e0/https://www.istoreil.co.il/media/catalog/product/cache/1/thumbnail/1000x/0dc2d03fe217f8c83829496872af24a0/3/0/30w-usb-c-adapter_34bfl_geo_eu.png-screen.jpg/f_auto',
          minimalQty:2,
          currentQty:15,
          price:229.00,
          salePrice:229.00
        },
        {
          id:9,
          name:'Apple AirPods 2',
          shortDesc:'Best selling headphones',
          img:'https://ercell.co.il/wp-content/uploads/2021/08/airpods-2.png',
          minimalQty:2,
          currentQty:40,
          price:449.00,
          salePrice:449.00
        },
        {
          id:10,
          name:'Galaxy Buds 2 Pro',
          shortDesc:'A consumer friendly headphones',
          img:'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_zoom/DLI50_Z_P_8806094512601_1.png',
          minimalQty:2,
          currentQty:40,
          price:549.00,
          salePrice:500.00
        },
        {
          id:11,
          name:'Samsung S24 Otterbox case',
          shortDesc:'A strong, durable case',
          img:'https://www.otterbox.asia/dw/image/v2/BGMS_PRD/on/demandware.static/-/Sites-masterCatalog/default/dwd2e9495f/productimages/dis/cases-screen-protection/defender-xt-galaxy-s24-ultra/defender-xt-galaxy-s24-ultra-dark-side-2.jpg?sw=800&sh=800',
          minimalQty:2,
          currentQty:10,
          price:199.00,
          salePrice:149.00
        },
        {
          id:12,
          name:'Samsung 45W Super Fast Charger',
          shortDesc:'A Powerful USB-C Charger',
          img:'https://m.media-amazon.com/images/I/51BoUBwFf5L._AC_UF894,1000_QL80_.jpg',
          minimalQty:2,
          currentQty:40,
          price:120.00,
          salePrice:100.00
        }
      ]);
      }
  }, []);
  
  
  // useEffect(() => {
  //   localStorage.setItem('products', JSON.stringify(products));
  // }, [products]);
  
  function addProduct(item: Product) {
    const existingProduct = products.find((product) => product.id === item.id);
    if (!existingProduct) {
      const newProducts = [...products, item];
      setProducts(newProducts);
      localStorage.setItem('products', JSON.stringify(newProducts));
    } else {
      alert("Product already exists in the database.");
    }
  }  


  function removeProduct(id: number) {
    let filteredProducts = products.filter((product) => product.id !== id);
        setProducts(filteredProducts);
        localStorage.setItem('products', JSON.stringify(filteredProducts));
  }

  function checkPage(pageName: string) {
    if (pageName === 'admin') {
      return "<button onClick={() => addToCart(product)}>Add To Cart</button>"
    }
    else if (pageName === 'store') {
      return "<button onClick={() => removeProduct(product)}>Remove</button>"
    }
  }


  

    // setProducts([...products, product]);
    // function addToCart(product: Product) {
    //   let productToAdd: ProductInCart = { ...product, amount: 1 };
    //   //בדיקה אם המוצר קיים בעגלה
    //   if (cart.some((item) => item.id == product.id)) {
    //       //עוברים על כל המוצרים
    //       let updatedCart = cart.map((item) => {
    //           //שמגיעים למוצר המדובר
    //           if (item.id == product.id) {
    //               //מחזירים את אותו המוצר עם כמות מעודכנת
    //               return {
    //                   ...item,
    //                   amount: item.amount + 1
    //               }
    //           }
    //           else return item;
    //       });
    //       setCart(updatedCart);
    //   }
    //   else {
    //       setCart([...cart, productToAdd]);
    //   }
    // }

    // function addToCart(product: Product, quantity: number) {
    //   // Check if the product exists in the cart
    //   if (cart.some((item) => item.id === product.id)) {
    //     // Iterate over all products
    //     let updatedCart = cart.map((item) => {
    //       // When the specific product is found
    //       if (item.id === product.id) {
    //         // Calculate new amount
    //         let newAmount = item.amount + quantity;
    
    //         // Check if new amount does not exceed currentQty
    //         if (newAmount > product.currentQty) {
    //           newAmount = product.currentQty;
    //         }
    
    //         // Return the same product with the updated quantity
    //         return {
    //           ...item,
    //           amount: newAmount
    //         };
    //       } else {
    //         return item;
    //       }
    //     });
    //     setCart(updatedCart);
    //   } else {
    //     let productToAdd: ProductInCart = { ...product, amount: quantity > product.currentQty ? product.currentQty : quantity };
    //     setCart([...cart, productToAdd]);
    //   }
    // }

    const handleAddToCartClick = (product: Product) => {
      if (quantity + (cart.find((item: ProductInCart) => item.id === product.id)?.amount || 0) > product.currentQty) {
        setIsLimitReached(true);
      } else {
        addToCart(product, quantity, setIsLimitReached);
        setIsLimitReached(false); // Reset the limit flag if the item is successfully added
      }
    };

    const handleQuantityChange = (product: Product, change: number = 1) => {
      debugger;
      setQuantity(prevQuantity => {
        // Calculate new quantity based on the change
        const newQuantity = prevQuantity + change;
        // Ensure the new quantity is between 1 and currentQty
        return newQuantity >= 1 && newQuantity <= product.currentQty ? newQuantity : prevQuantity;
      });
    };

    function addToCart(product: Product, quantity: number, setLimitReached: (value: boolean) => void) {
      let newAmount = (cart.find(item => item.id === product.id)?.amount || 0) + quantity;
    
      if (newAmount > product.currentQty) {
        // If the new amount exceeds the current stock, set the limit flag and do not add to cart
        setLimitReached(true);
      } else {
        // If the new amount is within the stock limits, update the cart
        let updatedCart = cart.map(item => {
          if (item.id === product.id) {
            return { ...item, amount: item.amount + quantity };
          }
          return item;
        });
    
        // If the product is not in the cart, add it
        if (!cart.some(item => item.id === product.id)) {
          updatedCart = [...cart, { ...product, amount: quantity }];
        }
    
        setCart(updatedCart);
        setLimitReached(false); // Reset the limit flag
        sessionStorage.setItem('updatedCart', JSON.stringify(updatedCart));
      }
    }
    
    
    

    function removeFromCart(id: number) {
      let updatedCart = cart.filter((product) => product.id != id);
      setCart(updatedCart);
  }

  function editStock(event:FormEvent, product: Product, newQty: number) {
    debugger;
   event.preventDefault();
    setIsEditView(false);
    updateStock(product, newQty);
  }

// TODO: לבדוק האם הקוד תואם לשאלה
// function updateStock(product: Product) {
//   let updatedProducts = products.map((item) => {
//       if (item.id === product.id && item.currentQty === product.currentQty)
//           return product; 
//       return item;
//   });
// }
// function updateStock(product: Product) {
//   debugger;
//   let updatedProducts = products.map((item) => {
//       if (item.id === product.id && item.currentQty === product.currentQty)
//           return product; 
//       return item;
//   });

//   setProducts(updatedProducts);
//   localStorage.setItem('products', JSON.stringify(updatedProducts));
// }

function updateStock(product: Product, newQty: number) {
  let updatedProducts = products.map((item) => {
      if (item.id === product.id) {
        return { ...product, currentQty: product.currentQty };
      }
      return item;
  });

  setProducts(updatedProducts);
  localStorage.setItem('products', JSON.stringify(updatedProducts));
}



    useEffect(() => {
      let loadedProducts = loadProducts();
      if (loadedProducts.length === 0) {
        // Assuming this is where you set your predefined products
        loadedProducts = [
          {
            id:13,
            name:'iPhone 15 Pro',
            shortDesc:'black iPhone',
            img:'https://d3m9l0v76dty0.cloudfront.net/system/photos/13355886/extra_large/8a9bf646a7868b67354e1d7f8714e038.png',
            minimalQty:2,
            currentQty:10,
            price:4000,
            salePrice:4000
          },
          {
            id:14,
            name:'iPhone 14',
            shortDesc:'purple iPhone',
            img:'https://d3m9l0v76dty0.cloudfront.net/system/photos/10206000/extra_large/94c62d70f943da3b0e05049593800487.png',
            minimalQty:2,
            currentQty:7,
            price:3500,
            salePrice:3500
        
          },
          {
            id:3,
            name:'Samsung Galaxy S24 Ultra',
            shortDesc:'Black Hot Mobile Phone',
            img:'https://d3m9l0v76dty0.cloudfront.net/system/photos/13776721/extra_large/6571a3a3890ca7f6dedc02b23b1f1c55.png',
            minimalQty:2,
            currentQty:11,
            price:4100,
            salePrice:4000
        
          },
          {
            id:4,
            name:'Samsung Galaxy S23 Ultra',
            shortDesc:'Sunny Falcon Phone',
            img:'https://d3m9l0v76dty0.cloudfront.net/system/photos/11299314/extra_large/0a1ac2e27d65cea88f0e47ef52a6ca4e.png',
            minimalQty:2,
            currentQty:15,
            price:3600,
            salePrice:3500
            
          },
          {
            id:5,
            name:'Xiaomi Poco X6 Pro',
            shortDesc:'black Phone',
            img:'https://www.ivory.co.il/files/catalog/org/1705589870t70Wf.webp',
            minimalQty:2,
            currentQty:20,
            price:1700,
            salePrice:1600
            
          },
          {
            id:6,
            name:'Redmi Note 13 Pro',
            shortDesc:'green Phone',
            img:'https://d3m9l0v76dty0.cloudfront.net/system/photos/13721867/large/9ae44c4df69441e10e571df3796586f7.png',
            minimalQty:2,
            currentQty:20,
            price:2600,
            salePrice:2500
        
          },
          {
            id:7,
            name:'iPhone Black Case',
            shortDesc:'A silicon case for iPhone 13',
            img:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MM2A3?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1629924876000',
            minimalQty:2,
            currentQty:30,
            price:159.90,
            salePrice:159.90
          },
          {
            id:8,
            name:'Apple 30W USB-C Power Adaptor',
            shortDesc:'A Strong, fast, power adaptor for iPhone devices',
            img:'https://media.istoreil.co.il/57482e8d-29d5-4d9f-84d5-bd696304a4e0/https://www.istoreil.co.il/media/catalog/product/cache/1/thumbnail/1000x/0dc2d03fe217f8c83829496872af24a0/3/0/30w-usb-c-adapter_34bfl_geo_eu.png-screen.jpg/f_auto',
            minimalQty:2,
            currentQty:15,
            price:229.00,
            salePrice:229.00
          },
          {
            id:9,
            name:'Apple AirPods 2',
            shortDesc:'Best selling headphones',
            img:'https://ercell.co.il/wp-content/uploads/2021/08/airpods-2.png',
            minimalQty:2,
            currentQty:40,
            price:449.00,
            salePrice:449.00
          },
          {
            id:10,
            name:'Galaxy Buds 2 Pro',
            shortDesc:'A consumer friendly headphones',
            img:'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_zoom/DLI50_Z_P_8806094512601_1.png',
            minimalQty:2,
            currentQty:40,
            price:549.00,
            salePrice:500.00
          },
          {
            id:11,
            name:'Samsung S24 Otterbox case',
            shortDesc:'A strong, durable case',
            img:'https://www.otterbox.asia/dw/image/v2/BGMS_PRD/on/demandware.static/-/Sites-masterCatalog/default/dwd2e9495f/productimages/dis/cases-screen-protection/defender-xt-galaxy-s24-ultra/defender-xt-galaxy-s24-ultra-dark-side-2.jpg?sw=800&sh=800',
            minimalQty:2,
            currentQty:10,
            price:199.00,
            salePrice:149.00
          },
          {
            id:12,
            name:'Samsung 45W Super Fast Charger',
            shortDesc:'A Powerful USB-C Charger',
            img:'https://m.media-amazon.com/images/I/51BoUBwFf5L._AC_UF894,1000_QL80_.jpg',
            minimalQty:2,
            currentQty:40,
            price:120.00,
            salePrice:100.00
          }
        ];
      }
      
      // Now, we filter out the products on sale
      const saleProducts = loadedProducts.filter(product => Number(product.salePrice) < product.price);
      setProductsInSale(saleProducts);
      setProducts(loadedProducts);
    }, []);
    


function ProductInSale(salePrice:number)
{
  let updatedProductsInSale = products.filter((product:Product) => product.salePrice != salePrice);
  setProductsInSale(updatedProductsInSale);
}

// useEffect(() => {
//   const saleProducts = products.filter(product => Number(product.salePrice) < product.price);
//   setProductsInSale(saleProducts);
// }, [products]);



  const value = {
    products,
    cart,
    quantity,
    isAdmin,
      addProduct,
      addToCart,
      removeFromCart,
      loadProducts,
      removeProduct,
      updateStock,
      checkPage,
      handleAddToCartClick,
      setQuantity,
      handleQuantityChange,
      setIsAdmin,
      setProducts,
      editStock,
      setCart,
      ProductInSale,
      productsInSale,
      setProductsInSale
      // removeFromCart
      // restoreDefaultProducts
    }


    return (
      <StoreContext.Provider value={value}>
        {children}
      </StoreContext.Provider>
    )
}
