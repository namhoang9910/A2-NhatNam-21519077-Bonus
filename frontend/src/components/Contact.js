import { useState, useEffect } from 'react';  // import useEffect
import PhoneList from './PhoneList.js';

function Contact(props) {
    const {contact, contacts, setContacts} = props;
    const [expanded, setExpanded] = useState(false);
    const [phones, setPhones] = useState([]);
    

    useEffect(() => {
        fetch('http://localhost/api/contacts/' + contact.id + '/phones')
            .then(response => response.json())
            .then(data => setPhones(data))
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const expandStyle = {
        display: expanded ? 'block' : 'none'
    };

    async function doDelete(e) {
        e.stopPropagation();
        try {
            // First, remove the contact_id from associated companies
            await fetch(`http://localhost/api/companies?id=${contact.id}`, {
                method: 'PATCH',
            });
    
            // Then, delete the contact
            const response = await fetch('http://localhost/api/contacts/' + contact.id, {
                method: 'DELETE',
            });
    
            if (response.ok) {
                let newContacts = contacts.filter((c) => {
                    return c.id !== contact.id;
                });
                setContacts(newContacts);
            } else {
                console.error('Failed to delete contact:', response);
                alert('Failed to delete contact. Please try again.');
            }
        } catch (error) {
            console.error('Error during deletion:', error);
            alert('An error occurred during deletion. Please try again.');
        }
    }
    

	return (
        <div key={contact.id} className='contact' onClick={(e) => setExpanded(!expanded)}>
            <div className='title'>
                <h3>{contact.name}</h3>
            </div>
    
            <div style={expandStyle}>
                <hr />
                <div style={{ textAlign: 'center', marginLeft: '30px', marginRight: '30px' }}>
                    <h2 style={{ fontWeight: 'bold' }}>Contact Summary:</h2>
                </div>
                <div style={{ textAlign: 'left', marginLeft: '30px', marginRight: '30px' }}>
                    <p style={{ fontWeight: 'bold' }}>Name: <span style={{ fontWeight: 'normal' }}>{contact.name}</span></p>
                    <p style={{ fontWeight: 'bold' }}>Address: <span style={{ fontWeight: 'normal' }}>{contact.address}</span></p>
                </div>

                <div style={{ 
                    textAlign: 'center', 
                    fontStyle: 'italic', 
                    marginBottom: '10px', 
                    marginLeft: '30px', 
                    marginRight: '30px',
                    fontSize: '12px' 
                }}>
                    Click the contact to expand or collapse {contact.name}'s phone list
                </div>

                <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px'}}>
                    <button className='button red' onClick={doDelete}>Delete Contact</button>
                </div>

                <hr style={{ borderColor: '#ccc', margin: '5px 5px' }} />

                <PhoneList phones={phones} setPhones={setPhones} contact={contact} />
            </div>
        </div>
    );
    
}

export default Contact;
