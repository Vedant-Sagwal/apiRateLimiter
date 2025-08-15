import { Router } from "express"
const r = Router()

r.get("/", (req, res) => {
  return res.json({ ok: true, message: "Welcome! You are within limits" })
})

r.get("/heavy", (req, res) => {
  // pretend do heavy work
  res.json({ ok: true, message: "Heavy endpoint served." });
});

export default r;
