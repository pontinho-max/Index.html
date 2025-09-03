const chat = document.getElementById("chat");
const form = document.getElementById("composerForm");
const input = document.getElementById("input");
const tpl = document.getElementById("msgTemplate");

const API_URL = "https://SEU_PROJETO.vercel.app/api/chat"; // ajuste aqui com o link do Vercel

function renderMessage(role, text) {
  const node = tpl.content.cloneNode(true);
  const msg = node.querySelector(".msg");
  const bubble = node.querySelector(".msg__bubble");
  msg.classList.add(role);
  bubble.textContent = text;
  chat.appendChild(node);
  chat.scrollTop = chat.scrollHeight;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  input.value = "";
  renderMessage("user", text);

  // mostra "digitando..."
  const loading = document.createElement("div");
  loading.className = "msg bot";
  loading.innerHTML = `<div class="msg__bubble">...</div>`;
  chat.appendChild(loading);
  chat.scrollTop = chat.scrollHeight;

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [{ role: "user", content: text }] }),
    });
    const data = await res.json();
    loading.remove();
    renderMessage("bot", data.reply);
  } catch (err) {
    loading.remove();
    renderMessage("bot", "⚠️ Erro ao conectar com o servidor");
  }
});
