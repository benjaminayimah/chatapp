
export default {
    methods: {
        generateUniqueId(length) {
            const characters = '0123456789abcdef';
            let result = '';
            for (let i = 0; i < length; i++) {
                result += characters[Math.floor(Math.random() * characters.length)];
            }
            return result;
        },
    }
 
}