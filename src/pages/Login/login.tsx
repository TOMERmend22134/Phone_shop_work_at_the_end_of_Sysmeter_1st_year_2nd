import { useFormik } from "formik";
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from "../../context/UsersContext";
import styles from "./login.module.css"


export default function Login() {

    const navigate = useNavigate();
    const { currentUser, setCurrentUser, loginClient } = useContext<any>(UserContext);

    const loginValidation = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Email is required").email("Invalid email address"),
            password: Yup.string().required("Password is required").min(3, "Password must have at least 6 characters").max(18, "Max password length is 18"),
        }),
        onSubmit: (values) => {
            console.log('values', values);
            if (values.email === 'admin@admin.com' && values.password === 'ad12343211ad') {
                navigate('/admin'); // Directly navigate to admin if credentials match
            } else {
                const loginSuccess = loginClient(values); // Attempt to login and get success status
                if (loginSuccess) {
                    navigate('/profile'); // Navigate to profile if login is successful
                } else {
                    alert('Invalid Email or Password'); // Alert the user if login fails
                }
            }
        }
    });

    return (
        <>
        <h1 id={styles.fixSpacingOfHeader}>Log in:</h1>
            <form className={styles.form} onSubmit={loginValidation.handleSubmit}>
                <div className="input-holder">
                Email<label htmlFor="email"></label>
                    <input type="text" id="email"
                        value={loginValidation.values.email}
                        onChange={loginValidation.handleChange}
                        onBlur={loginValidation.handleBlur}
                    />
                    {loginValidation.errors.email && loginValidation.touched.email ? <p style={{ color: "red" }}>{loginValidation.errors.email}</p> : null}
                </div>
                <div className="input-holder">
                Password<label htmlFor="password"></label>
                    <input type="password" id="password"
                        value={loginValidation.values.password}
                        onChange={loginValidation.handleChange}
                        onBlur={loginValidation.handleBlur}
                    />
                    {loginValidation.errors.password && loginValidation.touched.password ? <p style={{ color: "red" }}>{loginValidation.errors.password}</p> : null}
                </div>
                <div className="input-holder">
                    <button type="submit">Login</button>
                </div>
            </form>
        </>
    )

}



// import React from 'react'
// import Navbar from '../components/navbar/Navbar'

// export default function Login() {
//   return (
//     )
//   }
  
  //   <div>
  //   <Navbar/>
  // <p>login</p>
  // </div>