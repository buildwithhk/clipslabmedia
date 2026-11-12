import React from 'react';
import { AlertCircle } from 'lucide-react';
import { STUDIO_CONTACT_EMAIL } from '../config/contact';

interface InquiryErrorBannerProps {
  message: string;
  name: string;
  email: string;
  company: string;
  projectType: string;
  brief: string;
}

export const InquiryErrorBanner: React.FC<InquiryErrorBannerProps> = ({
  message,
  name,
  email,
  company,
  projectType,
  brief,
}) => {
  const subject = encodeURIComponent(`Project Inquiry: ${projectType} from ${name || 'Website Visitor'}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nProject Type: ${projectType}\n\nProject Brief:\n${brief}`
  );

  return (
    <div
      role="alert"
      className="p-3.5 rounded-xl bg-[#FF0054]/10 border border-[#FF0054]/30 text-[#FF0054] text-xs font-mono space-y-1.5"
    >
      <div className="flex items-start gap-2">
        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <span>{message}</span>
      </div>
      <div className="pl-6">
        <a
          href={`mailto:${STUDIO_CONTACT_EMAIL}?subject=${subject}&body=${body}`}
          className="underline font-bold hover:opacity-80"
        >
          Send via email app to {STUDIO_CONTACT_EMAIL} instead
        </a>
      </div>
    </div>
  );
};
