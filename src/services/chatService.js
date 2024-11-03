import api from "./apis";
// Function to handle streaming
const submitPromptStream = async (data) => {
    const response = await api.post('/submit-prompt', data, { responseType: 'stream' });
    const reader = response.data.getReader();
    const decoder = new TextDecoder();
    let text = '';
    let done = false;

    while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) text += decoder.decode(value, { stream: true });
    }
    return text; // Process text after streaming
};

export default submitPromptStream

