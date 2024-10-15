import Order from './Order.js';
import NewOrder from './NewOrder.js';

function OrderList(props) {
    const { orders, setOrders } = props;

    return (
        <div className='order-list'>
            <h2>Orders</h2>

            <NewOrder orders={orders} setOrders={setOrders} />

            <hr />

            {orders.map(order => (
                <Order key={order.order_id} order={order} orders={orders} setOrders={setOrders} />
            ))}
        </div>
    );
}

export default OrderList;
