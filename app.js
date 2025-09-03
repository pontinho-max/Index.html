const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const messages = document.getElementById("messages");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userMessage = input.value.trim();
  if (!userMessage) return;

  addMessage("Você", userMessage, "user");
  input.value = "";

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();
    addMessage("🤖 IA", data.reply, "bot");
  } catch (err) {
    addMessage("Erro", "Não foi possível conectar ao servidor.", "bot");
  }
});

function addMessage(sender, text, type) {
  const messageEl = document.createElement("div");
  messageEl.classList.add("message", type);
  messageEl.innerHTML = `<strong>${sender}:</strong> ${text}`;
  messages.appendChild(messageEl);
  messages.scrollTop = messages.scrollHeight;
}
