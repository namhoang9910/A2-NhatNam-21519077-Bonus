import Item from './Item';
import NewItem from './NewItem';

function ItemList(props) {
    const { items, setItems } = props;

    return (
        <div className='item-list'>
            <h2>Items</h2>
            <NewItem items={items} setItems={setItems} />
            <hr />
            {items.map((item) => (
                <Item key={item.item_id} item={item} items={items} setItems={setItems} />
            ))}
        </div>
    );
}

export default ItemList;
