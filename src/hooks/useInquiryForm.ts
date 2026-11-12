import { useState, useEffect, FormEvent } from 'react';
import { PROJECT_TYPES } from '../config/contact';
import { submitProjectInquiry } from '../services/inquiryService';
import { triggerSuccessConfetti } from '../utils/confetti';

interface UseInquiryFormOptions {
  source: string;
  initialService?: string;
  confettiOriginY?: number;
}

export function useInquiryForm({
  source,
  initialService = '',
  confettiOriginY = 0.65,
}: UseInquiryFormOptions) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [projectType, setProjectType] = useState<string>(initialService || PROJECT_TYPES[0]);
  const [brief, setBrief] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialService) {
      const match = PROJECT_TYPES.find((p) =>
        p.toLowerCase().includes(initialService.toLowerCase())
      );
      if (match) setProjectType(match);
    }
  }, [initialService]);

  const resetSubmissionState = () => {
    setIsSubmitted(false);
    setErrorMessage(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !brief.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const result = await submitProjectInquiry({
      name,
      email,
      company,
      projectType,
      brief,
      source,
      honeypot,
    });

    setIsSubmitting(false);

    if (!result.success) {
      setErrorMessage(result.error || 'Unable to submit your project brief.');
      return;
    }

    setSubmittedName(name.trim());
    setName('');
    setEmail('');
    setCompany('');
    setProjectType(PROJECT_TYPES[0]);
    setBrief('');
    setHoneypot('');
    setIsSubmitted(true);
    triggerSuccessConfetti(confettiOriginY);
  };

  return {
    name,
    setName,
    email,
    setEmail,
    company,
    setCompany,
    projectType,
    setProjectType,
    brief,
    setBrief,
    honeypot,
    setHoneypot,
    isSubmitting,
    isSubmitted,
    submittedName,
    errorMessage,
    resetSubmissionState,
    handleSubmit,
  };
}
