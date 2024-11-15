<template>
    <img v-if="user.picture" class="avatar br-50" :src="user.picture" :alt="user.name">
    <div v-else class="centered avatar br-50"><strong>{{ computedInitial }}</strong></div>
</template>

<script>
import userMixin from '@/mixins/userMixin';

export default {
    name: 'ProfileAvatar',
    mixins: [userMixin],
    props: {
        user: Object,
        dimension: Number
    },
    computed: {
        computedDimension() {
            return `${this.dimension}px`
        }
    }
}
</script>

<style lang="scss" scoped>
.avatar {
    height: v-bind(computedDimension);
    width: v-bind(computedDimension);
    color: #fff;
    background-color: v-bind(computedColor);
}

</style>