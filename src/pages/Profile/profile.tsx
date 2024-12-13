import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UsersContext";
import { Link, useNavigate } from "react-router-dom";
import EditDetails from "../../components/EditDetails";
import { Customer } from "../../types/CustomerType";
import styles from "./profile.module.css"

export default function Profile({purchaseHistory}: Customer) {

    const { currentUser, setClient, saveClientToSession, logoutClient, clients } = useContext<any>(UserContext);

    const [isDeliveryAddressSame, setIsDeliveryAddressSame] = useState(true);
    const [showEditDetails, setShowEditDetails] = useState(false); // תומר

    useEffect(() => {
        if (clients) {
            const isSame = clients.deliveryCity == "" && clients.deliveryStreet == "" && clients.deliveryNumberOfHome == 0;
            console.log('isSame', isSame);
            console.log(clients);
            setIsDeliveryAddressSame(isSame);
        }
    }, [clients]);

    if (!clients) {
        return (
            <>
            <p>Please sign in to the system.</p>
            <Link to='/login'>To login page</Link>
            </>
        ) 
    }
    console.log('working', clients);
    return (
        <>
        <div className={styles.container}>     
      {
                clients.map((client: Customer) => <li key={client.email}><img src={client.img} alt="Could not load image" /><p>Name: {client.name}<br></br>Phone number: {client.phone}<br></br>Birth date: {String(client.date)}<br></br>Password: {client.password}<br></br>City name: {client.city}<br></br>Street: {client.street}<br></br>Home number: {client.numberOfHome}<br></br> {
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
<button className={styles.logout} onClick={() => logoutClient(client.email)}>Log Out</button>
<button className={styles.edit} onClick={() => setShowEditDetails(true)}>Edit Details</button>
{showEditDetails && <EditDetails />}
                </li>
                )
            }
    </div>
    <h2>Purchase History</h2> 
    </>
    );
};











// {showEditDetails && <EditDetails />} {/* תומר */}
// <button onClick={() => logoutClient(currentUser.email)}>Log Out</button>
//     <button onClick={() => setShowEditDetails(true)}>Edit Details</button> {/* תומר */}