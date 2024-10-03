const PORT = 8001
const cors = require('cors')
const express = require('express')
const app = express()
app.use(cors())
app.use(express.json())


require('dotenv').config()
const { GoogleGenerativeAI } = require("@google/generative-ai")

const genAI = new GoogleGenerativeAI(process.env.VUE_APP_API_KEY)

//route
app.post('/gemini-pro', async(req, res) => {
    // try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const chat = model.startChat({
            history: req.body.history
        });
        const msg = req.body.message;

        const result = await chat.sendMessageStream(msg);
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Transfer-Encoding', 'chunked');
        
        for await (const chunk of result.stream) {
            const chunkText = await chunk.text();
            res.write(chunkText);
        }
        
        res.end();
    // } catch (error) {
    //     console.error('Error processing request:', error);
    //     res.status(500).json({ error: 'Something went wrong!' });
    // }
})

app.listen(PORT, () => console.log('Listening on port: ' + PORT ))

