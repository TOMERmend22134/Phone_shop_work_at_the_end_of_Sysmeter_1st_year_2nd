
import Navbar from '../../components/navbar/Navbar'
import { UserContext } from '../../context/UsersContext';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
// import { Address } from '../types/CustomerType';
import styles from "./signup.module.css";



export default function Signup() {
    const navigate = useNavigate();
//   const { users, setUsers } = useContext<any>(UserContext);
  const {registerClient, client, setClient} = useContext<any>(UserContext);
  const [isDeliveryAddressSame, setIsDeliveryAddressSame] = useState(true);


  const toggleDeliveryAddress = () => {
    setIsDeliveryAddressSame(!isDeliveryAddressSame);
    if (!isDeliveryAddressSame) {
      signUpValidation.setFieldValue('deliveryCity', '');
      signUpValidation.setFieldValue('deliveryStreet', '');
      signUpValidation.setFieldValue('deliveryNumberOfHome', '');
    } else {
      signUpValidation.setFieldValue('deliveryCity', signUpValidation.values.city);
      signUpValidation.setFieldValue('deliveryStreet', signUpValidation.values.street);
      signUpValidation.setFieldValue('deliveryNumberOfHome', signUpValidation.values.numberOfHome);
    }
  };

const citiesInIsrael = ['ירושלים', 'תל אביב', 'חיפה', 'באר שבע', 'אילת', 'נתניה', 'חולון', 'אשדוד', 'פתח תקווה', 'ראשון לציון', 'בת ים', 'קריית אתא', 'נצרת', 'עכו', 'הרצליה', 'כפר סבא', 'רמת גן', 'בני ברק', 'רעננה', 'לוד', 'אופקים', 'הוד השרון'];

const [filter] = useState('');
const filteredCities = citiesInIsrael.filter(city =>
  city.includes(filter)
);

  const signUpValidation = useFormik({
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
        registerClient(values);
        if (values) {
          alert('Successfully signed up! Redirecting 3 seconds after the click');
          setTimeout(() => {
            navigate('/login');
         }, 3000);
        }
        }
  });
  return (
    <>
    {/* <Navbar /> */}
    <h1 id={styles.signUpChanger}>Sign up:</h1>
      <form onSubmit={signUpValidation.handleSubmit}>
                <div className="input-holder">
                Email:<label htmlFor="email"></label>
                    <input type="text" id="email"
                        value={signUpValidation.values.email}
                        onChange={signUpValidation.handleChange}
                        onBlur={signUpValidation.handleBlur}
                    />
                    {signUpValidation.errors.email && signUpValidation.touched.email ? <p style={{ color: "red" }}>{signUpValidation.errors.email}</p> : null}
                </div>
                <div className="input-holder">
                Name: <label htmlFor="name"></label>
                    <input type="text" id="name"
                        value={signUpValidation.values.name}
                        onChange={signUpValidation.handleChange}
                        onBlur={signUpValidation.handleBlur}
                    />
                    {signUpValidation.errors.name && signUpValidation.touched.name ? <p style={{ color: "red" }}>{signUpValidation.errors.name}</p> : null}
                </div>
                <div className="input-holder">
                Phone Number: <label htmlFor="phone"></label>
                    <input type="text" id="phone"
                        value={signUpValidation.values.phone}
                        onChange={signUpValidation.handleChange}
                        onBlur={signUpValidation.handleBlur}
                    />
                    {signUpValidation.errors.phone && signUpValidation.touched.phone ? <p style={{ color: "red" }}>{signUpValidation.errors.phone}</p> : null}
                </div>
                <div className="input-holder">
                Image: <label htmlFor="img"></label>
                    <input type="text" id="img"
                        value={signUpValidation.values.img}
                        onChange={signUpValidation.handleChange}
                        onBlur={signUpValidation.handleBlur}
                    />
                    {signUpValidation.errors.img && signUpValidation.touched.img ? <p style={{ color: "red" }}>{signUpValidation.errors.img}</p> : null}
                </div>
                <div className="input-holder">
                Birth Date: <label htmlFor="date"></label>
                    <input type="date" id="date"
                        value={signUpValidation.values.date}
                        onChange={signUpValidation.handleChange}
                        onBlur={signUpValidation.handleBlur}
                    />
                    {signUpValidation.errors.date && signUpValidation.touched.date ? <p style={{ color: "red" }}>{signUpValidation.errors.date}</p> : null}
                </div>
                <div className="input-holder">
                Password: <label htmlFor="password"></label>
                    <input type="password" id="password"
                        value={signUpValidation.values.password}
                        onChange={signUpValidation.handleChange}
                        onBlur={signUpValidation.handleBlur}
                    />
                    {signUpValidation.errors.password && signUpValidation.touched.password ? <p style={{ color: "red" }}>{signUpValidation.errors.password}</p> : null}
                </div>
                <div className="input-holder">
                Is User Active: <label htmlFor="isActive"></label>
                    <input type="checkbox" id="isActive"
                        checked={signUpValidation.values.isActive}
                        onChange={signUpValidation.handleChange}
                        onBlur={signUpValidation.handleBlur}
                    />
                    {signUpValidation.errors.isActive && signUpValidation.touched.isActive ? <p style={{ color: "red" }}>{signUpValidation.errors.isActive}</p> : null}
                </div>
                <div className="input-holder">
                City: <label htmlFor="city"></label>
                    <input type="city" id="city"
                        value={signUpValidation.values.city}
                        onChange={signUpValidation.handleChange}
                        onBlur={signUpValidation.handleBlur}
                        placeholder="הכנס אות לסינון רשימת הערים"
                        list='cityList'
                    />
                    <datalist id='cityList'>
                    {
                    filteredCities.map((city, index) => (<option key={index} value={city}></option>))
                  }
                  </datalist>
                  {signUpValidation.errors.city && signUpValidation.touched.city ? <p style={{ color: "red" }}>{signUpValidation.errors.city}</p> : null}
                </div>
                <div className="input-holder">
                Street: <label htmlFor="street"></label>
                    <input type="street" id="street"
                        value={signUpValidation.values.street}
                        onChange={signUpValidation.handleChange}
                        onBlur={signUpValidation.handleBlur}
                    />
                    {signUpValidation.errors.street && signUpValidation.touched.street ? <p style={{ color: "red" }}>{signUpValidation.errors.street}</p> : null}
                </div>
                <div className="input-holder">
                Home/Apartment Number: <label htmlFor="numberOfHome"></label>
                    <input type="numberOfHome" id="numberOfHome"
                        value={signUpValidation.values.numberOfHome}
                        onChange={signUpValidation.handleChange}
                        onBlur={signUpValidation.handleBlur}
                    />
                    {signUpValidation.errors.numberOfHome && signUpValidation.touched.numberOfHome ? <p style={{ color: "red" }}>{signUpValidation.errors.numberOfHome}</p> : null}
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
      <label htmlFor="deliveryCity">Delivery City: </label>
      <input type="text" id="deliveryCity"
        value={signUpValidation.values.deliveryCity}
        onChange={signUpValidation.handleChange}
        onBlur={signUpValidation.handleBlur}
        list='cityList'
      />
      {signUpValidation.errors.deliveryCity && signUpValidation.touched.deliveryCity ? <p style={{ color: "red" }}>{signUpValidation.errors.deliveryCity}</p> : null}
    </div>
    <div className="input-holder">
      <label htmlFor="deliveryStreet">Delivery Street: </label>
      <input type="text" id="deliveryStreet"
        value={signUpValidation.values.deliveryStreet}
        onChange={signUpValidation.handleChange}
        onBlur={signUpValidation.handleBlur}
      />
      {signUpValidation.errors.deliveryStreet && signUpValidation.touched.deliveryStreet ? <p style={{ color: "red" }}>{signUpValidation.errors.deliveryStreet}</p> : null}
    </div>
    <div className="input-holder">
      <label htmlFor="deliveryNumberOfHome">Delivery Home/Apartment Number: </label>
      <input type="number" id="deliveryNumberOfHome"
        value={signUpValidation.values.deliveryNumberOfHome}
        onChange={signUpValidation.handleChange}
        onBlur={signUpValidation.handleBlur}
      />
      {signUpValidation.errors.deliveryNumberOfHome && signUpValidation.touched.deliveryNumberOfHome ? <p style={{ color: "red" }}>{signUpValidation.errors.deliveryNumberOfHome}</p> : null}
    </div>
  </>
)}
    <div className="input-holder">
        <button type="submit">Sign Up</button>
    </div>
</form>
    </>
  )
}
