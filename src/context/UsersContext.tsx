import { createContext, useEffect, useState } from "react";
import { UserContextProviderProps } from "../types/PropsTypes";
import { Customer } from "../types/CustomerType";

export const UserContext = createContext({});

export default function UserContextProvider({ children }: UserContextProviderProps) {
    const [clients, setClients] = useState<Customer[]>(() => {
        // Get the stored clients from localStorage and parse them
        const storedClients = localStorage.getItem('clients');
        // If there are stored clients, return them, otherwise return an empty array
        return storedClients ? JSON.parse(storedClients) : [];
    });
    // const [users, setUsers] = useState([
    //     { email: "tomer@gmail.com", password: "12345", name: "Tomer" },
    //     { email: "ido@gmail.com", password: "34567", name: "Ido" }
    // ]);
    const [currentUser, setCurrentUser] = useState<Customer | undefined>();

    const [isActive, setIsActive] = useState<boolean>(false);

    const [client, setClient] = useState<Customer | null>(null);

    // useEffect(() => {
    //     // Save cart to sessionStorage whenever it changes
    //     // sessionStorage.setItem('updatedClients', JSON.stringify(clients));
        
    //     localStorage.setItem('clients', JSON.stringify(clients));
    //   }, [clients]);

    function loadClients() {
    let clients = localStorage.getItem('clients');
    if (clients) //if(clients !== undefined)
        return JSON.parse(clients) as Customer[];
    return [];
    }

    function registerClient(item: Customer) {
        console.log(item);
        const existingClient = clients.find((client) => client.email === item.email);
        if (!existingClient) {
          const newClients = [...clients, item];
          setClients(newClients);
          localStorage.setItem('clients', JSON.stringify(newClients));
        } else {
          alert("Client already exists in the database.");
        }
    }

    function loginClient(client: Customer) {
        // Assuming 'clients' is a key in localStorage that contains an array of users
        const clientsString = localStorage.getItem('clients');
        const clientsArray = clientsString ? JSON.parse(clientsString) : [];
    
        // Find the client in the array
        const user = clientsArray.find((u: Customer) => u.email === client.email && u.password === client.password);
    
        if (user) {
            // User found, set current user and save to sessionStorage
            setCurrentUser(user);
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            return true; // Indicates success
        } else {
            // User not found
            return false; // Indicates failure
        }
    }


    useEffect(() => {
        let clients = loadClients();
        const storedClients = localStorage.getItem('clients');
  if (storedClients) {
    setClients(JSON.parse(storedClients));
    } else {
        setClients([])
    }
}, [])
//TODO: לשאול את שי
    // function loginClient(item: Customer) {
    //     const existingClient = users.find((user) => user.email === item.email );
    // }

    function deactivateClient (email: string) {
        const updatedClients = clients.map(client => {
            if (client.email === email) {
                return { ...client, isActive: false };
            }
            return client;
        });
        setClients(updatedClients);
    localStorage.setItem('clients', JSON.stringify(updatedClients));
    };

    // Function to reactivate a client
    function reactivateClient (email: string) {
        const updatedClients = clients.map(client => {
            if (client.email === email) {
                return { ...client, isActive: true };
            }
            return client;
        });
        setClients(updatedClients);
    localStorage.setItem('clients', JSON.stringify(updatedClients));
    };

    function editClient(client: Customer) {
        let updatedClients = clients.map((item) => {
            if (item.email === client.email) {
              return client;
            }
            return item;
        });
      
        setClients(updatedClients);
        localStorage.setItem('clients', JSON.stringify(updatedClients));
    }

    function addClient(item: Customer) {
        const existingClient = clients.find((client) => client.email === item.email);
        if (!existingClient) {
          const newClients = [...clients, item];
          setClients(newClients);
          localStorage.setItem('clients', JSON.stringify(newClients));
        } else {
          alert("Client already exists in the database.");
        }
      }

      function logoutClient(email: string) {
        // Retrieve the current user from sessionStorage
        const currentUserString = sessionStorage.getItem('currentUser');
        const currentUser = currentUserString ? JSON.parse(currentUserString) : null;
      
        // Check if the provided email matches the logged-in client's email
        if (currentUser && currentUser.email === email) {
          // Clear sessionStorage to log out the client
          sessionStorage.clear(); // This clears everything in sessionStorage
      
          // Alternatively, if you want to remove only the currentUser item, use:
          // sessionStorage.removeItem('currentUser');
      
          // Reset the currentUser in the context state if you're storing it there
          setCurrentUser(undefined);
      
          // Any other cleanup logic can go here
          // ...
      
          // Return true to indicate the client was logged out successfully
          alert("You have successfully logged out!");
          return true;
        } else {
          // Return false to indicate that the provided email did not match
          // or there was no client logged in
          return false;
        }
      }

      function editCurrentUser(currentUser: Customer) {
        let updatedCurrentUser = currentUser;
        setCurrentUser(updatedCurrentUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
    }
      
      
    //   function saveClientToSession(client: Customer) {
    //     sessionStorage.setItem('client', JSON.stringify(client));
    //     setClient(client);
    //   };
    
    //   // Check session storage for client details when the component mounts
    //   useEffect(() => {
    //     const storedClient = sessionStorage.getItem('client');
    //     if (storedClient) {
    //       setClient(JSON.parse(storedClient));
    //     }
    //   }, []);
    

    // function editClient(user: Customer) {
    //     // const existingClient = users.find((user) => user.name === item.name);
    //     let updatedClients = users.map((item) => {
    //          if (item.name === user.name)
    //             return user;
    //         return item;
    // });



    const value = {
        clients,
        setClients,
        currentUser,
        setCurrentUser,
        registerClient,
        loginClient,
        deactivateClient,
        reactivateClient,
        editClient,
        addClient,
        logoutClient,
        editCurrentUser
        // client,
        // setClient,
        // saveClientToSession
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}