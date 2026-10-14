const express = require('express');

const authMiddleware = require('../middleware/auth');
const History = require('../models/History');

const router = express.Router();
const OpenAI = require('openai');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


function buildPrompt(code, language, level) {
  const levelDesc = {
    beginner: 'very simple, avoid jargon, use analogies, explain like talking to a 10-year-old',
    intermediate: 'moderate technical depth, explain logic and flow clearly',
    advanced: 'deep technical explanation, include design patterns, best practices, performance considerations'
  }[level];

  return `You are an expert ${language} programming tutor. Analyze this code and respond ONLY in the exact format below. No extra text outside these sections.

CODE TO ANALYZE (${language.toUpperCase()}):
\`\`\`${language}
${code}
\`\`\`

EXPLANATION LEVEL: ${level.toUpperCase()} - ${levelDesc}

Respond in EXACTLY this format:

=== LINE BY LINE EXPLANATION ===
[For each meaningful line or block, write: Line X: <explanation>]

=== BUGS & FIXES ===
[List any syntax errors, logical errors, or issues found. Format: Line X - Issue: <description> | Fix: <corrected code> | Reason: <why>. If no bugs, write: No bugs detected ✅]

=== COMPLEXITY ANALYSIS ===
Time Complexity: O(?) - <brief explanation>
Space Complexity: O(?) - <brief explanation>
Overall Assessment: <1-2 sentences>

=== EXAM SUMMARY ===
• <key point 1>
• <key point 2>
• <key point 3>
• <key point 4>
• <key point 5>`;
}

// POST /api/analyze-code
router.post('/analyze-code', authMiddleware, async (req, res) => {
  try {
    const { code, language, level } = req.body;
    if (!code || !language || !level)
      return res.status(400).json({ message: 'Code, language, and level are required' });

    const prompt = buildPrompt(code, language, level);

  const completion = await client.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [{ role: "user", content: prompt }],
});

const rawText = completion.choices[0].message.content;

    // Parse sections
    const parse = (text, section) => {
      const regex = new RegExp(`=== ${section} ===\\s*([\\s\\S]*?)(?====|$)`);
      const match = text.match(regex);
      return match ? match[1].trim() : '';
    };

    const result = {
      explanation: parse(rawText, 'LINE BY LINE EXPLANATION'),
      errors: parse(rawText, 'BUGS & FIXES'),
      complexity: parse(rawText, 'COMPLEXITY ANALYSIS'),
      summary: parse(rawText, 'EXAM SUMMARY')
    };

    // Save to history
    await History.create({ userId: req.userId, code, language, level, result });

    res.json({ success: true, result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'AI analysis failed', error: err.message });
  }
});

// GET /api/history
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const history = await History.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      
      .limit(10)
      .select('language level createdAt code');
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching history' });
  }
});

module.exports = router;