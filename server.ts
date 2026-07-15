import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize GenAI
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({
    apiKey: apiKey || '',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API Route for service requirements gathering
  app.post("/api/service-chat", async (req, res) => {
    try {
      const { messages, serviceTitle, serviceDescription } = req.body;

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required." });
      }

      const systemInstruction = `You are the Lead Solutions Architect at Ayush Automation Lab.
Your goal is to conduct a highly professional, systematic, and engaging discovery chat to extract, clarify, and document the client's business requirements for our service: "${serviceTitle}".
Service Context: "${serviceDescription}"

Conduct the interview step-by-step:
1. **Acknowledge and Welcome**: Greet the client warmly, acknowledging their interest in ${serviceTitle}.
2. **Systematic Gathering**: Ask one or two highly relevant questions at a time. Do not dump a wall of text. Focus on:
   - What is the core problem they are solving or their main project goal?
   - What are the key features or capabilities they absolutely need?
   - Are there specific integrations required? (e.g., CRMs, Stripe, Webhooks, legacy databases, social APIs, n8n, Slack, or Google Workspace)
   - What is their target timeline and do they have a budget reference?
   - Technical preferences or constraints.
3. **Structured & Beautiful**: Format your messages using clean Markdown. Use bullet points for choices, bold text for key categories, and keep paragraphs short.
4. **Interactive Prompts**: End each response with an open-ended but direct question that keeps the momentum going.
5. **No Hallucinations / Direct Answers**: If they ask about Ayush's tech expertise, tell them we build production-grade architectures with React, Next.js, FastAPI, Node.js, Python, n8n, Docker, and deployment pipelines on GCP/AWS/Railway.

Remember: Be conversational, sharp, and consultative. Do not mention that you are a language model. You are the AI Solutions Architect.`;

      // Formulate content parts for generateContent
      const contents = messages.map((msg: any) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini service-chat error:", error);
      res.status(500).json({ error: error.message || "Failed to communicate with AI Architect" });
    }
  });

  // Serve static assets & route requests
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
