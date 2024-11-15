<template>
    <div class="flex flex-column gap-16 ai-c">
        <div class="centered">
            <h4>{{ heading }}</h4>
            <p class="text-center">{{ body }}</p>
        </div>
       <div v-if="button && auth">
            <button class="button-primary default fw-600 fs-09 gap-4">
                <svg height="14" viewBox="0 0 14 14">
                    <path d="M21.5,15.5h-6v6h-2v-6h-6v-2h6v-6h2v6h6Z" transform="translate(-7.5 -7.5)"/>
                </svg>
                {{ buttonText }}
            </button>
       </div>
    </div>
</template>

<script>
export default {
    name: 'EmptyState',
    props: {
        heading: String,
        body: String,
        button: Boolean,
        buttonText: String,
        auth: Boolean
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