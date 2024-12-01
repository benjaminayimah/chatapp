<template>
  <div class="flex flex-1 jc-c ov-x-hidden page-wrapper">
    <div class="main-wrapper flex-1 flex flex-column gap-24">
      <section id="main_banner" class="w-100 br-24 relative">
        <div v-if="!agents.length" class="animate-pulse skeleton-surface w-100"></div>
        <div v-else class="h-100 bg-transition flex" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
          <div v-for="(banner, index) in banners" :key="banner.id" class="flex h-100 banner-slide bg-transition" :class="{ 'active-banner' : index === currentIndex }">
            <div class="flex-1 centered">
              <div class="captions">
                <div class="capitalize title fs-102 fw-600">{{ banner.label }}</div>
                <h1 class="mb-8 mt-4">{{ typedText }}</h1>
                <div class="h-2 banner-description">{{ banner.description }}</div>
              </div>
            </div>
            <div class="flex-1 image-holder">
              <img :src="banner.image" alt="Banner" class="h-100 w-100">
            </div>
          </div>
        </div>
      </section>
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
            <div v-if="!agents.length" class="flex gap-8">
              <div v-for="empty in emptyArr" :key="empty" class="br-20 animate-pulse skeleton-surface" style="height: 119px;width:254px"></div>
            </div>
            <profile-agent-list
                  v-for="agent in agents"
                  :key="agent.id"
                  :agent="agent"
                  :creator="agent.user.username"
                  :actionMenu="false"
                  :height="95"
                  :width="80"
              />
          </div>
        </div>
      </section>
      <section style="height: 900px">

      </section>
    </div>
  </div>
</template>

<script>
import ProfileAgentList from '@/components/ProfileAgentList.vue'
import { mapState } from 'vuex';

export default {
  name: 'HomeView',
  components: { ProfileAgentList },
  computed: {
    ...mapState({
      agents: (state) => state.agents
    })
  },
  data() {
    return {
      banners: [
        { id: 1, label: 'Ask anything...', title: 'Get help with your home work.', description: 'You can get help with your homework, from essays and compositions to math questions.', image: require('../assets/banner-image1.webp')},
        { id: 2, label: 'AI Agents', title: 'Create and train your AI Agents.', description: 'Create an AI Agent and train it to help you with specific tasks.', image: require('../assets/banner-image1.webp')},
        { id: 3, label: 'Identify anything...', title: 'Get help with your home work.', description: 'You can get help with your homework, from essays and compositions to math questions.', image: require('../assets/banner-image1.webp')}
      ],
      currentIndex: 0,
      emptyArr: [1,2,3,4],
      scrollAmount: 200,
      isAtStart: true,
      isAtEnd: false ,


      typedText: '',
      typingSpeed: 50,
    }
  },
  methods: {
    scrollLeft() {
      const scrollContent = this.$refs.scrollContent;
      scrollContent.scrollBy({ left: - this.scrollAmount, behavior: 'smooth' });
      this.updateButtonState();
    },
    scrollRight() {
      const scrollContent = this.$refs.scrollContent;
      scrollContent.scrollBy({ left: this.scrollAmount, behavior: 'smooth' });
      this.updateButtonState();
    },
    updateButtonState() {
      const scrollContent = this.$refs.scrollContent;
      this.isAtStart = scrollContent.scrollLeft === 0;
      this.isAtEnd = scrollContent.scrollLeft + scrollContent.offsetWidth >= scrollContent.scrollWidth;
    },
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.banners.length; // Loop to the start
      this.typedText = ''
      this.typeText();
    },
    goToSlide(index) {
      this.currentIndex = index;
    },
    typeText() {
        let index = 0;

        const typeInterval = setInterval(() => {
          let textToType = this.banners[this.currentIndex].title
            if (index < textToType?.length) {
                this.typedText += textToType.charAt(index);
                index++;
            } else {
                clearInterval(typeInterval)
            }
        }, this.typingSpeed);
    },
  },
  mounted() {
    // this.updateButtonState();
    this.typeText();

    this.$refs.scrollContent.addEventListener('scroll', this.updateButtonState);
    setInterval(() => {
      this.nextSlide();
    }, 10000);
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
.button-control {
  border-radius: unset;
  width: 50px;
  height: 100%;
  z-index: 10;
  path {
    fill: var(--main-font-color-2);
  }
  &:hover {
    path {
      fill: var(--main-font-color-primary)
    }
  }
}
.button-scroll-left {
  left: 0;
  background: linear-gradient(to left, rgba(255, 255, 255, 0) 0%, var(--main-background-primary) 80%);

}
.button-scroll-right {
  right: 0;
  background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, var(--main-background-primary) 80%);

}

.page-wrapper  {
  container: modal_container / inline-size;
}

@container modal_container (width < 1081px) {
  .main-wrapper {
    width: 90vw;
  }
}
.mobile {
  .main-wrapper {
    width: 100vw;
  }
}
#main_banner {
  height: 400px;
  overflow: hidden;
  img {
    object-fit: cover;
  }
  .skeleton-surface {
    height: inherit;
    border-radius: inherit;
  }
}
.caption-wrapper {
  height: inherit;
  border-radius: inherit;
  inset: 0;
}
.image-overlay {
  inset: 0;
  // background: linear-gradient(to left, rgba(255, 255, 255, 0) 0%, var(--main-background-2) 100%);
}
.captions {
  max-width: 340px;
  transition: 1s all;
}
.tablet {
  .captions {
    padding-left: 16px;
    padding-right: 16px;
  }
}
.mobile {
  .banner-slide {
    flex-direction: column;
    padding: 16px;
  }
  img {
    height: 200px;
    border-radius: 16px;
  }
  .captions {
    text-align: center
  }
  .image-holder {
    display: flex;
    justify-content: center;
  }
}
.title {
  background-color: #63d8e3;
  background-image: linear-gradient(90deg, #63d8e3, #29beff, #007aff);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  display: inline;
}

.banner-slide {
  min-width: 100%;
  box-sizing: border-box;
  background-color: var(--main-background-2);
}

.active-banner {
  .banner-description {
    opacity: 0;
    animation: fadeIn 1.2s forwards;
    animation-delay: 1.5s;
  }
}
h1 {
  line-height: 2.2rem;
  min-height: 70.5px;
}
  

</style>
