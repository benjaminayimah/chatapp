<template>
  <div class="home">
    <Tooltip :text="'This is a tooltip!'" :position="'top'">
      <!-- <button>Hover me!</button> -->
    </Tooltip>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Get answers. Find inspiration. Be more productive."/>
  </div>
</template>

<script>
// @ is an alias to /src
import dotenv from "dotenv"; // Use ES6 import syntax
import { GoogleGenerativeAI } from "@google/generative-ai";
import HelloWorld from '@/components/HelloWorld.vue'
import Tooltip from '@/components/Tooltip.vue';

export default {
  name: 'HomeView',
  components: {HelloWorld, Tooltip},
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
    // this.gemini()
  }

}
</script>
