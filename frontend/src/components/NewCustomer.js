import { useState } from 'react';

function NewCustomer(props) {
    const { customers, setCustomers } = props;
    const [customer_name, setCustomerName] = useState('');
    const [customer_email, setCustomerEmail] = useState('');
    const [customer_phone, setCustomerPhone] = useState('');

    async function createCustomer(e) {
        e.preventDefault();

        const response = await fetch('http://localhost/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                customer_name,
                customer_email,
                customer_phone
            })
        });

        const data = await response.json();

        if (data.customer_id) {
            setCustomers([...customers, data]);
        }

        setCustomerName('');
        setCustomerEmail('');
        setCustomerPhone('');
    }

    return (
        <form className='new-customer' onSubmit={createCustomer}>
            <div style={{ marginBottom: '20px' }}>
                <label>Customer Name:</label>
                <input 
                    type='text' 
                    placeholder='Enter Customer Name' 
                    onChange={(e) => setCustomerName(e.target.value)} 
                    value={customer_name}
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <label>Customer Email:</label>
                <input 
                    type='email' 
                    placeholder='Enter Customer Email' 
                    onChange={(e) => setCustomerEmail(e.target.value)} 
                    value={customer_email}
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <label>Customer Phone:</label>
                <input 
                    type='text' 
                    placeholder='Enter Customer Phone' 
                    onChange={(e) => setCustomerPhone(e.target.value)} 
                    value={customer_phone}
                />
            </div>
            <button type='submit'>Create Customer</button>
        </form>
    );
}

export default NewCustomer;
