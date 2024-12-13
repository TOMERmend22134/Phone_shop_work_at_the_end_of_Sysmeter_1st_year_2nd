import { useContext, useState } from "react"
import { UserContext } from "../context/UsersContext"
import { Customer } from "../types/CustomerType";

export default function EditDetails() {
    const {  editclient, clients, editClient, setClient, setClients} = useContext<any>(UserContext);
    const [editingclientEmail, setEditingclientEmail] = useState<string | null>(String);


    return (
        <>
            {
                <ul>
                {clients.map((client: Customer) =>
                    <li key={client.email}>
                        {
                                <form onSubmit={(event) => {
                                    event.preventDefault();
                                    editclient(client);
                                    setEditingclientEmail(null); // Reset editingProductId state after saving
                                }}>
                                    Change Name<input type="text" value={client.name}
                                        onChange={(event) => {
                                            const updatedValue = event.target.value;
                                            setClients((prevclient: Customer[]) => ({
                                                ...prevclient,
                                                name: updatedValue
                                            }));
                                        }} />
                                    Phone Number<input type="text" value={client.phone}
                                        onChange={(event) => {
                                            const updatedValue = event.target.value;
                                            setClients((prevclient: Customer[]) => ({
                                                ...prevclient,
                                                phone: updatedValue
                                            }));
                                        }} />
                                    Change Image<input type="text" value={client.img}
                                        onChange={(event) => {
                                            const updatedValue = event.target.value;
                                            setClients((prevclient: Customer[]) => ({
                                                ...prevclient,
                                                img: updatedValue
                                            }));
                                        }} />
                                    Change Birth Date<input type="date" value={String(client.date)}
                                        onChange={(event) => {
                                            const updatedValue = event.target.value;
                                            setClients((prevclient: Customer[]) => ({
                                                ...prevclient,
                                                date: updatedValue
                                            }));
                                        }} />
                                    Change Password<input type="text" value={client.password}
                                        onChange={(event) => {
                                            const updatedValue = event.target.value;
                                            setClients((prevclient: Customer[]) => ({
                                                ...prevclient,
                                                password: updatedValue
                                            }));
                                        }} />
                                    Change City<input type="text"
                                        value={client.city}
                                        onChange={(event) => {
                                            const updatedValue = event.target.value;
                                            setClients((prevclient: Customer[]) => ({
                                                ...prevclient,
                                                city: updatedValue
                                            }));
                                            localStorage.setItem('client', JSON.stringify(updatedValue));
                                            return updatedValue;
                                        }} />
                                    Change Street<input type="text"
                                        value={client.street}
                                        onChange={(event) => {
                                            const updatedValue = event.target.value;
                                            setClients((prevclient: Customer[]) => ({
                                                ...prevclient,
                                                street: updatedValue
                                            }));
                                            localStorage.setItem('client', JSON.stringify(updatedValue));
                                            return updatedValue;
                                        }} />
                                    Change Home Number<input type="number"
                                        value={client.numberOfHome}
                                        onChange={(event) => {
                                            const updatedValue = Number(event.target.value);
                                            setClients((prevclient: Customer[]) => ({
                                                ...prevclient,
                                                numberOfHome: updatedValue
                                            }));
                                            localStorage.setItem('client', JSON.stringify(updatedValue));
                                            return updatedValue;
                                        }} />
                                    {(client.deliveryCity != "" || client.deliveryStreet != "" || client.deliveryNumberOfHome != 0) ? (
                                        <>
                                            <p>Delivery Address</p>
                                            <p>Change Delivery City</p>
                                            <input type="text" value={client.deliveryCity}
                                                onChange={(event) => {
                                                    const updatedValue = event.target.value;
                                                    setClients((prevclient: Customer[]) => ({
                                                        ...prevclient,
                                                        deliveryCity: updatedValue
                                                    }));
                                                    localStorage.setItem('client', JSON.stringify(updatedValue));
                                                    return updatedValue;
                                                }} />

                                            <p>Change Delivery Street</p>
                                            <input type="text" value={client.deliveryStreet}
                                                onChange={(event) => {
                                                    const updatedValue = event.target.value;
                                                    setClients((prevclient: Customer[]) => ({
                                                        ...prevclient,
                                                        deliveryStreet: updatedValue
                                                    }));
                                                    localStorage.setItem('client', JSON.stringify(updatedValue));
                                                    return updatedValue;
                                                }} />

                                            <p>Change Delivery Home Number</p>
                                            <input type="number" value={client.deliveryNumberOfHome}
                                                onChange={(event) => {
                                                    const updatedValue = Number(event.target.value);
                                                    setClients((prevclient: Customer[]) => ({
                                                        ...prevclient,
                                                        deliveryNumberOfHome: updatedValue
                                                    }));
                                                    localStorage.setItem('client', JSON.stringify(updatedValue));
                                                    return updatedValue;
                                                }} />
                                        </>
                                    ) : ("")
                                    }
                                    <button type="submit">Save</button>
                                </form>
                                
                    }</li>

                )}
                </ul>
            }
        </>
    );
}