export const STUDIO_CONTACT_EMAIL = 'contact@clipslabmedia.com';

const DEFAULT_GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyK2m2yffKAVDR6NJOfBuP1XxqvZsW0MfvtUy19-XQV7xJqr7lE8kt2nETR9oezAZ8KjA/exec';

export const GOOGLE_SCRIPT_URL = (
  import.meta.env.VITE_GOOGLE_SCRIPT_URL || DEFAULT_GOOGLE_SCRIPT_URL
).trim();

export const PROJECT_TYPES = [
  'AI Commercial Production',
  'Product Filmmaking',
  'Creative Direction',
  'AI Video Production',
  'Brand Visual Storytelling',
  'Social Media Video Content',
  'Other Creative Collaboration',
] as const;
