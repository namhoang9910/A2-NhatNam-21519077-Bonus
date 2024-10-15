import Customer from './Customer.js';
import NewCustomer from './NewCustomer.js';

function CustomerList(props) {
    const { customers, setCustomers } = props;

    return (
        <div className='customer-list'>
            <h2>Customers</h2>

            <NewCustomer customers={customers} setCustomers={setCustomers} />

            <hr />

            {
                customers.map((customer) => {
                    return (
                        <Customer key={customer.customer_id} customer={customer} customers={customers} setCustomers={setCustomers} />
                    );
                })
            }
        </div>
    );
}

export default CustomerList;
