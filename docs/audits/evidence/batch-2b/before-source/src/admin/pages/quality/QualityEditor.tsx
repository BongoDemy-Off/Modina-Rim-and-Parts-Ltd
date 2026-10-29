import { companyPages } from '../../data/company';
import { CompanyPageEditor } from '../../components/company-content/CompanyPageEditor';
export default function QualityEditor() { return <CompanyPageEditor initial={companyPages.quality} title="Quality" description="Manage the fixed six-stage process and source-local Quality certification cards without linking Certificates." />; }
