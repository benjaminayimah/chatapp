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
app.post('/gemini-pro', async(req, res) => {
    // try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
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
        const image = req.body.image; // Image file name/path
        const ext = req.body.ext; // Image file extension
        
        // Set headers for chunked streaming
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Transfer-Encoding', 'chunked');

        if (image) {
            const imagePath = `uploads/${image}`;
            const imageParts = image ? [await fileToGenerativePart(imagePath, `image/${ext}`)] : [];
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

            // res.status(500).json({ history});

        }
        
        res.end(); // End the response
        
    } catch (error) {
        console.error('Error processing prompt and image:', error);
        res.status(500).json('An error occurred during content generation');
        res.end();
    }
});

// Route to handle the prompt and image submission
// app.post('/submit-prompt', async (req, res) => {
//     try {
//         const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//         const prompt = req.body.prompt;
//         const image = req.body.image; // Image file name/path
//         const ext = req.body.ext; // Image file extension
        
//         // Ensure image file exists before processing
//         const imagePath = `uploads/${image}`;
        
//         // Prepare image part for the AI model
//         const imageParts = image ? [await fileToGenerativePart(imagePath, `image/${ext}`)] : [];
        
//         // Send prompt and image parts to the model
//         const result = await model.generateContent([prompt, ...imageParts]);
//         const response = await result.response;

//         const text = await response.text(); // Get the text from the response

//         // Send back the result as JSON
//         res.status(200).json({ message: text });
//     } catch (error) {
//         console.error('Error processing prompt and image:', error);
//         res.status(500).json({ message: 'An error occurred while generating content' });
//     } finally {
//         res.end();
//     }
// });

// app.post('/submit-prompt', async(req, res) => {
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"})
//     const prompt = req.body.prompt
//     const image = req.body.image
//     const ext = req.body.ext

//     const imageParts = [fileToGenerativePart(`uploads/${image}`, `image/${ext}`)]
//     const result = await model.generateContent([prompt, ...imageParts])
//     const response = await result.response

//     const text = response.text();
    
//     res.status(200).json({ message: text });

//     res.end();
// })

app.post('/submit-prompt111', async(req, res) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"})
    const prompt = req.body.prompt
    const image = req.body.image
    const ext = req.body.ext

    // const imageParts = [fileToGenerativePart(`uploads/${image}`, `image/${ext}`)]
    // const result = await model.generateContent([prompt, ...imageParts])
    // const response = await result.response

    // const text = response.text();
    
    // res.status(200).json({ message: text });

    
    // res.end();

    try {
        // Prepare the image part for the generative model
        const imageParts = [fileToGenerativePart(`uploads/${image}`, `image/${ext}`)];
    
        // Start generating content based on the prompt and image
        const result = await model.generateContentStream([prompt, ...imageParts]);
    
        // Set headers for a chunked response (streaming)
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Transfer-Encoding', 'chunked');
    
        res.write('['); // Start the JSON array for streaming chunks
        let firstChunk = true;
    
        // Stream each chunk of the response
        for await (const chunk of result.stream) {
            if (!firstChunk) res.write(',');
            firstChunk = false;
    
            const chunkData = await chunk.json();
    
            if (chunkData.type === 'text') {
                // Send text chunks
                res.write(JSON.stringify({
                    type: 'text',
                    content: chunkData.content
                }));
            } else if (chunkData.type === 'image') {
                // Encode image as base64 and stream it
                const base64Image = chunkData.image.toString('base64');
                res.write(JSON.stringify({
                    type: 'image',
                    content: base64Image,
                    mimeType: chunkData.mimeType || 'image/png'
                }));
            }
        }
    
        res.write(']'); // End JSON array
        res.end(); // End the response
    
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred during content generation' });
    }

    
})

app.post('/submit-promsspt', upload.single('image'), async (req, res) => {
    const textPrompt = req.body.prompt;
    const imageFile = req.body.image;
    const ext = req.body.ext
    
    // Prepare the AI model with both text and image input
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const chat = model.startChat({
        history: req.body.history || [] // Optional conversation history
    });

    // Assuming the AI API can handle both text and image inputs
    const inputs = {
        text: textPrompt,
        image: imageFile ? imageFile.buffer : null // If image exists, pass its buffer
    };

    try {
        const result = await chat.sendMessageStream(inputs); // Send both text and image
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Transfer-Encoding', 'chunked');

        // res.setHeader('Content-Type', 'text/plain');
        // res.setHeader('Transfer-Encoding', 'chunked');
        
        // for await (const chunk of result.stream) {
        //     const chunkText = await chunk.text();
        //     res.write(chunkText);
        // }

        res.write('['); // Start JSON array
        let firstChunk = true;

        for await (const chunk of result.stream) {
            const chunkData = await chunk.json(); // Process the chunk

            if (!firstChunk) res.write(','); // Separate chunks in JSON array
            firstChunk = false;

            if (chunkData.type === 'text') {
                res.write(JSON.stringify({
                    type: 'text',
                    content: chunkData.content // Text response
                }));
            } else if (chunkData.type === 'image') {
                const base64Image = chunkData.image.toString('base64'); // Convert image to base64
                res.write(JSON.stringify({
                    type: 'image',
                    content: base64Image, // Image response in base64
                    mimeType: chunkData.mimeType || 'image/png' // Mime type for the image
                }));
            }
        }

        res.write(']');
        res.end(); // End the response

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
});



app.listen(PORT, () => console.log('Listening on port: ' + PORT ))
