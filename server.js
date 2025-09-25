import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({ origin: (process.env.CORS_ORIGIN || "").split(",") }));

app.get("/v1/health", (_req, res) => {
  res.status(200).json({ ok: true, name: process.env.ASSISTANT_NAME || "ELY" });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`orchestrator up on :${port}`));

// --- ELY: chat mínimo (echo) ---
app.post("/v1/ely/chat", (req, res) => {
  const { message, mode = "studio" } = req.body || {};
  if (!message) return res.status(400).json({ error: "message required" });
  return res.json({ reply: `ELY(${mode}): ${message}` });
});

// extra: GET para probar fácil en el navegador
app.get("/v1/ely/chat", (req, res) => {
  const { message = "", mode = "studio" } = req.query || {};
  if (!message) return res.status(400).json({ error: "message required" });
  return res.json({ reply: `ELY(${mode}): ${message}` });
});
