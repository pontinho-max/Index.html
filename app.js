const chat = document.getElementById("chat");
const form = document.getElementById("composerForm");
const input = document.getElementById("input");
const tpl = document.getElementById("msgTemplate");

// coloque aqui a URL do seu backend no Vercel
const API_URL = "https://mim-3fo3u8grd-pontinho-s-projects.vercel.app/api/chat";

function renderMessage(role, text) {
  const node = tpl.content.cloneNode(true);
  const msg = node.querySelector(".msg");
  const bubble = node.querySelector(".msg__bubble");
  msg.classList.add(role);
  bubble.textContent = text;
  chat.appendChild(node);
  chat.scrollTop = chat.scrollHeight;
}

function renderTyping() {
  const msg = document.createElement("div");
  msg.className = "msg bot";
  msg.innerHTML = `
    <div class="msg__bubble">
      <span class="typing"></span>
      <span class="typing"></span>
      <span class="typing"></span>
    </div>
  `;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
  return msg;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  input.value = "";
  renderMessage("user", text);

  // Mostra animação "digitando..."
  const typingEl = renderTyping();

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [{ role: "user", content: text }] }),
    });
    const data = await res.json();
    typingEl.remove();
    renderMessage("bot", data.reply);
  } catch (err) {
    typingEl.remove();
    renderMessage("bot", "⚠️ Erro ao conectar com o servidor");
  }
});
    });
    const data = await res.json();
    loading.remove();
    renderMessage("bot", data.reply);
  } catch (err) {
    loading.remove();
    renderMessage("bot", "⚠️ Erro ao conectar com o servidor");
  }
});
