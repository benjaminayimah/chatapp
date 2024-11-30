<template>
  <div class="flex flex-1 jc-c overflow-y-scroll custom-scrollbar">
    <div class="main-wrapper flex-1">
      <section class="flex gap-16 flex-wrap w-100 pd-b-32">
        <a href="#" v-for="data in arr" :key="data.id" class="card-wrapper">
          <div class="image-wrapper relative">
            <div class="overlay absolute"></div>
            <img src="../assets/sample.jpeg" />
          </div>
          <div class="image-footer flex flex-column gap-4">
            <div class="flex jc-sb">
              <div>Name of product</div>
              <div>Price</div>
            </div>
            <span>MOVIE PREPIERE</span>
            <div class="flex gap-8">
              <span>Silverbird Cinima</span>
              <span>Accra Mall</span>
            </div>
          </div>
        </a>
      </section>
      
    </div>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  data() {
    return {
      arr: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
        { id: 10 },
        { id: 11 },
        { id: 12 },
        { id: 13 },
        { id: 14 },
        { id: 15 },
        { id: 16 },
        { id: 17 },
        { id: 18 },


      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.main-wrapper {
    max-width: 1080px;
    padding: 0 20px;
}


.card-wrapper {
  flex-grow: 1;
  max-width: 300px;
  &:hover {
    .overlay {
      background-color: rgba($color: #000000, $alpha: .5);
    }
  }

}

.image-wrapper {
  width: inherit;
  border-radius: 12px;
  img {
    width: 100%;
    border-radius: inherit;
  }
  .overlay {
    border-radius: inherit;
    inset: 0;
    transition: var(---transition-time) all;
  }
}


</style>
