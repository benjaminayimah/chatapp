<template>
  <div class="flex flex-1 jc-c page-wrapper">
    <div class="main-wrapper flex-1 flex flex-column gap-24">
      <home-section-banner :agents="agents" />
      <home-section-for-you :agents="agents" />
      <home-section-creators :creators="creators" />
      <home-section-create />
    </div>
  </div>
  <footer-section />
</template>

<script>
import { mapState } from 'vuex';
import titleMixin from '@/mixins/titleMixin';
import HomeSectionForYou from './fragments/HomeSectionForYou.vue';
import HomeSectionCreators from './fragments/HomeSectionCreators.vue';
import FooterSection from '@/components/FooterSection.vue';
import HomeSectionBanner from './fragments/HomeSectionBanner.vue';
import HomeSectionCreate from './fragments/HomeSectionCreate.vue';

export default {
  name: 'HomeView',
  components: { HomeSectionForYou, HomeSectionCreators, FooterSection, HomeSectionBanner, HomeSectionCreate},
  mixins: [titleMixin],
  computed: {
    ...mapState({
      agents: (state) => state.agents,
      creators: (state) => state.creators
    })
  },
  data() {
    return {
      pageTitle: 'artemis ai - Home',
    }
  }
}
</script>
<style lang="scss" scoped>
.main-wrapper {
    max-width: 1080px;
    padding: 0 20px;
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

</style>
