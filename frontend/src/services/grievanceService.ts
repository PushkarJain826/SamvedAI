/* Mock grievance service */
import type { GrievanceCase, GrievanceCategory } from '@/types';
import { delay, generateId } from '@/lib/utils';
import { grievanceAuthorities } from '@/data/mockData';

export async function getGrievanceGuidance(category: GrievanceCategory): Promise<{
  authority: string;
  documents: string[];
  submissionGuidance: string;
}> {
  await delay(400);

  const docs: Record<GrievanceCategory, string[]> = {
    loan: [
      'Loan account statement',
      'Copy of loan application/sanction letter',
      'Communication with bank/PACS regarding the issue',
      'Aadhaar card / ID proof',
    ],
    insurance: [
      'Insurance policy document',
      'Crop loss evidence / photographs',
      'Loss intimation copy',
      'Land records',
      'Aadhaar card',
    ],
    scheme: [
      'Scheme application receipt',
      'Aadhaar card',
      'Bank account details',
      'Any communication received regarding the scheme',
    ],
    cooperative: [
      'Cooperative membership proof',
      'Relevant meeting minutes / communication',
      'Description of the issue in writing',
    ],
    pacs: [
      'PACS membership card',
      'Transaction receipts / passbook',
      'Written description of complaint',
    ],
    other: [
      'ID proof (Aadhaar card)',
      'Any relevant documents supporting the complaint',
      'Written description of the issue',
    ],
  };

  const guidance: Record<GrievanceCategory, string> = {
    loan: 'Write a formal complaint letter addressed to the Branch Manager of your bank or PACS. Include your loan account number, the nature of the problem, and the resolution you seek. Submit at the branch and keep an acknowledged copy. If unresolved within 30 days, escalate to the District Cooperative Bank or Banking Ombudsman.',
    insurance: 'File a written complaint with the insurance company claims office in your district. Include your policy number, crop loss details, and photographs. If the company does not respond within the stipulated timeframe, escalate to the District Agriculture Officer or Insurance Ombudsman.',
    scheme: 'Submit a written application at the Block Development Office or Tehsildar office. You may also file a grievance on the CPGRAMS portal. Mention the scheme name, your registration/application number, and the specific issue.',
    cooperative: 'Submit a written complaint to the Registrar of Cooperative Societies through the District Deputy Registrar office. Include your membership number, relevant details, and the resolution sought.',
    pacs: 'Raise the issue first with the PACS Secretary or Managing Committee. If unresolved, escalate in writing to the District Cooperative Bank or the District Deputy Registrar of Cooperative Societies.',
    other: 'Prepare a written complaint clearly describing your issue. Submit to the relevant Tehsildar or District Collector office. Keep an acknowledged copy with date and reference number.',
  };

  return {
    authority: grievanceAuthorities[category],
    documents: docs[category],
    submissionGuidance: guidance[category],
  };
}

export async function submitGrievance(
  grievance: GrievanceCase
): Promise<GrievanceCase> {
  await delay(800);
  return {
    ...grievance,
    id: generateId(),
    referenceNumber: `GRV-${Date.now().toString().slice(-8)}`,
    status: 'submitted',
    createdAt: new Date().toISOString(),
  };
}
