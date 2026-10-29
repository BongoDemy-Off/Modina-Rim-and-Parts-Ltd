import { careerDepartments, careerEmploymentTypes } from '../../data/careers';
import type { AdminCareer, CareerValidationErrors } from '../../types/careers';
import { SectionCard } from '../../ui/Card';
import { AdminInput, AdminSelect } from '../../ui/FormControls';

export function CareerDetailsSection({ career, errors, onChange }: { career: AdminCareer; errors: CareerValidationErrors; onChange: (career: AdminCareer) => void }) {
  return (
    <div id="basic-information" className="scroll-mt-36">
      <SectionCard title="1. Basic Information" description="Shared vacancy taxonomy from the current Careers source.">
        <div className="grid gap-5 p-4 sm:grid-cols-2 sm:p-5">
          <AdminSelect label="Department" required value={career.department} error={errors.department} onChange={(event) => onChange({ ...career, department: event.target.value as AdminCareer['department'] })}>
            <option value="">Select department</option>
            {careerDepartments.map((department) => <option key={department}>{department}</option>)}
          </AdminSelect>
          <AdminSelect label="Employment Type" required value={career.employmentType} error={errors.employmentType} onChange={(event) => onChange({ ...career, employmentType: event.target.value as AdminCareer['employmentType'] })}>
            <option value="">Select employment type</option>
            {careerEmploymentTypes.map((type) => <option key={type}>{type}</option>)}
          </AdminSelect>
        </div>
      </SectionCard>
    </div>
  );
}

export function CareerApplicationSettingsSection({ career, onChange }: { career: AdminCareer; onChange: (career: AdminCareer) => void }) {
  return (
    <div id="application-settings" className="scroll-mt-36">
      <SectionCard title="3. Application Settings" description="Optional future CMS metadata; this does not change the public application form.">
        <div className="p-4 sm:p-5">
          <AdminInput label="Application Deadline" type="date" value={career.applicationDeadline} onChange={(event) => onChange({ ...career, applicationDeadline: event.target.value })} helpText={career.sourceRecordExists && !career.applicationDeadline ? 'Not provided in current source. Optional; opening does not require a deadline and no time-of-day is collected.' : 'Optional future CMS metadata. No time-of-day is collected.'} />
        </div>
      </SectionCard>
    </div>
  );
}
