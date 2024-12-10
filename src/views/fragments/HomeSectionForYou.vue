<template>
    <section class="w-100 flex flex-column gap-12">
        <h4>For you</h4>
        <div class="relative">
          <button v-show="!isAtStart" @click="scrollLeft" data-type="controls" class="button-control absolute centered button-scroll-left">
            <svg height="20" viewBox="0 0 12.728 12.728">
              <path class="invert-fill-color" d="M3040.54,700.161a.5.5,0,0,1-.5-.5v-7.5h-7.5a.5.5,0,0,1,0-1h8a.5.5,0,0,1,.5.5v8A.5.5,0,0,1,3040.54,700.161Z" transform="translate(1661.616 2645.428) rotate(-135)" fill="#fff"/>
            </svg>
          </button>
          <button v-show="!isAtEnd && agents.length" @click="scrollRight" data-type="controls" class="button-control absolute centered button-scroll-right">
            <svg height="20" viewBox="0 0 12.728 12.728">
              <path class="invert-fill-color" d="M3040.54,700.161a.5.5,0,0,1-.5-.5v-7.5h-7.5a.5.5,0,0,1,0-1h8a.5.5,0,0,1,.5.5v8A.5.5,0,0,1,3040.54,700.161Z" transform="translate(-1648.888 -2632.701) rotate(45)" fill="#fff"/>
            </svg>
          </button>
          <div ref="scrollContent" class="overflow-x-scroll custom-scrollbar scroll-hidden scroll-snap flex gap-8">
            <div v-if="!agents.length" class="flex gap-8 w-100">
              <div v-for="empty in emptyArr" :key="empty" class="br-20 animate-pulse skeleton-surface flex-1" style="height: 119px"></div>
            </div>
            <profile-agent-list
                  v-for="agent in agents.slice(0, 20)"
                  :key="agent.id"
                  :agent="agent"
                  :creator="agent.user.username"
                  :actionMenu="false"
                  :height="95"
                  :width="80"
                  :radius="12"
                  :parent="'home'"
              />
          </div>
        </div>
      </section>
</template>

<script>
import scrollMixin from '@/mixins/scrollMixin';
import ProfileAgentList from '@/components/ProfileAgentList.vue'
export default {
    components: { ProfileAgentList },
    mixins: [scrollMixin],
    props: {
        agents: Array
    }
}
</script>