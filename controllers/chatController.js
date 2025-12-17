const { GoogleGenerativeAI } = require("@google/generative-ai");

// processing function
const processMessage = async (req, res) => {
    const { message } = req.body;

    // 1. Try Real AI if API Key exists
    if (process.env.GEMINI_API_KEY) {
        try {
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });

            const prompt = `You are a helpful Placement Assistant for a college. 
            Help students with:
            - Resume tips
            - Interview preparation
            - Career guidance
            - Technical limits: Keep answers concise (under 100 words).
            
            Student asks: ${message}`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            return res.json({ reply: text });
        } catch (error) {
            console.error('AI Error:', error);
            // Fallback to local logic if AI fails
        }
    }

    // 2. Fallback / Local Logic (Mock AI)
    const lowerMsg = message.toLowerCase();
    let reply = "I'm your Placement Assistant. Ask me about resumes, interviews, or upcoming companies!";

    if (lowerMsg.includes('resume') || lowerMsg.includes('cv')) {
        reply = "For a strong resume: 1. Keep it to 1 page. 2. Highlight projects and skills. 3. Use action verbs (e.g., 'Developed', 'Led'). Would you like a template?";
    } else if (lowerMsg.includes('interview')) {
        reply = "Interview Tip: Research the company beforehand. Practice common questions like 'Tell me about yourself' and 'What are your strengths/weaknesses?'. Be ready to explain your projects in depth.";
    } else if (lowerMsg.includes('company') || lowerMsg.includes('placement')) {
        reply = "Check the 'Companies' tab for current openings. Ensure your profile is verified by your faculty advisor before applying.";
    } else if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
        reply = "Hello! tailored to help you succeed in your placements. How can I assist you today?";
    }

    res.json({ reply });
};

module.exports = { processMessage };
