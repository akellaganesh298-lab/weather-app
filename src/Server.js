import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

app.post("/api/ai", async (req, res) => {
    try {
        const response = await axios.post("https://api.openai.com/v1/chat/completions", {
            model: "gpt-3.5-turbo",
            messages: req.body.messages
        }, {
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
                "Content-Type": "application/json"
            }
        });

        // Send the AI's message back to React
        res.json({ message: response.data.choices[0].message.content });
    } catch (error) {
        console.error("AI API error:", error.message);
        res.status(500).json({ error: "Failed to get AI response" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
