import { useState } from 'react';

function NewCompany(props) {
    const { companies, setCompanies } = props;
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    async function createCompany(e) {
        e.preventDefault();

        const response = await fetch('http://localhost/api/companies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                address
            })
        });

        const data = await response.json();

        if (data.id) {
            setCompanies([...companies, data]);
        }

        setName('');
        setAddress('');
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
                    onChange={(e) => setName(e.target.value)} 
                    value={name} 
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
                    onChange={(e) => setAddress(e.target.value)} 
                    value={address} 
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
