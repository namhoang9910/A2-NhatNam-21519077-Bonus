import { useState } from 'react';

function NewPhone(props) {
    const {contact, phones, setPhones} = props;
    const [phone_number, setPhoneNumber] = useState('');
    const [phone_type, setPhoneType] = useState('Home'); // Initial value for the select

    async function createPhone(e) {
        e.preventDefault();

        const response = await fetch('http://localhost/api/contacts/' + contact.id + '/phones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone_type,
                phone_number
            })
        });

        const data = await response.json();

        if (data.id) {
            setPhones([...phones, data]);
        }

        setPhoneType('Home'); // Initial value for the select
        setPhoneNumber('');
    }

	return (
        <form onSubmit={createPhone} onClick={(e) => e.stopPropagation()} className='new-phone' style={{ marginBottom: '20px', display: 'grid', gridTemplateRows: 'auto auto', gap: '10px' }}>
            <div style={{ gridRow: '1' }}>
                <label style={{ 
                    display: 'block', 
                    textAlign: 'left',
                    marginTop: '20px',
                    fontSize: '15px' 
                }}>
                    Add to {contact.name}'s contact phone:
                </label>
            </div>
            <div style={{ gridRow: '2', display: 'grid', gridTemplateColumns: '1fr 2fr auto', alignItems: 'center', gap: '10px' }}>
                <select 
                    onChange={(e) => setPhoneType(e.target.value)} 
                    value={phone_type}
                    style={{ 
                        borderRadius: '10px', 
                        padding: '10px', 
                        border: '1px solid #ccc', 
                        fontSize: '15px', 
                        boxSizing: 'border-box' 
                    }}
                >
                    <option value='Home'>Home</option>
                    <option value='Work'>Work</option>
                    <option value='Mobile'>Mobile</option>
                    <option value='Others'>Others</option>
                </select>
                <input 
                    type='text' 
                    placeholder='Phone Number' 
                    onChange={(e) => setPhoneNumber(e.target.value)} 
                    value={phone_number} 
                    style={{ 
                        borderRadius: '10px', 
                        padding: '10px', 
                        border: '1px solid #ccc', 
                        fontSize: '15px', 
                        boxSizing: 'border-box' 
                    }} 
                />
                <button 
                    className='button green' 
                    type='submit' 
                    style={{ 
                        padding: '10px', 
                        borderRadius: '10px' 
                    }} 
                >
                    Add to {contact.name}'s<br />Phonebook
                </button>
            </div>
        </form>
	);
}

export default NewPhone;