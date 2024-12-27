// Example: Form Validation
document.querySelectorAll('form').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent actual submission
    alert('Form submitted successfully!');
  });
});
