function initChat() {
    const socket = io();
  
    function sendMessage() {
      const user = document.getElementById('user').value;
      const message = document.getElementById('message').value;
      socket.emit('chatMessage', { user, message });
      document.getElementById('message').value = '';
    }
  
    socket.on('chatMessage', (data) => {
      const { user, message } = data;
      const chatContainer = document.getElementById('chatContainer');
      const messageElement = document.createElement('p');
      messageElement.innerHTML = `<strong>${user}:</strong> ${message}`;
      chatContainer.appendChild(messageElement);
    });
  
    document.getElementById('sendBtn').addEventListener('click', sendMessage);
  }
  
  window.addEventListener('DOMContentLoaded', initChat);
  