import { useState } from 'react';

function NewItem(props) {
    const { items, setItems } = props;
    const [item_name, setItemName] = useState('');
    const [item_price, setItemPrice] = useState('');

    async function createItem(e) {
        e.preventDefault();

        const response = await fetch('http://localhost/api/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                item_name,
                item_price: parseFloat(item_price)
            })
        });

        const data = await response.json();

        if (data.item_id) {
            setItems([...items, data]);
        }

        setItemName('');
        setItemPrice('');
    }

    return (
        <form className='new-item' onSubmit={createItem}>
            <div style={{ marginBottom: '20px' }}>
                <label>Item Name:</label>
                <input 
                    type='text' 
                    placeholder='Enter Item Name' 
                    value={item_name} 
                    onChange={(e) => setItemName(e.target.value)} 
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <label>Item Price:</label>
                <input 
                    type='number' 
                    placeholder='Enter Price' 
                    step='0.01' 
                    value={item_price} 
                    onChange={(e) => setItemPrice(e.target.value)} 
                />
            </div>
            <button type='submit'>Create Item</button>
        </form>
    );
}

export default NewItem;
