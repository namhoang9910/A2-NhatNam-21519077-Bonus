import { useState, useEffect } from 'react';  // import useEffect
import ContactList from './components/ContactList';
import CompanyList from './components/CompanyList';
import ItemList from './components/ItemList';
import CustomerList from './components/CustomerList';
import OrderList from './components/OrderList';
import Stats from './components/Stats';
import './App.css';
import Order from './components/Order';

function App() {
    const [contacts, setContacts] = useState([]);
    const [companies, setCompanies] = useState([]);  
    const [items, setItems] = useState([]);  
    const [customers, setCustomers] = useState([]);  
    const [orders, setOrders] = useState([]);  

    // Fetch contacts
    useEffect(() => {
        fetch('http://localhost/api/contacts')
            .then(response => response.json())
            .then(data => setContacts(data))
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    // Fetch companies
    useEffect(() => {
        fetch('http://localhost/api/companies')
            .then(response => response.json())
            .then(data => setCompanies(data))
            .catch((error) => {
                console.error('Error fetching companies:', error);
            });
    }, []);

    // Fetch items
    useEffect(() => {
        fetch('http://localhost/api/items')  
            .then(response => response.json())
            .then(data => setItems(data))
            .catch((error) => {
                console.error('Error fetching items:', error);
            });
    }, []);

    // Fetch customers
    useEffect(() => {
        fetch('http://localhost/api/customers')  
            .then(response => response.json())
            .then(data => setCustomers(data))
            .catch((error) => {
                console.error('Error fetching customers:', error);
            });
    }, []);

    // Fetch orders
    useEffect(() => {
        fetch('http://localhost/api/orders')  
            .then(response => response.json())
            .then(data => setOrders(data))
            .catch((error) => {
                console.error('Error fetching orders:', error);
            });
    }, []);

    return (
        <div className='page'>
            <h1>Contactor Book</h1>
            <ContactList contacts={contacts} setContacts={setContacts} />
            <p>Click a contact to view associated phone numbers</p>
            <Stats />
            <h1>Company Book</h1> 
            <CompanyList companies={companies} setCompanies={setCompanies} /> 
            <h1>Item Book</h1> 
            <ItemList items={items} setItems={setItems} />
            <h1>Customer Book</h1> 
            <CustomerList customers={customers} setCustomers={setCustomers} />
            <h1>Order Book</h1> 
            <OrderList orders={orders} setOrders={setOrders} />
        </div>
    );
}

export default App;