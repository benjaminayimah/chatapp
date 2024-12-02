<template>
    <div class="flex flex-column gap-16 ai-c">
        <div class="centered">
            <h4 v-if="message.heading">{{ message.heading }}</h4>
            <p class="text-center">{{ message.body }}</p>
        </div>
       <div v-if="button">
            <button @click="$emit('empty-btn-event')" class="button-primary default fw-600 fs-09 gap-4 ai-c">
                <span v-html="message.icon" class="flex"></span>
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
        button: Boolean
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