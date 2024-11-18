<template>
    <div class="flex flex-column gap-16 ai-c">
        <div class="centered">
            <h4>{{ message.heading }}</h4>
            <p class="text-center">{{ message.body }}</p>
        </div>
       <div v-if="button">
            <button @click="$emit('empty-btn-event')" class="button-primary default fw-600 fs-09 gap-4 ai-c">
                <svg height="14" viewBox="0 0 14 14">
                    <path d="M21.5,15.5h-6v6h-2v-6h-6v-2h6v-6h2v6h6Z" transform="translate(-7.5 -7.5)"/>
                </svg>
                {{ message.buttonText }}
            </button>
       </div>
    </div>
</template>

<script>

export default {
    name: 'EmptyState',
    props: {
        message: Object,
        button: Boolean,
    }
}
</script>

<style lang="scss" scoped>
.flex-column {
    max-width: 420px;
    border: 1px dashed var(--main-background-3);
    border-radius: 12px;
    padding: 24px 32px;
    background-color: var(--main-background-light);
}

</style>