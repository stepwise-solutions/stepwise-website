/* ============================================================
   STEPWISE — Contact Form (EmailJS)
   ============================================================
   Setup instructions:
   1. Sign up free at https://www.emailjs.com
      (free plan = 200 emails/month)
   2. Create an Email Service (Gmail, Outlook, etc.)
   3. Create an Email Template using these variables:
        {{name}}, {{email}}, {{company}},
        {{service}}, {{message}}
   4. Replace the three config values below with your
      real credentials, then remove the setup notice
      from contact.html when you go live.
   ============================================================ */

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

function sendMessage() {
  const btn    = document.querySelector('.submit-btn');
  const status = document.getElementById('form-status');

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // ── Validation ──────────────────────────────────────────
  if (!name || !email || !message) {
    showStatus(status, 'error', '// Please fill in all required fields (name, email, message).');
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showStatus(status, 'error', '// Please enter a valid email address.');
    return;
  }

  // ── Sending state ────────────────────────────────────────
  btn.classList.add('loading');
  btn.disabled = true;
  status.style.display = 'none';

  const templateParams = {
    name:  name,
    email: email,
    company:    document.getElementById('company').value.trim() || 'Not provided',
    service:    document.getElementById('service').value        || 'Not specified',
    message:    message,
  };

  // ── Send ─────────────────────────────────────────────────
  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(() => {
      btn.classList.remove('loading');
      btn.disabled = false;
      showStatus(status, 'success', "// Message sent successfully. We'll be in touch within 24 hours.");
      resetForm();
    })
    .catch((err) => {
      btn.classList.remove('loading');
      btn.disabled = false;
      showStatus(status, 'error', '// Something went wrong. Please email us directly at hello@stepwise-solutions.com');
      console.error('EmailJS error:', err);
    });
}

// ── Helpers ──────────────────────────────────────────────────
function showStatus(el, type, message) {
  el.className = type;
  el.style.display = 'block';
  el.textContent = message;
}

function resetForm() {
  ['name', 'email', 'company', 'service', 'message'].forEach((id) => {
    document.getElementById(id).value = '';
  });
}