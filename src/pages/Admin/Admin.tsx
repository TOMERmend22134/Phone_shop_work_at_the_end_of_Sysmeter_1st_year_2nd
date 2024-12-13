import { useContext, useEffect, useState } from "react";
import { Product, Product as ProductProps } from "../../types/StoreTypes";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { StoreContext } from "../../context/StoreContext";
// import Products from "../components/product/Products";
// import styles from "../components/product/product.module.css"
import { Link, useLocation } from "react-router-dom";
import Products from '../../components/product/Products';
import { AdminProps } from "../../types/PropsTypes";
import { UserContext } from "../../context/UsersContext";
import { Customer } from "../../types/CustomerType";
import styles from "./Admin.module.css"

export default function Admin() {

    const { addProduct, restoreDefaultProducts, removeProduct, updateStock, products, loadProducts } = useContext<any>(StoreContext);

    const [updatedProducts, setUpdatedProducts] = useState<Product>(products);

    const [productsToShow, setProductsToShow] = useState<ProductProps[]>([]);

    const [search, setSearch] = useState<string>('');

    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const { clients, setClients, reactivateClient, deactivateClient, editClient, addClient } = useContext<any>(UserContext);

    const [editingClientEmail, setEditingClientEmail] = useState<String | null>(null);

    const [isDeliveryAddressSame, setIsDeliveryAddressSame] = useState(true);
    // useEffect(() => {
    //     if (clients) {
    //         const isSame = clients.deliveryCity == "" && currentUser.deliveryStreet == "" && currentUser.deliveryNumberOfHome == 0;
    //         console.log('isSame', isSame);
    //         console.log(currentUser);
    //         setIsDeliveryAddressSame(isSame);
    //     }
    // }, [clients]);





    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    useEffect(() => {
        if (products) {
            setProductsToShow(products);
        }
    }, [products]);

    useEffect(() => {
        const filteredProducts = search === ''
            ? products
            : products.filter((item: ProductProps) => item.name.toLowerCase().includes(search.toLowerCase()));
        setProductsToShow(filteredProducts);
    }, [search, products]);

    const productSchema: Yup.ObjectSchema<Product> = Yup.object({
        // id: Yup.number().min(0, 'id must be greater then 0').required('please enter a valid ID num'),
        // name: Yup.string().required('must enter a valid product name'),
        // price: Yup.number().min(0, 'price must be greater then 0').required('please enter a valid price'),
        // salePrice: Yup.number().min(0, 'sale price must be greater then 0').max(100, 'sale price can not be larger then price').required('please enter a valid sale price'),
        // image: Yup.string().required('must enter a valid product image')
        id: Yup.number().min(0, 'id must be greater then 0').required('please enter a valid ID num'),
        name: Yup.string().required('must enter a valid product name'),
        shortDesc: Yup.string().required('must enter a valid short description'),
        longDesc: Yup.string(),
        img: Yup.string().required('must enter a valid product image'),
        currentQty: Yup.number().min(2, 'quantity must be greater than 1').required('please enter a valid quantity amount'),
        minimalQty: Yup.number().min(1, 'quantity must be greater than 0').max(Yup.ref('currentQty'), 'minimum quantity can not be larger than the current quantity').required('please enter a valid quantity amount'),
        price: Yup.number().min(0, 'price must be greater then 0').required('please enter a valid price'),
        salePrice: Yup.number().min(0, 'sale price must be greater then 0').max(Yup.ref('price'), 'sale price can not be larger then price').required('please enter a valid sale price')
    });

    const formValidation = useFormik<Product>({
        initialValues: {
            id: 0,
            name: "",
            shortDesc: "",
            longDesc: "",
            img: "",
            minimalQty: 0,
            currentQty: 0,
            price: 0,
            salePrice: 0
        },
        validationSchema: productSchema,
        onSubmit: (values) => {
            console.log('values', values);
            addProduct(values);
        },
    });

    const citiesInIsrael = ['ירושלים', 'תל אביב', 'חיפה', 'באר שבע', 'אילת', 'נתניה', 'חולון', 'אשדוד', 'פתח תקווה', 'ראשון לציון', 'בת ים', 'קריית אתא', 'נצרת', 'עכו', 'הרצליה', 'כפר סבא', 'רמת גן', 'בני ברק', 'רעננה', 'לוד', 'אופקים', 'הוד השרון'];

    const [filter] = useState('');
const filteredCities = citiesInIsrael.filter(city =>
  city.includes(filter)
);

    const clientValidation = useFormik({
        initialValues: {
          email: '',
          name: '',
          phone: '',
          img: '',
          date: Date(),
          password: '',
          isActive: false,
          city:'',
      street:'',
      numberOfHome:0,
      deliveryCity: '',
      deliveryStreet: '',
      deliveryNumberOfHome: 0
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Email is required").email("Invalid email address"),
            name: Yup.string().required("Name is required").matches(/^[A-Za-z]+$/, "Name must only contain English letters").max(50, "Max name length is 50"),
            phone: Yup.string().required("Phone is required").matches(/^05\d-\d{7}$/, "Phone number must be in the format 05x-xxxxxxx"),
            img: Yup.string().required("Image is required"),
            date: Yup.date().required("Date of birth is required").test('age', "You must be at least 18 years old", value => {
              const today = new Date();
              const birthDate = new Date(value);
              const minAgeDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
              return birthDate <= minAgeDate;
            }),
            password: Yup.string().required("Password is required").matches(/^[A-Za-z0-9^%$#@!]+$/, "Password must only contain English letters, numbers, and ^%$#@! special characters"),
            isActive: Yup.boolean().required("You must enter if the customer active or not"),
            city: Yup.string().required("City is required"),
            street: Yup.string().required("Street is required"),
            numberOfHome: Yup.number().required("Home/Apartment number is required").min(1, "Home/Apartment number must be above 1"),
            deliveryCity: Yup.string().when('isDeliveryAddressSame', (isDeliveryAddressSame, schema) => {
              return isDeliveryAddressSame ? schema.notRequired() : schema.required("Delivery City is required");
            }),
            deliveryStreet: Yup.string().when('isDeliveryAddressSame', (isDeliveryAddressSame, schema) => {
              return isDeliveryAddressSame ? schema.notRequired() : schema.required("Delivery Street is required");
            }),
            deliveryNumberOfHome: Yup.number().when('isDeliveryAddressSame', (isDeliveryAddressSame, schema) => {
              return isDeliveryAddressSame ? schema.notRequired() : schema.min(1, "Delivery Home/Apartment number must be above 1").required("Delivery Home/Apartment number is required");
            })
        }),
        onSubmit: (values) => {
            console.log('values', values);
            addClient(values);
        //   registerClient(values);
        //   if (values) {
        //     alert('Successfully signed up! Redirecting 3 seconds after the click');
        //     setTimeout(() => {
        //       navigate('/login');
        //    }, 3000);
        //   }
          }
    });

    return (
        <>
            <h1>Admin page:</h1>
            <br />
            <h2>Add Product</h2>
            <br />
            <form onSubmit={formValidation.handleSubmit}>
                <div className="input-holder">
                ID: <label htmlFor="id"></label>
                    <input id="id" type="number"
                        value={formValidation.values.id}
                        onChange={formValidation.handleChange}
                        onBlur={formValidation.handleBlur} />
                    {formValidation.errors.id && formValidation.touched.id ? <p style={{ color: "red" }}>{formValidation.errors.id}</p> : null}
                </div>
                <div className="input-holder">
                Product Name: <label htmlFor="name"></label>
                    <input id="name" type="text" maxLength={60}
                        value={formValidation.values.name}
                        onChange={formValidation.handleChange}
                        onBlur={formValidation.handleBlur}
                    />
                    {formValidation.errors.name && formValidation.touched.name ? <p style={{ color: "red" }}>{formValidation.errors.name}</p> : null}
                </div>
                <div className="input-holder">
                Short Description: <label htmlFor="shortDesc"></label>
                    <input id="shortDesc" type="text" maxLength={250}
                        value={formValidation.values.shortDesc}
                        onChange={formValidation.handleChange}
                        onBlur={formValidation.handleBlur}
                    />
                    {formValidation.errors.shortDesc && formValidation.touched.shortDesc ? <p style={{ color: "red" }}>{formValidation.errors.shortDesc}</p> : null}
                </div>
                <div className="input-holder">
                Long Description: <label htmlFor="longDesc"></label>
                    <input id="longDesc" type="text"
                        value={formValidation.values.longDesc}
                        onChange={formValidation.handleChange}
                        onBlur={formValidation.handleBlur}
                    />
                    {formValidation.errors.longDesc && formValidation.touched.longDesc ? <p style={{ color: "red" }}>{formValidation.errors.longDesc}</p> : null}
                </div>
                <div className="input-holder">
                Image: <label htmlFor="img"></label>
                    <input id="img" type="text"
                        value={formValidation.values.img}
                        onChange={formValidation.handleChange}
                        onBlur={formValidation.handleBlur} />
                    {formValidation.errors.img && formValidation.touched.img ? <p style={{ color: "red" }}>{formValidation.errors.img}</p> : null}
                </div>
                <div className="input-holder">
                Minimal Quantity: <label htmlFor="minimalQty"></label>
                    <input id="minimalQty" type="number"
                        value={formValidation.values.minimalQty}
                        onChange={formValidation.handleChange}
                        onBlur={formValidation.handleBlur} />
                    {formValidation.errors.minimalQty && formValidation.touched.minimalQty ? <p style={{ color: "red" }}>{formValidation.errors.minimalQty}</p> : null}
                </div>
                <div className="input-holder">
                Current Quantity: <label htmlFor="currentQty"></label>
                    <input id="currentQty" type="number"
                        value={formValidation.values.currentQty}
                        onChange={formValidation.handleChange}
                        onBlur={formValidation.handleBlur} />
                    {formValidation.errors.currentQty && formValidation.touched.currentQty ? <p style={{ color: "red" }}>{formValidation.errors.currentQty}</p> : null}
                </div>
                <div className="input-holder">
                Price: <label htmlFor="price"></label>
                    <input id="price" type="number"
                        value={formValidation.values.price}
                        onChange={formValidation.handleChange}
                        onBlur={formValidation.handleBlur} />
                    {formValidation.errors.price && formValidation.touched.price ? <p style={{ color: "red" }}>{formValidation.errors.price}</p> : null}
                </div>
                <div className="input-holder">
                Sale Price: <label htmlFor="salePrice"></label>
                    <input id="salePrice" type="number"
                        value={formValidation.values.salePrice}
                        onChange={formValidation.handleChange}
                        onBlur={formValidation.handleBlur} />
                    {formValidation.errors.salePrice && formValidation.touched.salePrice ? <p style={{ color: "red" }}>{formValidation.errors.salePrice}</p> : null}
                </div>
                <div className="input-holder">
                    <button type="submit">Add Product</button>
                </div>
            </form>
            <h2>Manage Clients</h2>
            <div>
                <ul className={styles.product_images}>
                    {clients.map((client: Customer) =>
                        <li key={client.email}><img src={client.img} alt="Could not load image" /><p>Name: {client.name}<br></br>Phone number: {client.phone}<br></br>Birth date: {String(client.date)}<br></br>Password: {client.password}<br></br>City name: {client.city}<br></br>Street: {client.street}<br></br>Home number: {client.numberOfHome}<br></br> {
                            (client.deliveryCity != "" || client.deliveryStreet != "" || client.deliveryNumberOfHome != 0) && (
                                <>
                                Delivery city: {client.deliveryCity}
                                <br />
                                Delivery Street: {client.deliveryStreet}
                                <br />
                                Delivery number of home: {client.deliveryNumberOfHome}
                                </>
                            )
                            
                        }</p>
                            {
                                
                                
                                client.isActive === true ? (
                                    <>
                                        <p>Client is active</p>
                                        <button onClick={() => deactivateClient(client.email)}>Deactivate Client</button>
                                    </>
                                )
                                    :
                                    (
                                        <>
                                            <p>Client is not active</p>
                                            <button onClick={() => reactivateClient(client.email)}>Reactivate Client</button>
                                        </>
                                    )
                            }
                            <button onClick={() => setEditingClientEmail(client.email)}>Edit Details</button>
                            {
                                editingClientEmail === client.email ? (
                                    <>
                                        <form onSubmit={(event) => {
                                            event.preventDefault();
                                            editClient(client);
                                            setEditingClientEmail(null); // Reset editingProductId state after saving
                                        }}>
                                            Change Name<input type="text" value={client.name}
                                                onChange={(event) => {
                                                    setClients((prevClients: Customer[]) => prevClients.map((item) => {
                                                        if (item.email === client.email) {
                                                            return { ...item, name: event.target.value };
                                                        }
                                                        return item;
                                                    }));
                                                }} />
                                            Phone Number<input type="text" value={client.phone}
                                                onChange={(event) => {
                                                    setClients((prevClients: Customer[]) => prevClients.map((item) => {
                                                        if (item.email === client.email) {
                                                            return { ...item, phone: event.target.value };
                                                        }
                                                        return item;
                                                    }));
                                                }} />
                                            Change Image<input type="text" value={client.img}
                                                onChange={(event) => {
                                                    setClients((prevClients: Customer[]) => prevClients.map((item) => {
                                                        if (item.email === client.email) {
                                                            return { ...item, img: event.target.value };
                                                        }
                                                        return item;
                                                    }));
                                                }} />
                                            Change Birth Date<input type="date" value={String(client.date)}
                                                onChange={(event) => {
                                                    setClients((prevClients: Customer[]) => prevClients.map((item) => {
                                                        if (item.email === client.email) {
                                                            return { ...item, date: event.target.value };
                                                        }
                                                        return item;
                                                    }));
                                                }} />
                                            Change Password<input type="text" value={client.password}
                                                onChange={(event) => {
                                                    setClients((prevClients: Customer[]) => prevClients.map((item) => {
                                                        if (item.email === client.email) {
                                                            return { ...item, password: event.target.value };
                                                        }
                                                        return item;
                                                    }));
                                                }} />
Change City<input type="text"
    value={client.city}
    onChange={(event) => {
        setClients((prevClients: Customer[]) => {
            const updatedClients = prevClients.map((item) => {
                if (item.email === client.email) {
                    return {
                        ...item,
                        city: event.target.value,
                    };
                }
                return item;
            });

            // Update localStorage
            localStorage.setItem('clients', JSON.stringify(updatedClients));
            return updatedClients;
        });
    }} />
    Change Street<input type="text"
    value={client.street}
    onChange={(event) => {
        setClients((prevClients: Customer[]) => {
            const updatedClients = prevClients.map((item) => {
                if (item.email === client.email) {
                    return {
                        ...item,
                        street: event.target.value,
                    };
                }
                return item;
            });

            // Update localStorage
            localStorage.setItem('clients', JSON.stringify(updatedClients));
            return updatedClients;
        });
    }} />
    Change Home Number<input type="number"
    value={client.numberOfHome}
    onChange={(event) => {
        setClients((prevClients: Customer[]) => {
            const updatedClients = prevClients.map((item) => {
                if (item.email === client.email) {
                    return {
                        ...item,
                        numberOfHome: Number(event.target.value),
                    };
                }
                return item;
            });

            // Update localStorage
            localStorage.setItem('clients', JSON.stringify(updatedClients));
            return updatedClients;
        });
    }} />
    { (client.deliveryCity != "" || client.deliveryStreet != "" || client.deliveryNumberOfHome != 0) ? (
      <>
      <p>Delivery Address</p>
      <p>Change Delivery City</p>
      <input type="text" value={client.deliveryCity}
      onChange={(event) => {
        setClients((prevClients: Customer[]) => {
            const updatedClients = prevClients.map((item) => {
                if (item.email === client.email) {
                    return {
                        ...item,
                        deliveryCity: event.target.value
                    };
                }
                return item;
            });

            // Update localStorage
            localStorage.setItem('clients', JSON.stringify(updatedClients));
            return updatedClients;
        });
    }}/>

      <p>Change Delivery Street</p>
      <input type="text" value={client.deliveryStreet}
      onChange={(event) => {
        setClients((prevClients: Customer[]) => {
            const updatedClients = prevClients.map((item) => {
                if (item.email === client.email) {
                    return {
                        ...item,
                        deliveryStreet: event.target.value
                    };
                }
                return item;
            });

            // Update localStorage
            localStorage.setItem('clients', JSON.stringify(updatedClients));
            return updatedClients;
        });
    }}/>

      <p>Change Delivery Home Number</p>
      <input type="number" value={client.deliveryNumberOfHome}
      onChange={(event) => {
        setClients((prevClients: Customer[]) => {
            const updatedClients = prevClients.map((item) => {
                if (item.email === client.email) {
                    return {
                        ...item,
                        deliveryNumberOfHome: Number(event.target.value)
                    };
                }
                return item;
            });

            // Update localStorage
            localStorage.setItem('clients', JSON.stringify(updatedClients));
            return updatedClients;
        });
      }}/>
      </>
    ) : ("")
}
    

                                            <button type="submit">Save!</button>
                                        </form>
                                    </>

                                ) : (
                                    <p></p>
                                )
                            }
                        </li>
                    )}
                </ul>
            </div>
            <h2>Store Stats</h2>
            <br />
            <div>
                <ul>

                </ul>
            </div>
            <h2>Add Client</h2>
            <br />
            <form onSubmit={clientValidation.handleSubmit}>
                <div className="input-holder">
                Email: <label htmlFor="email"></label>
                    <input type="text" id="email"
                        value={clientValidation.values.email}
                        onChange={clientValidation.handleChange}
                        onBlur={clientValidation.handleBlur}
                    />
                    {clientValidation.errors.email && clientValidation.touched.email ? <p style={{ color: "red" }}>{clientValidation.errors.email}</p> : null}
                </div>
                <div className="input-holder">
                Name: <label htmlFor="name"></label>
                    <input type="text" id="name"
                        value={clientValidation.values.name}
                        onChange={clientValidation.handleChange}
                        onBlur={clientValidation.handleBlur}
                    />
                    {clientValidation.errors.name && clientValidation.touched.name ? <p style={{ color: "red" }}>{clientValidation.errors.name}</p> : null}
                </div>
                <div className="input-holder">
                Phone Number: <label htmlFor="phone"></label>
                    <input type="text" id="phone"
                        value={clientValidation.values.phone}
                        onChange={clientValidation.handleChange}
                        onBlur={clientValidation.handleBlur}
                    />
                    {clientValidation.errors.phone && clientValidation.touched.phone ? <p style={{ color: "red" }}>{clientValidation.errors.phone}</p> : null}
                </div>
                <div className="input-holder">
                Image: <label htmlFor="img"></label>
                    <input type="text" id="img"
                        value={clientValidation.values.img}
                        onChange={clientValidation.handleChange}
                        onBlur={clientValidation.handleBlur}
                    />
                    {clientValidation.errors.img && clientValidation.touched.img ? <p style={{ color: "red" }}>{clientValidation.errors.img}</p> : null}
                </div>
                <div className="input-holder">
                Birth Date: <label htmlFor="date"></label>
                    <input type="date" id="date"
                        value={clientValidation.values.date}
                        onChange={clientValidation.handleChange}
                        onBlur={clientValidation.handleBlur}
                    />
                    {clientValidation.errors.date && clientValidation.touched.date ? <p style={{ color: "red" }}>{clientValidation.errors.date}</p> : null}
                </div>
                <div className="input-holder">
                Password: <label htmlFor="password"></label>
                    <input type="password" id="password"
                        value={clientValidation.values.password}
                        onChange={clientValidation.handleChange}
                        onBlur={clientValidation.handleBlur}
                    />
                    {clientValidation.errors.password && clientValidation.touched.password ? <p style={{ color: "red" }}>{clientValidation.errors.password}</p> : null}
                </div>
                <div className="input-holder">
                Is User Active: <label htmlFor="isActive"></label>
                    <input type="checkbox" id="isActive"
                        checked={clientValidation.values.isActive}
                        onChange={clientValidation.handleChange}
                        onBlur={clientValidation.handleBlur}
                    />
                    {clientValidation.errors.isActive && clientValidation.touched.isActive ? <p style={{ color: "red" }}>{clientValidation.errors.isActive}</p> : null}
                </div>
                <div className="input-holder">
                City: <label htmlFor="city"></label>
                    <input type="text" id="city"
                        value={clientValidation.values.city}
                        onChange={clientValidation.handleChange}
                        onBlur={clientValidation.handleBlur}
                        placeholder="הכנס אות לסינון רשימת הערים"
                        list='cityList'
                    />
                    <datalist id='cityList'>
                    {
                    filteredCities.map((city, index) => (<option key={index} value={city}></option>))
                  }
                  </datalist>
                  {clientValidation.errors.city && clientValidation.touched.city ? <p style={{ color: "red" }}>{clientValidation.errors.city}</p> : null}
                </div>
                <div className="input-holder">
                Street: <label htmlFor="street"></label>
                    <input type="text" id="street"
                        value={clientValidation.values.street}
                        onChange={clientValidation.handleChange}
                        onBlur={clientValidation.handleBlur}
                    />
                    {clientValidation.errors.street && clientValidation.touched.street ? <p style={{ color: "red" }}>{clientValidation.errors.street}</p> : null}
                </div>
                <div className="input-holder">
                Home/Apartment Number: <label htmlFor="numberOfHome"></label>
                    <input type="number" id="numberOfHome"
                        value={clientValidation.values.numberOfHome}
                        onChange={clientValidation.handleChange}
                        onBlur={clientValidation.handleBlur}
                    />
                    {clientValidation.errors.numberOfHome && clientValidation.touched.numberOfHome ? <p style={{ color: "red" }}>{clientValidation.errors.numberOfHome}</p> : null}
                </div>
                <div className="input-holder">
                Is Delivery Address Same as Home Address: <label htmlFor="isDeliveryAddressSame"></label>
  <input
    type="checkbox"
    id="isDeliveryAddressSame"
    checked={isDeliveryAddressSame}
    onChange={() => setIsDeliveryAddressSame(!isDeliveryAddressSame)}
  />
</div>
{!isDeliveryAddressSame && (
  <>
    <div className="input-holder">
    Delivery City: <label htmlFor="deliveryCity"></label>
      <input type="text" id="deliveryCity"
        value={clientValidation.values.deliveryCity}
        onChange={clientValidation.handleChange}
        onBlur={clientValidation.handleBlur}
        list='cityList'
      />
      {clientValidation.errors.deliveryCity && clientValidation.touched.deliveryCity ? <p style={{ color: "red" }}>{clientValidation.errors.deliveryCity}</p> : null}
    </div>
    <div className="input-holder">
    Delivery Street: <label htmlFor="deliveryStreet"></label>
      <input type="text" id="deliveryStreet"
        value={clientValidation.values.deliveryStreet}
        onChange={clientValidation.handleChange}
        onBlur={clientValidation.handleBlur}
      />
      {clientValidation.errors.deliveryStreet && clientValidation.touched.deliveryStreet ? <p style={{ color: "red" }}>{clientValidation.errors.deliveryStreet}</p> : null}
    </div>
    <div className="input-holder">
    Delivery Home/Apartment Number: <label htmlFor="deliveryNumberOfHome"></label>
      <input type="number" id="deliveryNumberOfHome"
        value={clientValidation.values.deliveryNumberOfHome}
        onChange={clientValidation.handleChange}
        onBlur={clientValidation.handleBlur}
      />
      {clientValidation.errors.deliveryNumberOfHome && clientValidation.touched.deliveryNumberOfHome ? <p style={{ color: "red" }}>{clientValidation.errors.deliveryNumberOfHome}</p> : null}
    </div>
  </>
)}
    <div className="input-holder">
        <button type="submit">Add Client</button>
    </div>
</form>
            <h2>Product List</h2>
            <br />
            <div>
                <p className={styles.disappear} id={styles.koteretfix}>welcome to our store</p>
                <input className={styles.disappear} type="search" value={search} onChange={(event) => setSearch(event.target.value)} />
                <Products productsToShow={productsToShow} page='admin' />
            </div>
        </>
    )
}



{/* <button onClick={() => removeProduct(updatedProducts.id)}>Remove</button> */ }





// import React from 'react'
// import Navbar from '../components/navbar/Navbar';


// export default function Admin() {
//   return (
//     <div>
//     <Navbar/>
//   <p>Admin</p>
//   </div>
//   )
// }