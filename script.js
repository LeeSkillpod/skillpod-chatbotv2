
async function sendMessage() {
  const inputBox = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const userText = inputBox.value.trim();
  if (!userText) return;

  const userMsg = document.createElement("div");
  userMsg.textContent = "You: " + userText;
  chatBox.appendChild(userMsg);
  chatBox.scrollTop = chatBox.scrollHeight;
  inputBox.value = "";

  const botMsg = document.createElement("div");
  botMsg.textContent = "Kōrero AI is thinking...";
  chatBox.appendChild(botMsg);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch("/.netlify/functions/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userText })
    });
    const data = await response.json();
    botMsg.textContent = "AI: " + data.reply;
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (error) {
    botMsg.textContent = "Sorry, something went wrong.";
  }
}

// Start with a simple prompt to trigger the GPT to ask its first question
window.onload = () => {
  document.getElementById("user-input").value = "Hello";
  sendMessage();
};
