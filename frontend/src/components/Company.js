import { useState } from 'react';

function Company(props) {
    const { company, companies, setCompanies } = props;
    const [expanded, setExpanded] = useState(false);
    const [companyName, setCompanyName] = useState(company.company_name);
    const [companyAddress, setCompanyAddress] = useState(company.company_address);
    const [contactId, setContactId] = useState(company.contact_id);
    const [isEditing, setIsEditing] = useState(false); // New state for edit mode


    const expandStyle = {
        display: expanded ? 'block' : 'none'
    };

    async function doDelete(e) {
        e.stopPropagation();
        try {
            const response = await fetch('http://localhost/api/companies/' + company.company_id, {
                method: 'DELETE',
            });

            if (response.ok) {
                const newCompanies = companies.filter(c => c.company_id !== company.company_id);
                setCompanies(newCompanies);
            } else {
                console.error('Failed to delete company:', response);
                alert('Failed to delete company. Please try again.');
            }
        } catch (error) {
            console.error('Error during deletion:', error);
            alert('An error occurred during deletion. Please try again.');
        }
    }

    async function doUpdate(e) {
        e.preventDefault(); 
            const updatedCompany = {
                company_name: companyName,
                company_address: companyAddress,
                contact_id: contactId === '' ? null : contactId,
            };

            const response = await fetch('http://localhost/api/companies/' + company.company_id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCompany),
            });

            const responseData = await response.json(); 

            if (response.ok) {
                const updatedCompanies = companies.map((c) => 
                    c.company_id === company.company_id ? { ...c, ...updatedCompany } : c
                );
                setCompanies(updatedCompanies);
                setIsEditing(false); 
            } else {
                console.error('Failed to update company:', responseData); 
                alert('Failed to update company details.Please try again.');
            }
        
    }
    

    return (
        <div key={company.company_id} className='company' onClick={(e) => e.stopPropagation()}>
            <div className='title' onClick={() => setExpanded(!expanded)}>
                <h3>{company.company_name}</h3>
            </div>

            <div style={expandStyle}>
                <hr />
                {isEditing ? (
                    <form className='new-company' onSubmit={doUpdate}>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', textAlign: 'left', fontSize: '15px' }}>
                                Company Name:
                            </label>
                            <input 
                                type='text' 
                                placeholder='Enter Company Name' 
                                value={companyName} 
                                onChange={(e) => setCompanyName(e.target.value)} 
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
                            <label style={{ display: 'block', marginBottom: '5px', textAlign: 'left', fontSize: '15px' }}>
                                Company Address:
                            </label>
                            <input 
                                type='text' 
                                placeholder='Enter Company Address' 
                                value={companyAddress} 
                                onChange={(e) => setCompanyAddress(e.target.value)} 
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
                            <label style={{ display: 'block', marginBottom: '5px', textAlign: 'left', fontSize: '15px' }}>
                                Contact ID:
                            </label>
                            <input 
                                type='text' 
                                placeholder='Enter Contact ID' 
                                value={contactId} 
                                onChange={(e) => setContactId(e.target.value)} 
                                style={{ 
                                    width: '100%', 
                                    borderRadius: '10px', 
                                    padding: '10px', 
                                    border: '1px solid #ccc', 
                                    fontSize: '15px' 
                                }} 
                            />
                        </div>
                        <button className='button green' type='submit'>Save Changes</button>
                    </form>
                ) : (
                    <div style={{ textAlign: 'left' }}>
                        <p style={{ fontWeight: 'bold' }}>Company Name: <span style={{ fontWeight: 'normal' }}>{company.company_name}</span></p>
                        <p style={{ fontWeight: 'bold' }}>Company Address: <span style={{ fontWeight: 'normal' }}>{company.company_address}</span></p>
                        <p style={{ fontWeight: 'bold' }}>Contact ID: <span style={{ fontWeight: 'normal' }}>{company.contact_id}</span></p>
                    </div>
                )}

                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <button 
                        className='button green' 
                        onClick={() => setIsEditing(!isEditing)} 
                        style={{ backgroundColor: '#fc95f6', color: '#000000', fontWeight: 'bold', width: '150px' }} 
                    >
                        {isEditing ? 'Cancel' : 'Edit Company'}
                    </button>
                </div>
                <div style={{ textAlign: 'center', marginTop: '5px', marginBottom: '20px'}}>
                    <button 
                        className='button red' 
                        onClick={doDelete} 
                        style={{ backgroundColor: '#2e2e2e', color: 'ffffff', width: '150px' }} 
                    >
                        Delete Company
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Company;
