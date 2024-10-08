import { useState, useEffect } from 'react';

function Company(props) {
    const { company, companies, setCompanies } = props;
    const [expanded, setExpanded] = useState(false);

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

    return (
        <div key={company.company_id} className='company' onClick={() => setExpanded(!expanded)}>
            <div className='title'>
                <h3>{company.company_name}</h3>
            </div>

            <div style={expandStyle}>
                <hr />
                <div style={{ textAlign: 'left' }}>
                    <p style={{ fontWeight: 'bold' }}>Company Name: <span style={{ fontWeight: 'normal' }}>{company.company_name}</span></p>
                    <p style={{ fontWeight: 'bold' }}>Company Address: <span style={{ fontWeight: 'normal' }}>{company.company_address}</span></p>
                    <p style={{ fontWeight: 'bold' }}>Contact_id: <span style={{ fontWeight: 'normal' }}>{company.contact_id}</span></p>
                </div>

                <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px'}}>
                    <button className='button red' onClick={doDelete}>Delete Company</button>
                </div>
            </div>

        </div>
    );
}

export default Company;
