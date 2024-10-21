const cors = require('cors')
const express = require('express')
const multer = require('multer');
const path = require('path');
const fs = require('fs')
const app = express()
app.use(cors())
app.use(express.json())


// Setup storage for uploaded images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder for storing images
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename the file with a timestamp
    }
});

// Initialize the multer middleware
const upload = multer({ storage: storage });


// Serve static files from the "uploads" directory
app.use('/uploads', express.static('uploads'));

const PORT = 8001


require('dotenv').config()
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.VUE_APP_API_KEY)

//route


// Handle image file upload
app.post('/upload-image', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
  
    // Return the URL of the uploaded image
    const imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
    return res.status(200).json({ imageUrl });
});

app.delete('/delete-image/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', filename);

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ message: 'File not found' });
        }
        // Delete the file
        fs.unlink(filePath, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to delete the file' });
            }
            return res.status(200).json({ message: 'File deleted successfully' });
        });
    });
});

// Function to convert file to generative part
async function fileToGenerativePart(path, mimeType) {
    try {
        const fileBuffer = await fs.promises.readFile(path); // Asynchronous file read
        return {
            inlineData: {
                data: fileBuffer.toString('base64'), // Convert file to base64
                mimeType
            }
        };
    } catch (error) {
        console.error(`Error reading file from path ${path}:`, error);
        throw new Error('File read error');
    }
}

app.post('/submit-prompt', async (req, res) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = req.body.prompt;
        const history = req.body.history;
        const image = req.body.image;
        const fileType = req.body.fileType;
        
        // Set headers for chunked streaming
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Transfer-Encoding', 'chunked');

        if (image) {
            const imagePath = `uploads/${image}`;
            const imageParts = image ? [await fileToGenerativePart(imagePath, fileType)] : [];
            const result = await model.generateContentStream([prompt, ...imageParts]);

            for await (const chunk of result.stream) {
                const chunkText = await chunk.text();
                res.write(chunkText);
            }

        }else {
            const chat = model.startChat({
                history: history
            });    
            const result = await chat.sendMessageStream(prompt);
            for await (const chunk of result.stream) {
                const chunkText = await chunk.text();
                res.write(chunkText);
            }

        }
        
        res.end(); // End the response
        
    } catch (error) {
        res.status(500).json('An error occurred during content generation: ', error);
        res.end();
    }
});
app.post('/get-recent-title', async (req, res) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = req.body.prompt;
        const history = req.body.history;
        
        const chat = model.startChat({
            history: history,
            generationConfig: {
                maxOutputTokens: 40
            }
        });    
        const result = await chat.sendMessage(prompt);
        const response = result.response.text()

        return res.status(200).json(response)
});




app.listen(PORT, () => console.log('Listening on port: ' + PORT ))
