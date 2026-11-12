import { GOOGLE_SCRIPT_URL, STUDIO_CONTACT_EMAIL } from '../config/contact';
import { ContactInquiry } from '../types';

export interface InquirySubmissionInput {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  brief: string;
  source: string;
  honeypot?: string;
}

export interface InquirySubmissionResult {
  success: boolean;
  inquiry?: ContactInquiry;
  error?: string;
  ignoredAsSpam?: boolean;
}

const STORAGE_KEY = 'clipslab_inquiries';

function saveInquiryLocally(inquiry: ContactInquiry): void {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (Array.isArray(existing)) {
      existing.unshift(inquiry);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    }
  } catch (err) {
    console.warn('Local inquiry backup failed', err);
  }
}

export async function submitProjectInquiry(
  input: InquirySubmissionInput
): Promise<InquirySubmissionResult> {
  const name = input.name.trim();
  const email = input.email.trim();
  const company = (input.company || '').trim();
  const projectType = input.projectType.trim();
  const brief = input.brief.trim();

  // Honeypot trap: silently succeed for bots without writing to the sheet
  if (input.honeypot && input.honeypot.trim().length > 0) {
    return { success: true, ignoredAsSpam: true };
  }

  if (!name || !email || !brief) {
    return {
      success: false,
      error: 'Please fill in your name, email address, and project brief.',
    };
  }

  const inquiry: ContactInquiry = {
    id: `inquiry-${Date.now()}`,
    name,
    email,
    company,
    projectType,
    brief,
    source: input.source,
    createdAt: new Date().toISOString(),
  };

  saveInquiryLocally(inquiry);

  if (!GOOGLE_SCRIPT_URL) {
    return {
      success: false,
      inquiry,
      error: `Google Sheet integration is not connected yet (missing VITE_GOOGLE_SCRIPT_URL). Please email ${STUDIO_CONTACT_EMAIL} directly or finish the Google Apps Script setup.`,
    };
  }

  try {
    // Use text/plain to keep the request CORS-simple (avoids OPTIONS preflight on Apps Script)
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        ...inquiry,
        pageUrl: typeof window !== 'undefined' ? window.location.href : '',
      }),
    });

    const rawText = await response.text();
    let parsed: { status?: string; message?: string } | null = null;

    if (rawText) {
      try {
        parsed = JSON.parse(rawText);
      } catch {
        // Non-JSON HTML typically indicates Apps Script access is not set to "Anyone"
        if (rawText.trim().startsWith('<')) {
          return {
            success: false,
            inquiry,
            error:
              'Could not reach the Google Sheet endpoint. Ensure the Apps Script Web App access is set to "Anyone".',
          };
        }
      }
    }

    if (!response.ok || parsed?.status === 'error') {
      return {
        success: false,
        inquiry,
        error:
          parsed?.message ||
          `Submission failed (${response.status || 'network error'}). Please try again or email ${STUDIO_CONTACT_EMAIL}.`,
      };
    }

    return { success: true, inquiry };
  } catch (err) {
    console.error('Inquiry submission failed:', err);
    return {
      success: false,
      inquiry,
      error: `Unable to send your brief right now. Please try again or email ${STUDIO_CONTACT_EMAIL} directly.`,
    };
  }
}
