<template>
    <section class="w-100 flex flex-column gap-12">
        <h4>Featured creators</h4>
        <div class="relative">
          <button v-show="!isAtStart" @click="scrollLeft" data-type="controls" class="button-control absolute centered button-scroll-left">
            <svg height="20" viewBox="0 0 12.728 12.728">
              <path class="invert-fill-color" d="M3040.54,700.161a.5.5,0,0,1-.5-.5v-7.5h-7.5a.5.5,0,0,1,0-1h8a.5.5,0,0,1,.5.5v8A.5.5,0,0,1,3040.54,700.161Z" transform="translate(1661.616 2645.428) rotate(-135)" fill="#fff"/>
            </svg>
          </button>
          <button v-show="!isAtEnd && creators.length" @click="scrollRight" data-type="controls" class="button-control absolute centered button-scroll-right">
            <svg height="20" viewBox="0 0 12.728 12.728">
              <path class="invert-fill-color" d="M3040.54,700.161a.5.5,0,0,1-.5-.5v-7.5h-7.5a.5.5,0,0,1,0-1h8a.5.5,0,0,1,.5.5v8A.5.5,0,0,1,3040.54,700.161Z" transform="translate(-1648.888 -2632.701) rotate(45)" fill="#fff"/>
            </svg>
          </button>
          <div ref="scrollContent" class="overflow-x-scroll custom-scrollbar scroll-hidden scroll-snap flex gap-12">
            <div v-if="!creators.length" class="flex gap-8 w-100">
              <div v-for="empty in emptyArr" :key="empty" class="br-20 animate-pulse skeleton-surface flex-1" style="height:230px;min-width:254px"></div>
            </div>
            <creators-list
                v-for="creator in creators.slice(0, 20)"
                :key="creator.id"
                :creator="creator"
            />
          </div>
        </div>
      </section>
</template>

<script>
import scrollMixin from '@/mixins/scrollMixin';
import CreatorsList from '@/components/CreatorsList.vue';
export default {
    components: { CreatorsList },
    mixins: [scrollMixin],
    props: {
        creators: Array
    }
}
</script>