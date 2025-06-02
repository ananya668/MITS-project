const form =document.querySelector('form');
form.addEventListener('submit', (event) => {
event.preventDefault();
const name =document.querySelector('#name').value;
const message =document.querySelector('#message').value;
const messageElement =document.createElement('p');
messageElement.textContent = 'Thank you for your message, '${name}!' we will be in touch soon.';
messageElement.classList.add('message');
form.appendChild(messageElement);
});