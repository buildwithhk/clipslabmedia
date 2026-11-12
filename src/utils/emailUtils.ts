export function openDirectEmail(
  email: string = 'contact@clipslabmedia.com',
  subject: string = 'Project Inquiry — ClipsLab Media',
  body: string = 'Hi Harsh,\n\nI would like to discuss a project with ClipsLab Media.\n\n'
) {
  const encodedEmail = encodeURIComponent(email.trim());
  const encodedSubject = encodeURIComponent(subject.trim());
  const encodedBody = encodeURIComponent(body);

  const isMobile =
    typeof navigator !== 'undefined' &&
    /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  const mailtoUrl = `mailto:${email.trim()}?subject=${encodedSubject}&body=${encodedBody}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedEmail}&su=${encodedSubject}&body=${encodedBody}`;

  if (isMobile) {
    window.location.href = mailtoUrl;
  } else {
    // On desktop, open Gmail Web compose in a new tab with To: contact@clipslabmedia.com pre-filled
    const win = window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = mailtoUrl;
    }
  }
}
