export default async function handler(req, res) {
  // Habilitar CORS para aceitar chamadas externas (GitHub Pages)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { messages } = req.body;

    const r = await fetch("https://generativelanguage.googleapis.com/v1beta/openai/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gemini-2.5-flash",
        messages,
        temperature: 0.7,
        max_output_tokens: 512,
      }),
    });

    const data = await r.json();
    const reply = data?.choices?.[0]?.message?.content ?? "⚠️ Erro na resposta";

    res.status(200).json({ reply });
  } catch (e) {
    res.status(500).json({ error: "Erro interno", details: String(e) });
  }
}
