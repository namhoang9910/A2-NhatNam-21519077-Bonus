import Phone from './Phone.js';
import NewPhone from './NewPhone.js';

function PhoneList(props) {
    const { contact, phones, setPhones } = props;

    return (
        <div className='phone-list'>
            <NewPhone phones={phones} setPhones={setPhones} contact={contact} />

            <table onClick={(e) => e.stopPropagation()}>
                <thead>
                    <tr>
                        <th style={{ fontSize: '13px' }}>Phone Type</th>
                        <th style={{ fontSize: '13px' }}>Number</th>
                        <th style={{ fontSize: '13px' }}>Modification Update or Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        phones.map((phone) => {
                            return (
                                <Phone key={phone.id} phone={phone} phones={phones} setPhones={setPhones} contact={contact} />
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default PhoneList;
