import Company from './Company.js';
import NewCompany from './NewCompany.js';

function CompanyList(props) {
    const { companies, setCompanies } = props;

    return (
        <div className='company-list'>
            <h2>Companies</h2>

            <NewCompany companies={companies} setCompanies={setCompanies} />

            <hr />

            {
                companies.map((company) => {
                    return (
                        <Company key={company.company_id} company={company} companies={companies} setCompanies={setCompanies} />
                    );
                })
            }
        </div>
    );
}

export default CompanyList;
