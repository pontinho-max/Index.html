const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const messages = document.getElementById("messages");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userMessage = input.value.trim();
  if (!userMessage) return;

  // mostra mensagem do usuário
  addMessage("Você", userMessage);
  input.value = "";

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();
    addMessage("🤖 IA", data.reply);
  } catch (err) {
    addMessage("Erro", "Não foi possível conectar ao servidor.");
  }
});

function addMessage(sender, text) {
  const messageEl = document.createElement("div");
  messageEl.classList.add("message");
  messageEl.innerHTML = `<strong>${sender}:</strong> ${text}`;
  messages.appendChild(messageEl);
  messages.scrollTop = messages.scrollHeight;
}
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
