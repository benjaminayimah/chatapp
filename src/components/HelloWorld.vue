<template>
  <div>
    <h1>{{ msg }}</h1>
    <div>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </div>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa" target="_blank" rel="noopener">pwa</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router" target="_blank" rel="noopener">router</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-vuex" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
  </div>

  <!-- <div class="form-row flex flex-column gap-4">
                <div id="email_input_wrapper" class="input-wrapper relative">
                    <label for="email_input" class="input-label">Email</label>
                    <input 
                        v-model="form.email"
                        @focusin="isFocusIn('email_input_wrapper')"
                        @focusout="isFocusOut('email_input_wrapper', 'email_input')"
                        :aria-invalid="emailHasErrors"
                        :aria-describedby="emailDescribedBy"
                        class="w-100 form-control custom-input"
                        type="email"
                        id="email_input"
                        name="email"
                        maxlength="100"
                        autofocus
                        autocomplete="on"
                    >
                </div>
                <div v-if="emailErrors.length" class="validation-errors">
                    <li :id="`email_error_${index + 1}`" role="alert" v-for="(error, index) in emailErrors" :key="index" class="fs-09">
                        {{ error.msg }}
                    </li>
                </div>
            </div> -->

  <!-- <div class="form-row flex flex-column gap-4">
                <div id="password_input_wrapper" class="input-wrapper relative">
                    <label for="password_input" class="input-label">Password</label>
                    <input 
                        v-model="form.password"
                        @focusin="isFocusIn('password_input_wrapper')"
                        @focusout="isFocusOut('password_input_wrapper', 'password_input')"
                        :type="showPass ? 'text' : 'password'"
                        :aria-invalid="passwordHasErrors"
                        :aria-describedby="passwordDescribedBy"
                        class="w-100 form-control error-border custom-input"
                        id="password_input"
                        name="password"
                    >
                    <span class="hide-show-pass transparent-button absolute centered br-50 a-button" :class="{ 'hide-pass-active' : showPass }" @click.prevent="togglePass" data-type="modal">
                        <svg height="18" viewBox="0 0 26.364 26.364">
                            <g transform="translate(1.182 1.182)">
                                <path d="M16027.619-15079.234a21.431,21.431,0,0,1-4.111-4.4,2.816,2.816,0,0,1,0-3.226,21.339,21.339,0,0,1,4.111-4.406,11.5,11.5,0,0,1,7.129-2.734,11.516,11.516,0,0,1,7.132,2.734,21.4,21.4,0,0,1,4.107,4.4,2.822,2.822,0,0,1,0,3.229,21.4,21.4,0,0,1-4.107,4.4,11.51,11.51,0,0,1-7.132,2.734A11.492,11.492,0,0,1,16027.619-15079.234Zm.927-10.853a19.948,19.948,0,0,0-3.813,4.087,1.32,1.32,0,0,0,0,1.5,19.8,19.8,0,0,0,3.81,4.084,10.018,10.018,0,0,0,6.2,2.412,10.015,10.015,0,0,0,6.2-2.412,19.886,19.886,0,0,0,3.814-4.088,1.322,1.322,0,0,0,0-1.5,19.9,19.9,0,0,0-3.81-4.083,10.011,10.011,0,0,0-6.2-2.413A10.013,10.013,0,0,0,16028.546-15090.087Zm1.454,4.836a4.754,4.754,0,0,1,4.748-4.748,4.758,4.758,0,0,1,4.752,4.748,4.758,4.758,0,0,1-4.752,4.752A4.754,4.754,0,0,1,16030-15085.251Zm1.5,0a3.253,3.253,0,0,0,3.25,3.25,3.253,3.253,0,0,0,3.249-3.25,3.253,3.253,0,0,0-3.249-3.25A3.253,3.253,0,0,0,16031.5-15085.251Z" transform="translate(-16022.748 15097.25)" fill="#000"/>
                                <path id="pass_icon_stroke" v-if="!showPass" d="M0,22.121-2.121,20,20-2.121,22.121,0Z" transform="translate(2 2)" stroke-linecap="round" stroke-width="1.5"/>
                            </g>
                        </svg>
                    </span>
                </div>
                <div v-if="passwordErrors.length" class="validation-errors">
                    <li :id="`password_error_${index + 1}`" role="alert" v-for="(error, index) in passwordErrors" :key="index" class="fs-09" >
                        {{ error.msg }}
                    </li>
                </div>
            </div> -->
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    //
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

</style>
