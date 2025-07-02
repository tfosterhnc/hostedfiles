const chatInput = document.getElementById('chat-input');
const chatOutput = document.getElementById('chat-output');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', async () => {
  const userText = chatInput.value.trim();
  if (!userText) return;
  appendMessage('User', userText);
  chatInput.value = '';
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userText }),
  });
  const data = await response.json();
  appendMessage('Assistant', data.reply);
});

// Add this block to listen for Enter key press:
chatInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault(); // prevent newline in input
    sendBtn.click();        // trigger send button click
  }
});

function appendMessage(sender, text) {
  const messageEl = document.createElement('div');
  messageEl.className = sender.toLowerCase() + '-message';
  messageEl.textContent = sender + ': ' + text;
  chatOutput.appendChild(messageEl);
  chatOutput.scrollTop = chatOutput.scrollHeight;
}
