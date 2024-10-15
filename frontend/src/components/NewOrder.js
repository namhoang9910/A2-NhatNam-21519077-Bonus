import { useState } from 'react';

function NewOrder(props) {
    const { orders, setOrders } = props;
    const [customer_id, setCustomerId] = useState('');
    const [item_id, setItemId] = useState('');
    const [order_date, setOrderDate] = useState('');

    async function createOrder(e) {
        e.preventDefault();

        const response = await fetch('http://localhost/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                customer_id,
                item_id,
                order_date
            })
        });

        const data = await response.json();

        if (data.order_id) {
            setOrders([...orders, data]);
        }

        setCustomerId('');
        setItemId('');
        setOrderDate('');
    }

    return (
        <form className='new-order' onSubmit={createOrder}>
            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '15px' }}>
                    Customer ID:
                </label>
                <input 
                    type='text' 
                    placeholder='Enter Customer ID' 
                    onChange={(e) => setCustomerId(e.target.value)} 
                    value={customer_id} 
                    style={{ width: '100%', padding: '10px', fontSize: '15px' }} 
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '15px' }}>
                    Item ID:
                </label>
                <input 
                    type='text' 
                    placeholder='Enter Item ID' 
                    onChange={(e) => setItemId(e.target.value)} 
                    value={item_id} 
                    style={{ width: '100%', padding: '10px', fontSize: '15px' }} 
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '15px' }}>
                    Order Date:
                </label>
                <input 
                    type='date' 
                    onChange={(e) => setOrderDate(e.target.value)} 
                    value={order_date} 
                    style={{ width: '100%', padding: '10px', fontSize: '15px' }} 
                />
            </div>
            <button type='submit'>Create Order</button>
        </form>
    );
}

export default NewOrder;
