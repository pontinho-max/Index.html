export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Mensagem não encontrada" });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
        }),
      }
    );

    const data = await response.json();

    return res.status(200).json({
      reply: data.candidates?.[0]?.content?.parts?.[0]?.text || "Sem resposta da IA",
    });
  } catch (error) {
    return res.status(500).json({ error: "Erro interno", details: error.message });
  }
}
    res.status(500).json({ error: "Erro interno", details: String(e) });
  }
}
