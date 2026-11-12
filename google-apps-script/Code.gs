/**
 * ClipsLab Media — Google Sheets & Email Notification Webhook
 * Target Spreadsheet:
 * https://docs.google.com/spreadsheets/d/1R8ls_lMOL8c-EU45P5wN7Aa9WTI0pwomIarpZbYAtZA/edit
 */

const SPREADSHEET_ID = '1R8ls_lMOL8c-EU45P5wN7Aa9WTI0pwomIarpZbYAtZA';

// Leave empty ('') to use the first tab in your Google Sheet,
// or enter an exact tab name (e.g. 'Leads').
const SHEET_NAME = '';

// Email ID(s) where submission notifications will be sent.
// Separate multiple email IDs with commas if needed, e.g.:
// 'contact@clipslabmedia.com, yourpersonal@gmail.com'
// If left blank, notifications go to the Google account that owns this script.
const NOTIFICATION_EMAIL = 'contact@clipslabmedia.com';

const DEFAULT_HEADERS = [
  'Timestamp',
  'Name',
  'Email',
  'Company / Brand',
  'Project Type',
  'Project Brief',
  'Source',
  'Submission ID',
];

function doGet() {
  return jsonResponse_({
    status: 'ok',
    service: 'ClipsLab Media Project Brief Webhook',
    spreadsheetId: SPREADSHEET_ID,
  });
}

function doPost(e) {
  try {
    const raw = parsePayload_(e);

    // Ignore honeypot spam submissions silently
    if (raw.website && String(raw.website).trim() !== '') {
      return jsonResponse_({ status: 'success', ignored: true });
    }

    const payload = {
      id: String(raw.id || 'inquiry-' + Date.now()).trim(),
      name: String(raw.name || '').trim(),
      email: String(raw.email || '').trim(),
      company: String(raw.company || '').trim(),
      projectType: String(raw.projectType || 'General Inquiry').trim(),
      brief: String(raw.brief || '').trim(),
      source: String(raw.source || 'Website Contact Form').trim(),
      pageUrl: String(raw.pageUrl || '').trim(),
    };

    if (!payload.name || !payload.email || !payload.brief) {
      return jsonResponse_({
        status: 'error',
        message: 'Name, email address, and project brief are required.',
      });
    }

    const formattedTimestamp = appendToSheet_(payload);
    sendNotificationEmail_(payload, formattedTimestamp);

    return jsonResponse_({
      status: 'success',
      id: payload.id,
      timestamp: formattedTimestamp,
    });
  } catch (err) {
    return jsonResponse_({
      status: 'error',
      message: err && err.message ? err.message : String(err),
    });
  }
}

/**
 * Run this function once inside the Apps Script editor (Run -> testSetup)
 * to grant Google Sheets & Email permissions and verify everything works.
 */
function testSetup() {
  const samplePayload = {
    id: 'test-' + Date.now(),
    name: 'Test Lead (Setup Check)',
    email: NOTIFICATION_EMAIL || Session.getEffectiveUser().getEmail(),
    company: 'ClipsLab Media Test',
    projectType: 'AI Commercial Production',
    brief: 'This is a test submission created by testSetup() to verify your Google Sheet and email notifications.',
    source: 'Apps Script testSetup()',
    pageUrl: 'https://clipslabmedia.com',
  };

  const formattedTimestamp = appendToSheet_(samplePayload);
  sendNotificationEmail_(samplePayload, formattedTimestamp);
}

function parsePayload_(e) {
  if (e && e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (_) {
      // Fallback to form-encoded parameters below
    }
  }
  return (e && e.parameter) || {};
}

function getTargetSheet_() {
  const ss = SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();

  let sheet = SHEET_NAME ? ss.getSheetByName(SHEET_NAME) : ss.getSheets()[0];
  if (!sheet && SHEET_NAME) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (!sheet) {
    throw new Error('Target worksheet not found in spreadsheet.');
  }

  return { ss: ss, sheet: sheet };
}

function appendToSheet_(payload) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const target = getTargetSheet_();
    const ss = target.ss;
    const sheet = target.sheet;

    const timeZone = ss.getSpreadsheetTimeZone() || 'Asia/Kolkata';
    const formattedTimestamp = Utilities.formatDate(new Date(), timeZone, 'dd MMM yyyy, hh:mm a z');

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(DEFAULT_HEADERS);
      sheet.getRange(1, 1, 1, DEFAULT_HEADERS.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    const row = buildRowForSheet_(sheet, payload, formattedTimestamp);
    sheet.appendRow(row);

    return formattedTimestamp;
  } finally {
    lock.releaseLock();
  }
}

function buildRowForSheet_(sheet, payload, formattedTimestamp) {
  const lastCol = sheet.getLastColumn();
  if (lastCol > 0 && sheet.getLastRow() >= 1) {
    const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    let matchedCount = 0;
    const mappedRow = headers.map(function (header) {
      const value = resolveHeaderValue_(header, payload, formattedTimestamp);
      if (value !== null) {
        matchedCount += 1;
        return value;
      }
      return '';
    });

    if (matchedCount >= 2) {
      return mappedRow;
    }
  }

  return [
    formattedTimestamp,
    payload.name,
    payload.email,
    payload.company || 'N/A',
    payload.projectType,
    payload.brief,
    payload.source,
    payload.id,
  ];
}

function resolveHeaderValue_(header, payload, formattedTimestamp) {
  const h = String(header || '').trim().toLowerCase();
  if (!h) return null;

  if (/^(timestamp|submitted|date|time|created)/.test(h)) return formattedTimestamp;
  if (/^(submission.?id|inquiry.?id|id)$/.test(h)) return payload.id;
  if (h.indexOf('email') !== -1 || h.indexOf('mail') !== -1) return payload.email;
  if (h.indexOf('company') !== -1 || h.indexOf('brand') !== -1 || h.indexOf('organization') !== -1) {
    return payload.company || 'N/A';
  }
  if (
    h.indexOf('project type') !== -1 ||
    h.indexOf('service') !== -1 ||
    h.indexOf('category') !== -1 ||
    h === 'type'
  ) {
    return payload.projectType;
  }
  if (
    h.indexOf('brief') !== -1 ||
    h.indexOf('vision') !== -1 ||
    h.indexOf('message') !== -1 ||
    h.indexOf('detail') !== -1 ||
    h.indexOf('description') !== -1
  ) {
    return payload.brief;
  }
  if (h.indexOf('source') !== -1 || h.indexOf('form') !== -1 || h.indexOf('origin') !== -1) {
    return payload.source;
  }
  if (h.indexOf('name') !== -1 || h.indexOf('client') !== -1) return payload.name;

  return null;
}

function sendNotificationEmail_(payload, formattedTimestamp) {
  const recipient = (NOTIFICATION_EMAIL || '').trim() || Session.getEffectiveUser().getEmail();
  if (!recipient) {
    throw new Error('No NOTIFICATION_EMAIL configured and no active user email found.');
  }

  const sheetUrl = 'https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID + '/edit';
  const subject = 'New Project Brief: ' + payload.projectType + ' — ' + payload.name;

  const plainBody = [
    'New project brief submitted on ClipsLab Media',
    '--------------------------------------------------',
    'Submitted At: ' + formattedTimestamp,
    'Name: ' + payload.name,
    'Email: ' + payload.email,
    'Company / Brand: ' + (payload.company || 'N/A'),
    'Project Type: ' + payload.projectType,
    'Form Source: ' + payload.source,
    '',
    'Project Brief & Visual Vision:',
    payload.brief,
    '',
    'View in Google Sheets:',
    sheetUrl,
  ].join('\n');

  const htmlBody =
    '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#121212;color:#ffffff;border-radius:16px;">' +
    '<div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#AAFF00;font-weight:bold;margin-bottom:8px;">ClipsLab Media • New Lead Brief</div>' +
    '<h2 style="margin:0 0 18px;font-size:22px;color:#ffffff;">' + escapeHtml_(payload.projectType) + '</h2>' +
    '<table style="width:100%;border-collapse:collapse;background:#181818;border-radius:12px;overflow:hidden;">' +
    emailRow_('Submitted At', formattedTimestamp) +
    emailRow_('Name', payload.name) +
    emailRow_('Email', payload.email) +
    emailRow_('Company / Brand', payload.company || 'N/A') +
    emailRow_('Project Type', payload.projectType) +
    emailRow_('Form Source', payload.source) +
    '</table>' +
    '<div style="margin-top:18px;padding:16px;background:#181818;border-left:3px solid #AAFF00;border-radius:8px;">' +
    '<div style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#a3a3a3;margin-bottom:8px;">Project Brief & Visual Vision</div>' +
    '<div style="font-size:14px;line-height:1.6;color:#f5f5f5;white-space:pre-wrap;">' + escapeHtml_(payload.brief) + '</div>' +
    '</div>' +
    '<div style="margin-top:20px;">' +
    '<a href="' + sheetUrl + '" style="display:inline-block;padding:12px 20px;background:#AAFF00;color:#080808;text-decoration:none;font-weight:bold;font-size:12px;border-radius:999px;text-transform:uppercase;">Open Google Sheet</a>' +
    '</div>' +
    '</div>';

  const mailOptions = {
    to: recipient,
    name: 'ClipsLab Media Website',
    subject: subject,
    body: plainBody,
    htmlBody: htmlBody,
  };

  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    mailOptions.replyTo = payload.email;
  }

  MailApp.sendEmail(mailOptions);
}

function emailRow_(label, value) {
  return (
    '<tr>' +
    '<td style="padding:10px 14px;border-bottom:1px solid rgba(255,255,255,0.08);font-size:12px;color:#a3a3a3;width:150px;vertical-align:top;">' +
    escapeHtml_(label) +
    '</td>' +
    '<td style="padding:10px 14px;border-bottom:1px solid rgba(255,255,255,0.08);font-size:13px;color:#ffffff;font-weight:600;">' +
    escapeHtml_(value) +
    '</td>' +
    '</tr>'
  );
}

function escapeHtml_(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
