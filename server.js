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
