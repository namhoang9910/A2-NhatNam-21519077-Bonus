import { useState } from 'react';

function NewCompany(props) {
    const { companies, setCompanies } = props;
    const [company_name, setCompanyName] = useState('');
    const [company_address, setCompanyAddress] = useState('');
    const [contact_id, setContactId] = useState('');

    async function createCompany(e) {
        e.preventDefault();

        const response = await fetch('http://localhost/api/companies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                company_name,
                company_address,
                contact_id
            })
        });

        const data = await response.json();

        if (data.id) {
            setCompanies([...companies, data]);
        }

        setCompanyName('');
        setCompanyAddress('');
        setContactId('');
    }

    return (
        <form className='new-company' onSubmit={createCompany}>
            <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                    display: 'block', 
                    marginBottom: '5px', 
                    textAlign: 'left',
                    fontSize: '15px' 
                }}>
                    Company Name:
                </label>
                <input 
                    type='text' 
                    placeholder='Enter Company Name' 
                    onChange={(e) => setCompanyName(e.target.value)} 
                    value={company_name} 
                    style={{ 
                        width: '100%', 
                        borderRadius: '10px', 
                        padding: '10px', 
                        border: '1px solid #ccc', 
                        fontSize: '15px' 
                    }} 
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                    display: 'block', 
                    marginBottom: '5px', 
                    textAlign: 'left',
                    fontSize: '15px' 
                }}>
                    Company Address:
                </label>
                <input 
                    type='text' 
                    placeholder='Enter Company Address' 
                    onChange={(e) => setCompanyAddress(e.target.value)} 
                    value={company_address} 
                    style={{ 
                        width: '100%', 
                        borderRadius: '10px', 
                        padding: '10px', 
                        border: '1px solid #ccc', 
                        fontSize: '15px' 
                    }} 
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                    display: 'block', 
                    marginBottom: '5px', 
                    textAlign: 'left',
                    fontSize: '15px' 
                }}>
                    Contact id:
                </label>
                <input 
                    type='text' 
                    placeholder='Enter Company Address' 
                    onChange={(e) => setContactId(e.target.value)} 
                    value={contact_id} 
                    style={{ 
                        width: '100%', 
                        borderRadius: '10px', 
                        padding: '10px', 
                        border: '1px solid #ccc', 
                        fontSize: '15px' 
                    }} 
                />
            </div>
            <button className='button green' type='submit'>Create Company</button>
        </form>
    );
}

export default NewCompany;
