import { useState } from 'react';

function Order(props) {
    const { order, orders, setOrders } = props;
    const [expanded, setExpanded] = useState(false);
    const [customerId, setCustomerId] = useState(order.customer_id);
    const [itemId, setItemId] = useState(order.item_id);
    const [orderDate, setOrderDate] = useState(order.order_date);
    const [isEditing, setIsEditing] = useState(false);

    const expandStyle = {
        display: expanded ? 'block' : 'none'
    };

    async function doDelete(e) {
        e.stopPropagation();
        const response = await fetch('http://localhost/api/orders/' + order.order_id, {
            method: 'DELETE'
        });

        if (response.ok) {
            const newOrders = orders.filter(o => o.order_id !== order.order_id);
            setOrders(newOrders);
        } else {
            console.error('Failed to delete order:', response);
            alert('Failed to delete order. Please try again.');
        }
    }

    async function doUpdate(e) {
        e.preventDefault();

        const updatedOrder = {
            customer_id: customerId,
            item_id: itemId,
            order_date: orderDate
        };

        const response = await fetch('http://localhost/api/orders/' + order.order_id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedOrder)
        });

        const data = await response.json();

        if (response.ok) {
            const updatedOrders = orders.map(o => 
                o.order_id === order.order_id ? { ...o, ...updatedOrder } : o
            );
            setOrders(updatedOrders);
            setIsEditing(false);
        } else {
            console.error('Failed to update order:', data);
            alert('Failed to update order. Please try again.');
        }
    }

    return (
        <div key={order.order_id} className='order'>
            <div className='title' onClick={() => setExpanded(!expanded)}>
                <h3>Order #{order.order_id}</h3>
            </div>

            <div style={expandStyle}>
                <hr />
                {isEditing ? (
                    <form className='new-order' onSubmit={doUpdate}>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '15px' }}>
                                Customer ID:
                            </label>
                            <input 
                                type='text' 
                                value={customerId} 
                                onChange={(e) => setCustomerId(e.target.value)} 
                                style={{ width: '100%', padding: '10px', fontSize: '15px' }} 
                            />
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '15px' }}>
                                Item ID:
                            </label>
                            <input 
                                type='text' 
                                value={itemId} 
                                onChange={(e) => setItemId(e.target.value)} 
                                style={{ width: '100%', padding: '10px', fontSize: '15px' }} 
                            />
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '15px' }}>
                                Order Date:
                            </label>
                            <input 
                                type='date' 
                                value={orderDate} 
                                onChange={(e) => setOrderDate(e.target.value)} 
                                style={{ width: '100%', padding: '10px', fontSize: '15px' }} 
                            />
                        </div>
                        <button type='submit'>Save Changes</button>
                    </form>
                ) : (
                    <div>
                        <p>Customer ID: {order.customer_id}</p>
                        <p>Item ID: {order.item_id}</p>
                        <p>Order Date: {order.order_date}</p>
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

export default Order;
