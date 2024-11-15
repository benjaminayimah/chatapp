<template>
    <button @click="handleDropdown('about_float', null)" id="about_float" class="fixed centered">
        <svg height="14" viewBox="0 0 29.25 29.25">
            <path d="M9003.455,3167.79a14.625,14.625,0,1,1,14.624,14.624A14.623,14.623,0,0,1,9003.455,3167.79Zm5.675-8.952a12.666,12.666,0,1,0,8.949-3.7A12.574,12.574,0,0,0,9009.13,3158.838Zm7.149,14.252a1.51,1.51,0,1,1,1.5,1.449A1.474,1.474,0,0,1,9016.279,3173.09Zm.247-2.677-.022-.605a2.931,2.931,0,0,1,1.659-3.094c1.19-.709,1.688-1.161,1.688-2.031a1.705,1.705,0,0,0-1.891-1.512,1.78,1.78,0,0,0-1.886,1.73h-2.5c.05-2.265,1.724-3.861,4.55-3.861,2.637,0,4.45,1.462,4.45,3.566a3.436,3.436,0,0,1-1.975,3.121c-1.224.71-1.639,1.231-1.639,2.131v.555Z" transform="translate(-9003.455 -3153.164)"/>
        </svg>
    </button>
    <teleport to="body">
        <backdrop @click="handleDropdown('about_float', null)" v-if="dropdownToggle" :opacity="0" :zindex="101" />
        <div v-if="dropdownToggle" class="dropdown fixed">
            <ul>
                <a @click.prevent="" href="#" class="flex ai-c gap-10">
                    <svg viewBox="0 0 14.5 14.5">
                        <path d="M-3437.481-683.708a2,2,0,0,1-2-2v-8.25a2,2,0,0,1,2-2h4.5a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5h-4.5a1,1,0,0,0-1,1v8.25a1,1,0,0,0,1,1h8.249a1,1,0,0,0,1-1v-4.5a.5.5,0,0,1,.5-.5.5.5,0,0,1,.5.5v4.5a2,2,0,0,1-2,2Zm3.4-5.4a.5.5,0,0,1,0-.707l7.4-7.4h-3.293a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5h4.5a.5.5,0,0,1,.243.063h0l.009.005,0,0,.006,0,.006,0,0,0,.008.005h0a.491.491,0,0,1,.074.061.5.5,0,0,1,.146.379v4.475a.5.5,0,0,1-.5.5.5.5,0,0,1-.5-.5V-696.5l-7.4,7.4a.5.5,0,0,1-.354.147A.5.5,0,0,1-3434.085-689.1Z" transform="translate(3439.481 698.208)"/>
                    </svg>
                    About us
                </a>
                <a href="#" class="flex ai-c gap-10">
                    <svg viewBox="0 0 14.5 14.5">
                        <path d="M-3437.481-683.708a2,2,0,0,1-2-2v-8.25a2,2,0,0,1,2-2h4.5a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5h-4.5a1,1,0,0,0-1,1v8.25a1,1,0,0,0,1,1h8.249a1,1,0,0,0,1-1v-4.5a.5.5,0,0,1,.5-.5.5.5,0,0,1,.5.5v4.5a2,2,0,0,1-2,2Zm3.4-5.4a.5.5,0,0,1,0-.707l7.4-7.4h-3.293a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5h4.5a.5.5,0,0,1,.243.063h0l.009.005,0,0,.006,0,.006,0,0,0,.008.005h0a.491.491,0,0,1,.074.061.5.5,0,0,1,.146.379v4.475a.5.5,0,0,1-.5.5.5.5,0,0,1-.5-.5V-696.5l-7.4,7.4a.5.5,0,0,1-.354.147A.5.5,0,0,1-3434.085-689.1Z" transform="translate(3439.481 698.208)"/>
                    </svg>
                    Terms & Conditions
                </a>
                <a href="#" class="flex ai-c gap-10" @click.prevent="">
                    <svg viewBox="0 0 14.5 14.5">
                        <path d="M-3437.481-683.708a2,2,0,0,1-2-2v-8.25a2,2,0,0,1,2-2h4.5a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5h-4.5a1,1,0,0,0-1,1v8.25a1,1,0,0,0,1,1h8.249a1,1,0,0,0,1-1v-4.5a.5.5,0,0,1,.5-.5.5.5,0,0,1,.5.5v4.5a2,2,0,0,1-2,2Zm3.4-5.4a.5.5,0,0,1,0-.707l7.4-7.4h-3.293a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5h4.5a.5.5,0,0,1,.243.063h0l.009.005,0,0,.006,0,.006,0,0,0,.008.005h0a.491.491,0,0,1,.074.061.5.5,0,0,1,.146.379v4.475a.5.5,0,0,1-.5.5.5.5,0,0,1-.5-.5V-696.5l-7.4,7.4a.5.5,0,0,1-.354.147A.5.5,0,0,1-3434.085-689.1Z" transform="translate(3439.481 698.208)"/>
                    </svg>
                    Privacy policy
                </a>
            </ul>
        </div>
    </teleport>
</template>

<script>
import Backdrop from './Backdrop.vue'
import dropdownMixin from '@/mixins/dropdownMixin';
export default {
    name: 'AboutFloat',
    components: { Backdrop },
    mixins: [dropdownMixin],
    data() {
        return {
            dropdownToggle: false,
        }
    }
}
</script>

<style lang="scss" scoped>
button {
    inset: auto 12px 14px auto;
    height: 24px;
    width: 24px;
    padding: 0;
    background-color: var(--main-background-2);
    &:hover {
        background-color: var(--main-background-3);
    }
}

.dropdown {
    width: 200px;
    z-index: 102;
    background-color: var(--modal-main-background);
    bottom: 42px;
    right: 10px;
}
a {
    padding: 5px 16px;
    font-size: .9rem;
    &:hover {
        background-color: var(--modal-close-button-hover);
    }
    svg {
        height: 15px;
        width: 15px;
    }
}

</style>