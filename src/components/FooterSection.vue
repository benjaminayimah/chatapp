<template>
    <footer>
    <div class="centered pd-32 mt-32">
      <div class="flex ai-c fs-09">
        <a href="https://example.com" target="_blank" class="font-color-2">About</a>
        <span class="fs-101 dot">&#8231;</span> 
        <a href="https://example.com" target="_blank" class="font-color-2">Terms</a>
        <span class="fs-101 dot">&#8231;</span> 
        <a href="https://example.com" target="_blank" class="font-color-2">Privacy Policy</a>
        <span class="fs-101 dot">&#8231;</span> 
        <a href="https://example.com" target="_blank" class="font-color-2">Help</a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
    name: 'FooterSection'
}
</script>
<style lang="scss" scoped>
footer {
  a {
    padding: 8px;
    &:hover {
      color: var(--main-font-color-primary);
    }
  }
}
</style>