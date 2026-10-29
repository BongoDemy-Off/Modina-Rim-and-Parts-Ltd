import { companyPages } from '../../data/company';
import { CompanyPageEditor } from '../../components/company-content/CompanyPageEditor';
export default function SustainabilityEditor() { return <CompanyPageEditor initial={companyPages.sustainability} title="Sustainability / CSR" description="Manage current pillars, environmental initiatives, and CSR slots as literal source content only." />; }
