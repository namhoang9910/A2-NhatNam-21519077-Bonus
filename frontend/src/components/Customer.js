import { useState } from 'react';

function Customer(props) {
    const { customer, customers, setCustomers } = props;
    const [expanded, setExpanded] = useState(false);
    const [customerName, setCustomerName] = useState(customer.customer_name);
    const [customerEmail, setCustomerEmail] = useState(customer.customer_email);
    const [customerPhone, setCustomerPhone] = useState(customer.customer_phone);
    const [isEditing, setIsEditing] = useState(false);

    const expandStyle = {
        display: expanded ? 'block' : 'none'
    };

    async function doDelete(e) {
        e.stopPropagation();
        try {
            const response = await fetch('http://localhost/api/customers/' + customer.customer_id, {
                method: 'DELETE',
            });

            if (response.ok) {
                const newCustomers = customers.filter(c => c.customer_id !== customer.customer_id);
                setCustomers(newCustomers);
            } else {
                console.error('Failed to delete customer:', response);
                alert('Failed to delete customer. Please try again.');
            }
        } catch (error) {
            console.error('Error during deletion:', error);
            alert('An error occurred during deletion. Please try again.');
        }
    }

    async function doUpdate(e) {
        e.preventDefault();

        const updatedCustomer = {
            customer_name: customerName,
            customer_email: customerEmail,
            customer_phone: customerPhone,
        };

        const response = await fetch('http://localhost/api/customers/' + customer.customer_id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCustomer),
        });

        const responseData = await response.json();

        if (response.ok) {
            const updatedCustomers = customers.map((c) =>
                c.customer_id === customer.customer_id ? { ...c, ...updatedCustomer } : c
            );
            setCustomers(updatedCustomers);
            setIsEditing(false);
        } else {
            console.error('Failed to update customer:', responseData);
            alert('Failed to update customer details. Please try again.');
        }
    }

    return (
        <div key={customer.customer_id} className='customer' onClick={(e) => e.stopPropagation()}>
            <div className='title' onClick={() => setExpanded(!expanded)}>
                <h3>{customer.customer_name}</h3>
            </div>

            <div style={expandStyle}>
                <hr />
                {isEditing ? (
                    <form className='new-customer' onSubmit={doUpdate}>
                        <div style={{ marginBottom: '20px' }}>
                            <label>Customer Name:</label>
                            <input 
                                type='text' 
                                value={customerName} 
                                onChange={(e) => setCustomerName(e.target.value)} 
                            />
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label>Customer Email:</label>
                            <input 
                                type='email' 
                                value={customerEmail} 
                                onChange={(e) => setCustomerEmail(e.target.value)} 
                            />
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label>Customer Phone:</label>
                            <input 
                                type='text' 
                                value={customerPhone} 
                                onChange={(e) => setCustomerPhone(e.target.value)} 
                            />
                        </div>
                        <button type='submit'>Save Changes</button>
                    </form>
                ) : (
                    <div>
                        <p>Customer Name: {customer.customer_name}</p>
                        <p>Customer Email: {customer.customer_email}</p>
                        <p>Customer Phone: {customer.customer_phone}</p>
                    </div>
                )}

                <button onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? 'Cancel' : 'Edit'}
                </button>
                <button onClick={doDelete}>Delete</button>
            </div>
        </div>
    );
}

export default Customer;
