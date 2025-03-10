<template>
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
</template>

<script>
export default {
    props: {
        agents: Array
    },
    data() {
        return {
            banners: [
                { id: 1, label: 'Ask anything...', title: 'Get help with your home work.', description: 'You can get help with your homework, from essays and compositions to math questions.', image: require('@/assets/banner-image1.webp')},
                { id: 2, label: 'AI Agents', title: 'Create and train your AI Agents.', description: 'Create an AI Agent and train it to help you with specific tasks.', image: require('@/assets/banner-image1.webp')},
                { id: 3, label: 'Identify anything...', title: 'Get help with your home work.', description: 'You can get help with your homework, from essays and compositions to math questions.', image: require('@/assets/banner-image1.webp')}
            ],
            currentIndex: 0,
            typedText: '',
            typingSpeed: 50,
        }
    },
    methods: {
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
        this.typeText();
        setInterval(() => {
            this.nextSlide();
        }, 10000);
    }
}
</script>

<style lang="scss" scoped>
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