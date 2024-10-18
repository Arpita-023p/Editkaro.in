// Filter portfolio items by category
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');

        portfolioItems.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Email Subscription Form
const emailForm = document.getElementById('email-form');
const subscriptionStatus = document.getElementById('subscription-status');

emailForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailForm.email.value;

    // Here, you would send the email to Google Sheets or store it locally
    subscriptionStatus.textContent = 'Thank you for subscribing!';

    // Reset form
    emailForm.reset();
});

// Contact Form Submission
const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);

    // Simulate submission to Google Sheets
    contactStatus.textContent = 'Thank you for contacting us!';

    // Reset form
    contactForm.reset();
});
function doPost(e) {
    var sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getSheetByName('Sheet1');
    var params = JSON.parse(e.postData.contents);
    
    sheet.appendRow([params.email, new Date()]);
    
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
        .setMimeType(ContentService.MimeType.JSON);
  }
  emailForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailForm.email.value;

    fetch('YOUR_GOOGLE_SCRIPT_URL', {
        method: 'POST',
        body: JSON.stringify({ email: email }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === 'success') {
            subscriptionStatus.textContent = 'Thank you for subscribing!';
        } else {
            subscriptionStatus.textContent = 'Error subscribing, try again.';
        }
    });

    emailForm.reset();
});
