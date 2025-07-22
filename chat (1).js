const chatLog = document.getElementById("chat-log");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = chatInput.value.trim();
  if (!message) return;

  appendMessage("user", message);
  chatInput.value = "";

  try {
    const response = await fetch("/.netlify/functions/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    appendMessage("bot", data.reply);
  } catch (error) {
    console.error("Error:", error);
    appendMessage("bot", "Sorry, something went wrong.");
  }
});

function appendMessage(sender, text) {
  const messageEl = document.createElement("div");
  messageEl.className = sender === "user" ? "user-message" : "bot-message";
  messageEl.textContent = text;
  chatLog.appendChild(messageEl);
  chatLog.scrollTop = chatLog.scrollHeight;
}