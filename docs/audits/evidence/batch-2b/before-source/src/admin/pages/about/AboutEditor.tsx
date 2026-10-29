import { companyPages } from '../../data/company';
import { CompanyPageEditor } from '../../components/company-content/CompanyPageEditor';
export default function AboutEditor() { return <CompanyPageEditor initial={companyPages.about} title="About & Leadership" description="Manage the actual About-page source slots and leadership records without changing the approved public page." />; }
