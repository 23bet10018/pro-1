const apiUrl = '/cards'; // same origin as Express backend

async function fetchCards() {
  const res = await fetch(apiUrl);
  const cards = await res.json();
  const table = document.getElementById('cardTable');
  table.innerHTML = '';

  cards.forEach(card => {
    const row = `
      <tr>
        <td>${card.id}</td>
        <td>${card.suit}</td>
        <td>${card.value}</td>
        <td>
          <button onclick="editCard(${card.id}, '${card.suit}', '${card.value}')">Edit</button>
          <button class="delete-btn" onclick="deleteCard(${card.id})">Delete</button>
        </td>
      </tr>
    `;
    table.innerHTML += row;
  });
}

async function addOrUpdateCard(e) {
  e.preventDefault();
  const id = document.getElementById('cardId').value;
  const suit = document.getElementById('suit').value.trim();
  const value = document.getElementById('value').value.trim();

  if (!suit || !value) {
    alert('Please fill all fields.');
    return;
  }

  const method = id ? 'PUT' : 'POST';
  const url = id ? `${apiUrl}/${id}` : apiUrl;

  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ suit, value })
  });

  document.getElementById('cardForm').reset();
  document.getElementById('cardId').value = '';
  fetchCards();
}

async function deleteCard(id) {
  await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
  fetchCards();
}

function editCard(id, suit, value) {
  document.getElementById('cardId').value = id;
  document.getElementById('suit').value = suit;
  document.getElementById('value').value = value;
}

document.getElementById('cardForm').addEventListener('submit', addOrUpdateCard);
fetchCards();
