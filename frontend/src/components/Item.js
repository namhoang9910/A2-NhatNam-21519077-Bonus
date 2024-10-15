import { useState } from 'react';

function Item(props) {
    const { item, items, setItems } = props;
    const [expanded, setExpanded] = useState(false);
    const [itemName, setItemName] = useState(item.item_name);
    const [itemPrice, setItemPrice] = useState(item.item_price);
    const [isEditing, setIsEditing] = useState(false);

    async function doDelete(e) {
        e.stopPropagation();
        const response = await fetch('http://localhost/api/items/' + item.item_id, {
            method: 'DELETE',
        });

        if (response.ok) {
            const newItems = items.filter(i => i.item_id !== item.item_id);
            setItems(newItems);
        }
    }

    async function doUpdate(e) {
        e.preventDefault();
        const updatedItem = {
            item_name: itemName,
            item_price: parseFloat(itemPrice),
        };

        const response = await fetch('http://localhost/api/items/' + item.item_id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedItem),
        });

        if (response.ok) {
            const updatedItems = items.map((i) =>
                i.item_id === item.item_id ? { ...i, ...updatedItem } : i
            );
            setItems(updatedItems);
            setIsEditing(false);
        }
    }

    return (
        <div className='item'>
            <h3 onClick={() => setExpanded(!expanded)}>{item.item_name}</h3>
            {expanded && (
                <div>
                    {isEditing ? (
                        <form onSubmit={doUpdate}>
                            <input 
                                type='text' 
                                value={itemName} 
                                onChange={(e) => setItemName(e.target.value)} 
                            />
                            <input 
                                type='number' 
                                step='0.01' 
                                value={itemPrice} 
                                onChange={(e) => setItemPrice(e.target.value)} 
                            />
                            <button type='submit'>Save</button>
                        </form>
                    ) : (
                        <div>
                            <p>Name: {item.item_name}</p>
                            <p>Price: {item.item_price}</p>
                        </div>
                    )}
                    <button onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                    <button onClick={doDelete}>Delete</button>
                </div>
            )}
        </div>
    );
}

export default Item;
