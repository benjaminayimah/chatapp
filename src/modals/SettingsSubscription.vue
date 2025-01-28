<template>
    <h4 class="settings-tab-title">Subscription</h4>
    <div>
        <div class="flex jc-sb ai-c">
            <div>
                <div class="fs-09 h-2">Current plan</div>
                <strong>{{ user.hasUpgraded ? 'Plus' : 'Free'}}</strong>
            </div>
            <div v-if="!user.hasUpgraded" class="flex flex-wrap gap-8 ai-c">
                <button-submit
                    :classes="'button-primary default fs-09 fw-600'"
                    :label="'Upgrade'"
                    :type="'button'"
                    @handle-button-click="handleUpgrade"
                />
            </div>
        </div>
    </div>
</template>

<script>
import ButtonSubmit from '@/components/ButtonSubmit.vue'
export default {
    components: { ButtonSubmit },
    name: 'SettingsSubscription',
    props: {
        user: Object
    },
    methods: {
        handleUpgrade() {
            console.log('upgrade')
        }
    }
}
</script>

<style lang="scss" scoped>

</style>