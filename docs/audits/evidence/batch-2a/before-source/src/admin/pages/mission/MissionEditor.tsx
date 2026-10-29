import { companyPages } from '../../data/company';
import { CompanyPageEditor } from '../../components/company-content/CompanyPageEditor';
export default function MissionEditor() { return <CompanyPageEditor initial={companyPages.mission} title="Mission & Vision" description="Manage current Mission, Vision, value, and attribution source slots while preserving their fixed structure." />; }
