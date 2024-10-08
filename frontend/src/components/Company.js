import { useState, useEffect } from 'react';

function Company(props) {
    const { company, companies, setCompanies } = props;
    const [expanded, setExpanded] = useState(false);

    const expandStyle = {
        display: expanded ? 'block' : 'none'
    };

    async function doDelete(e) {
        e.stopPropagation();
        
        await fetch(`http://localhost/api/companies?id=${contact.id}`, {
            method: 'DELETE',
        });

        const newCompanies = companies.filter(c => c.id !== company.id);
        setCompanies(newCompanies);
    }

    return (
        <div key={company.company_id} className='company' onClick={() => setExpanded(!expanded)}>
            <div className='title'>
                <h3>{company.name}</h3>
                <button className='button red' onClick={doDelete}>Delete Company</button>
            </div>

            <div style={expandStyle}>
                <hr />
                <div style={{ textAlign: 'left' }}>
                    <p style={{ fontWeight: 'bold' }}>Company Name: <span style={{ fontWeight: 'normal' }}>{company.name}</span></p>
                    <p style={{ fontWeight: 'bold' }}>Company Address: <span style={{ fontWeight: 'normal' }}>{company.address}</span></p>
                    <p style={{ fontWeight: 'bold' }}>Contact_id: <span style={{ fontWeight: 'normal' }}>{company.contact_id}</span></p>
                </div>
            </div>
        </div>
    );
}

export default Company;
