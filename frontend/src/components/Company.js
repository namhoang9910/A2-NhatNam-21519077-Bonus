import { useState, useEffect } from 'react';

function Company(props) {
    const { company, companies, setCompanies } = props;
    const [expanded, setExpanded] = useState(false);

    const expandStyle = {
        display: expanded ? 'block' : 'none'
    };

    async function doDelete(e) {
        e.stopPropagation();
        
        await fetch(`http://localhost/api/companies/${company.id}`, {
            method: 'DELETE',
        });

        const newCompanies = companies.filter(c => c.id !== company.id);
        setCompanies(newCompanies);
    }

    return (
        <div key={company.id} className='company' onClick={() => setExpanded(!expanded)}>
            <div className='title'>
                <h3>{company.name}</h3>
                <button className='button red' onClick={doDelete}>Delete Company</button>
            </div>

            <div style={expandStyle}>
                <hr />
                <div style={{ textAlign: 'left' }}>
                    <p style={{ fontWeight: 'bold' }}>Name: <span style={{ fontWeight: 'normal' }}>{company.name}</span></p>
                    <p style={{ fontWeight: 'bold' }}>Address: <span style={{ fontWeight: 'normal' }}>{company.address}</span></p>
                </div>
            </div>
        </div>
    );
}

export default Company;
