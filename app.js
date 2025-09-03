const API_URL = "https://mim-3fo3u8grd-pontinho-s-projects.vercel.app/api/chat";

const form = document.querySelector("form");
const input = document.getElementById("message");
const chatBox = document.getElementById("chat-box");

// Função para exibir mensagens no chat
function addMessage(sender, text) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);
  messageDiv.textContent = text;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userMessage = input.value.trim();
  if (!userMessage) return;

  // Mostrar mensagem do usuário
  addMessage("user", userMessage);
  input.value = "";

  try {
    // Enviar para o backend
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    const data = await res.json();

    if (data.reply) {
      addMessage("bot", data.reply);
    } else {
      addMessage("bot", "⚠️ Erro: resposta inválida do servidor.");
      console.error("Resposta inesperada:", data);
    }
  } catch (err) {
    addMessage("bot", "⚠️ Erro ao conectar com o servidor.");
    console.error(err);
  }
});
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
