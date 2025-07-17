// Helper to render contacts in the table
function renderContacts(contacts) {
  const tbody = document.querySelector('#contacts-table tbody');
  tbody.innerHTML = '';
  contacts.forEach(contact => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${contact.name}</td>
      <td>${contact.phone}</td>
      <td>${contact.email}</td>
      <td><button class="btn btn-danger btn-sm delete-btn" data-id="${contact.id}">Delete</button></td>
    `;
    tbody.appendChild(tr);
  });
}

// Fetch and display all contacts
function loadContacts() {
  fetch('/api/contacts')
    .then(res => res.json())
    .then(renderContacts);
}

// Add contact
const form = document.getElementById('contact-form');
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  fetch('/api/contacts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, phone, email })
  })
    .then(res => res.json())
    .then(data => {
      form.reset();
      loadContacts();
    });
});

// Delete contact
const table = document.getElementById('contacts-table');
table.addEventListener('click', function(e) {
  if (e.target.classList.contains('delete-btn')) {
    const id = e.target.getAttribute('data-id');
    fetch(`/api/contacts/${id}`, { method: 'DELETE' })
      .then(() => loadContacts());
  }
});

// Search contacts
const search = document.getElementById('search');
search.addEventListener('input', function() {
  const query = search.value.trim();
  if (!query) {
    loadContacts();
    return;
  }
  fetch(`/api/search?name=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(renderContacts);
});

// Initial load
loadContacts(); 