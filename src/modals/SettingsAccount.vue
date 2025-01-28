<template>
    <h4 class="settings-tab-title">Account</h4>
    <div>
        <div class="flex jc-sb ai-c mb-8">
            <div>Email</div>
            <div class="flex flex-wrap gap-8 ai-c">
                <span class="h-2">{{ user.email }}</span>
                <svg height="16" viewBox="0 0 16 16">
                    <path class="invert-fill-color" d="M8.024,15.5a3.323,3.323,0,0,1-1.344-.282,3.538,3.538,0,0,1-.943-.615,3.928,3.928,0,0,1-.543-.6l0,0c-.106.008-.213.012-.319.012h-.03a4.639,4.639,0,0,1-.612-.041,3.817,3.817,0,0,1-.714-.165,2.754,2.754,0,0,1-1.386-1,3.842,3.842,0,0,1-.549-1.077,3.464,3.464,0,0,1-.163-.932,3.18,3.18,0,0,1,.027-.549A3.971,3.971,0,0,1,.86,9.7a3.507,3.507,0,0,1-.6-.952A3.243,3.243,0,0,1,0,7.39,3.317,3.317,0,0,1,.3,6.071a3.208,3.208,0,0,1,.611-.888,3.378,3.378,0,0,1,.549-.458,4.049,4.049,0,0,1,0-.772A3.493,3.493,0,0,1,1.74,2.892a3.133,3.133,0,0,1,.792-1.081,3.493,3.493,0,0,1,1.2-.7A3.284,3.284,0,0,1,4.787.933h.005a3.163,3.163,0,0,1,.43.03A3.9,3.9,0,0,1,5.725.4,3.513,3.513,0,0,1,6.633-.2,3.268,3.268,0,0,1,7.947-.5h.062a3.139,3.139,0,0,1,1.309.282,3.556,3.556,0,0,1,.919.609,4.093,4.093,0,0,1,.533.588,3.851,3.851,0,0,1,.405-.021H11.2a4.093,4.093,0,0,1,.568.04,3.574,3.574,0,0,1,.651.154,2.986,2.986,0,0,1,1.31.875,3.416,3.416,0,0,1,.841,2.084,3.5,3.5,0,0,1-.026.637,3.779,3.779,0,0,1,.554.486,3.4,3.4,0,0,1,.606.894,3.229,3.229,0,0,1,.03,2.634,3.583,3.583,0,0,1-.606.939,4.145,4.145,0,0,1-.592.548,3.529,3.529,0,0,1,.01.683,3.446,3.446,0,0,1-.235,1,3.491,3.491,0,0,1-.7,1.092,3.2,3.2,0,0,1-2.385,1.014,3.613,3.613,0,0,1-.431-.026,3.41,3.41,0,0,1-.461.56,3.186,3.186,0,0,1-.9.623,3.294,3.294,0,0,1-1.347.3H8.024ZM5.71,12.919l.169.3A1.831,1.831,0,0,0,6,13.408a2.94,2.94,0,0,0,.407.453,2.539,2.539,0,0,0,.676.442,2.326,2.326,0,0,0,.94.2h.051a2.3,2.3,0,0,0,.942-.205,2.184,2.184,0,0,0,.615-.427,2.413,2.413,0,0,0,.349-.433q.028-.044.053-.088v-.53l.628.166a1.43,1.43,0,0,0,.142.03,2.606,2.606,0,0,0,.419.034,2.22,2.22,0,0,0,1.659-.7,2.5,2.5,0,0,0,.5-.781,2.445,2.445,0,0,0,.166-.712,2.532,2.532,0,0,0-.012-.526,1.482,1.482,0,0,0-.034-.185l-.015-.06V9.737l.243-.146a2.017,2.017,0,0,0,.193-.131,3.16,3.16,0,0,0,.457-.422,2.585,2.585,0,0,0,.438-.677A2.176,2.176,0,0,0,15,7.453a2.213,2.213,0,0,0-.2-.9,2.4,2.4,0,0,0-.428-.63,2.785,2.785,0,0,0-.436-.378q-.04-.028-.08-.054h-.525l.179-.636a1.408,1.408,0,0,0,.038-.175,2.515,2.515,0,0,0,.027-.516,2.416,2.416,0,0,0-.6-1.476A1.991,1.991,0,0,0,12.1,2.1a2.581,2.581,0,0,0-.471-.112,3.093,3.093,0,0,0-.429-.03h-.027a2.855,2.855,0,0,0-.548.053l-.349.068L10.1,1.773a1.989,1.989,0,0,0-.126-.19,3.106,3.106,0,0,0-.409-.453A2.557,2.557,0,0,0,8.9.692,2.138,2.138,0,0,0,8.013.5H7.965a2.271,2.271,0,0,0-.914.206A2.513,2.513,0,0,0,6.4,1.14a2.91,2.91,0,0,0-.393.441q-.029.04-.055.08V2.2L5.308,2a1.066,1.066,0,0,0-.124-.03,2.169,2.169,0,0,0-.392-.036H4.787a2.282,2.282,0,0,0-.729.119,2.5,2.5,0,0,0-.861.506,2.13,2.13,0,0,0-.541.735,2.494,2.494,0,0,0-.2.757,3.058,3.058,0,0,0,0,.606,2.024,2.024,0,0,0,.034.228l.011.051V5.3l-.285.136a1.407,1.407,0,0,0-.168.095,2.388,2.388,0,0,0-.421.345,2.206,2.206,0,0,0-.42.61A2.318,2.318,0,0,0,1,7.411v.006a2.246,2.246,0,0,0,.176.946,2.508,2.508,0,0,0,.431.679,2.98,2.98,0,0,0,.452.417q.042.032.086.061h.534l-.2.648a1.056,1.056,0,0,0-.033.14,2.188,2.188,0,0,0-.03.451,2.462,2.462,0,0,0,.116.662,2.845,2.845,0,0,0,.407.8,1.774,1.774,0,0,0,.9.637,2.812,2.812,0,0,0,.525.121,3.639,3.639,0,0,0,.481.032h.03a3.339,3.339,0,0,0,.5-.037Zm1.207-2.435L4.057,7.606l.888-.887L6.917,8.68l3.776-3.741.937.941Z" transform="translate(0 0.5)" :fill="user.verified ? '#0085ff' : '#BCCADD'"/>
                </svg>
            </div>
        </div>
        <div class="flex jc-fe">
            <button-submit
                v-if="!user.verified"
                :classes="'button-primary small fs-08 fw-500'"
                :label="'Verify email'"
                :type="'button'"
                @handle-button-click="handleVerifyEmail"
            />
        </div>
    </div>
    <hr class="w-100">
    <div class="flex jc-sb ai-c">
        <div>Password</div>
        <div class="flex flex-wrap ai-c">
            <button-submit
                :classes="'button-outline default fs-095 fw-500'"
                :label="'Change password'"
                :type="'button'"
                @handle-button-click="handleChangePassword"
            />
        </div>
    </div>
    <hr class="w-100">
    <div class="flex jc-sb ai-c">
        <div>Delete all chats</div>
        <div class="flex flex-wrap">
            <button-submit
                :classes="'button-danger default fs-095 fw-500'"
                :label="'Delete chats'"
                :type="'button'"
                @handle-button-click="deleteAllChats"
            />
        </div>
    </div>
    <hr class="w-100">
    <div class="flex jc-sb ai-c">
        <div>Delete account</div>
        <div class="flex flex-wrap">
            <button-submit
                :classes="'button-danger default fs-095 fw-500'"
                :label="'Delete account'"
                :type="'button'"
                @handle-button-click="deleteAccount"
            />
        </div>
    </div>
</template>

<script>
import ButtonSubmit from '@/components/ButtonSubmit.vue'
export default {
    components: { ButtonSubmit },
    name: 'SettingsAccount',
    props: {
        user: Object
    },
    methods: {
        async deleteAllChats() {
            const body = `
                <div>You are about to delete <strong>all chats</strong> from your history.</div>
                <div>
                    <span class="fs-095">This will also delete all activities like prompts, responses, and feedback from your app.</span>
                </div>
            `
            this.$store.commit('setDeleteModal', { id: null, title: 'Delete all chat history?', type: 'all-chats', body: body })
        },
        async deleteAccount() {
            const body = `
                <div>Are you sure you want to permanently delete this account?</div>
                <div>
                    <span class="fs-095">This action is irreversible and will delete all activities like prompts, responses, and feedback from your app.</span>
                </div>
            `
            this.$store.commit('setDeleteModal', { id: null, title: 'Delete account', type: 'account', body: body })
        },
        handleVerifyEmail() {
            console.log('verify email')
        },
        handleChangePassword() {
            this.$store.commit('setChangePasswordModal', { state: 'default' })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>