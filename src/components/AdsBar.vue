<template>
    <div class="sticky ads-bar">
        <div class="pl-16 pr-16 flex jc-sb ai-c ad-inner">
            <div class="flex-1 flex gap-16 ai-c jc-c">
                <div>Upgrade now to access advanced features</div>
                <button-submit
                    :classes="'button-primary small fs-08 fw-600'"
                    :content="'Upgrade'"
                    :type="'button'"
                />
            </div>
            <button-close
                :classes="'transparent-button ai-c jc-c'"
                :height="30"
                @handle-close-event="dismissAd"
            />
        </div>
        <!-- @handle-button-click="signUp" -->
    </div>
</template>

<script>
import ButtonClose from './ButtonClose.vue'
import ButtonSubmit from './ButtonSubmit.vue'
export default {
    components: { ButtonSubmit, ButtonClose },
    methods: {
        dismissAd() {
            this.$store.commit('dismissAd')
        }
    }
}
</script>

<style lang="scss" scoped>
.sticky {
    top: var(--header-height);
}
.ads-bar {
    z-index: 50;
    // background-color: #03325d;
    background: linear-gradient(150deg,  #0085ff,#BA62FC,#F2416B);
}
.ad-inner {
    min-height: 40px;
    color: #fff;
}

</style>