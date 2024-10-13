<template>
    <div v-html="formatChat(chat, index)"></div>
</template>

<script>
export default {
    name: 'ResponseRow',
    props: {
        chat: Object,
        index: Number
    },
    methods: {
        formatChat(chat, index) {
            if (chat.role === 'user') {
                return `
                <div id="user_res_container_${index}" class="flex flex-column gap-8 ai-fe">
                    <div id="prompt_${index}" class="prompt-image-container flex"></div>
                    <div class="flex w-100 res-block ${chat.role}-response"><div>${chat.formattedText}</div></div>
                </div>
                    `
            } else {
                return `<div id="model_res_container_${index}" class="flex res-block ${chat.role}-response">
                        <div class="${chat.role}-avatar centered">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28" viewBox="0 0 28 28">
                                <defs>
                                    <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                                    <stop offset="0" stop-color="#0fa3eb"/>
                                    <stop offset="1" stop-color="#ca3de3"/>
                                    </linearGradient>
                                </defs>
                                <path id="Path_2599" data-name="Path 2599" d="M14,28a13.448,13.448,0,0,0-1.12-5.46A13.9,13.9,0,0,0,9.9,18.095,13.9,13.9,0,0,0,5.46,15.12,13.449,13.449,0,0,0,0,14a13.823,13.823,0,0,0,5.46-1.085A14.385,14.385,0,0,0,9.9,9.9,13.9,13.9,0,0,0,12.88,5.46,13.449,13.449,0,0,0,14,0a13.823,13.823,0,0,0,1.085,5.46A14.385,14.385,0,0,0,18.095,9.9a14.386,14.386,0,0,0,4.445,3.01A13.823,13.823,0,0,0,28,14a13.448,13.448,0,0,0-5.46,1.12,13.9,13.9,0,0,0-4.445,2.975,14.386,14.386,0,0,0-3.01,4.445A13.823,13.823,0,0,0,14,28Z" fill="url(#linear-gradient)"/>
                            </svg>
                        </div>
                    <div class="flex flex-column gap-24">
                        <div>
                            ${chat.formattedText}
                        </div>
                        <div id="response_footer_${index}" class="flex gap-4 res-footer">
                            <button id="res_audio_btn_${index}" class="transparent-button res-footer-btn">
                               <svg xmlns="http://www.w3.org/2000/svg" height="16.495" viewBox="0 0 16.91 16.495">
                                    <path d="M9.6,4.558a.43.43,0,0,0-.72-.317l-3,2.747a.86.86,0,0,1-.581.226H3.579a.86.86,0,0,0-.86.86v5.157a.86.86,0,0,0,.86.86H5.3a.859.859,0,0,1,.581.226l3,2.747a.43.43,0,0,0,.72-.317ZM7.714,2.974a2.149,2.149,0,0,1,3.6,1.584V16.747a2.149,2.149,0,0,1-3.6,1.584L4.963,15.81H3.579A2.579,2.579,0,0,1,1,13.231V8.074A2.579,2.579,0,0,1,3.579,5.5H4.963ZM15.6,5.8a.859.859,0,0,1,1.165.345,9.469,9.469,0,0,1,.051,8.915.86.86,0,1,1-1.52-.8,7.75,7.75,0,0,0-.042-7.292A.86.86,0,0,1,15.6,5.8ZM12.721,7.129a.859.859,0,0,1,1.2.171,5.589,5.589,0,0,1,.205,6.413.86.86,0,1,1-1.438-.943,3.87,3.87,0,0,0-.142-4.438A.86.86,0,0,1,12.721,7.129Z" transform="translate(-1 -2.405)" fill="#fff" fill-rule="evenodd"/>
                                </svg>
                            </button>
                            <button id="res_copy_btn_${index}" class="transparent-button res-footer-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17">
                                    <path d="M-3078.8-679.218a2.394,2.394,0,0,1-2.392-2.391v-7.479a2.394,2.394,0,0,1,2.392-2.391h7.478a2.393,2.393,0,0,1,2.391,2.391v7.479a2.393,2.393,0,0,1-2.391,2.391Zm-.933-9.869v7.479a.934.934,0,0,0,.933.933h7.478a.934.934,0,0,0,.933-.933v-7.479a.934.934,0,0,0-.933-.933h-7.478A.934.934,0,0,0-3079.732-689.088Zm-3.474,7.3a2.727,2.727,0,0,1-2.725-2.724v-8.978a2.706,2.706,0,0,1,.8-1.926,2.706,2.706,0,0,1,1.926-.8h8.978a2.727,2.727,0,0,1,2.724,2.724v1a.729.729,0,0,1-.729.729.73.73,0,0,1-.729-.729v-1a1.267,1.267,0,0,0-1.266-1.266h-8.978a1.257,1.257,0,0,0-.895.371,1.256,1.256,0,0,0-.372.9v8.978a1.267,1.267,0,0,0,1.266,1.265h1a.729.729,0,0,1,.729.73.729.729,0,0,1-.729.729Z" transform="translate(3085.931 696.218)" fill="#fff"/>
                                </svg>
                            </button>
                            <button id="res_share_btn_${index}" class="transparent-button res-footer-btn">
                             <svg xmlns="http://www.w3.org/2000/svg" width="14.695" height="17" viewBox="0 0 14.695 17">
                                <path d="M-3108.6-693.224a2.673,2.673,0,0,1-2.67-2.67,2.683,2.683,0,0,1,.075-.632l-5.614-2.959a2.651,2.651,0,0,1-1.146.258,2.674,2.674,0,0,1-2.671-2.671,2.673,2.673,0,0,1,2.671-2.67,2.676,2.676,0,0,1,1.68.6l4.986-2.91a.786.786,0,0,1,.094-.047,2.667,2.667,0,0,1-.074-.625,2.672,2.672,0,0,1,2.669-2.669,2.672,2.672,0,0,1,2.669,2.669,2.672,2.672,0,0,1-2.669,2.669,2.658,2.658,0,0,1-1.822-.721.807.807,0,0,1-.087.059l-4.895,2.857a2.681,2.681,0,0,1,.119.792,2.673,2.673,0,0,1-.335,1.292l5.21,2.747a2.652,2.652,0,0,1,1.809-.7,2.673,2.673,0,0,1,2.67,2.67A2.673,2.673,0,0,1-3108.6-693.224Zm-.961-3.251a1.117,1.117,0,0,0-.162.581,1.125,1.125,0,0,0,1.123,1.123,1.125,1.125,0,0,0,1.123-1.123,1.125,1.125,0,0,0-1.123-1.123,1.118,1.118,0,0,0-.956.533Zm-8.393-6.547a1.125,1.125,0,0,0-1.124,1.123,1.126,1.126,0,0,0,1.124,1.124,1.112,1.112,0,0,0,.655-.211l.021-.015a1.115,1.115,0,0,0,.448-.9,1.115,1.115,0,0,0-.208-.651h0A1.127,1.127,0,0,0-3117.953-703.022Zm9.355-5.656a1.124,1.124,0,0,0-1.122,1.122,1.124,1.124,0,0,0,1.122,1.122,1.124,1.124,0,0,0,1.123-1.122A1.124,1.124,0,0,0-3108.6-708.678Z" transform="translate(3120.624 710.224)" fill="#fff"/>
                            </svg>
                            </button>
                        </div>
                    </div>
                </div>`
            }
        },
        setEvents() {
            if(this.chat.role === 'model') {
                let copyBtn = document.querySelector(`#res_copy_btn_${this.index}`)
                let audioBtn = document.querySelector(`#res_audio_btn_${this.index}`)
                let shareBtn = document.querySelector(`#res_share_btn_${this.index}`)

                copyBtn.addEventListener('click', () => {
                    this.copyResponse(this.index)
                });
                audioBtn.addEventListener('click', () => {
                    this.playAudio(this.index)
                });
                shareBtn.addEventListener('click', () => {
                    this.shareResponse(this.index)
                });
            }
        },
        copyResponse(index) {
            console.log(`${index} Copied!`)
        },
        playAudio(index) {
            console.log(`${index} Playing!`)
        },
        shareResponse(index) {
            console.log(`${index} Shared!`)
        }
    },
    mounted() {
        this.setEvents()
    }
}
</script>

<style lang="scss" scoped>

</style>