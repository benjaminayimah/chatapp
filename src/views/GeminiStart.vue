<template>
    <div class="home">
        <h2>Gemini Start</h2>
    </div>
  </template>
  
  <script>
  import dotenv from "dotenv";
  import { GoogleGenerativeAI } from "@google/generative-ai";
  
  export default {
    name: 'GeminiStart',
    data() {
      return {
        prompt: 'hi'
      }
    },
    methods: {
      async gemini() {
        dotenv.config();
        const genAI = new GoogleGenerativeAI(process.env.VUE_APP_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        const prompt = this.prompt;
        const result = await model.generateContent(prompt)
        const res = await result.response
        const text = res.text()
        console.log(text)
      }
    },
    async mounted() {
    //   this.gemini()
    }
  
  }
  </script>
  