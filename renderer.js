
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
  appendMessage('Assistant', data.response);
});

function appendMessage(sender, text) {
  const messageEl = document.createElement('div');
  messageEl.className = sender.toLowerCase() + '-message';
  messageEl.textContent = sender + ': ' + text;
  chatOutput.appendChild(messageEl);
  chatOutput.scrollTop = chatOutput.scrollHeight;
}
