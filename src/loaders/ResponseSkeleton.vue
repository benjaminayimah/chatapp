<template>
    <div class="skeleton-loader gap-12 flex">
        <div class="avatar br-50 animate-pulse skeleton-surface"></div>
        <div class="res w-100 flex flex-column gap-8">
            <div class="res-1 br-16 animate-pulse skeleton-surface"></div>
            <div class="res-2 br-16 animate-pulse skeleton-surface"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ResponseSkeleton'
}
</script>

<style lang="scss" scoped>

.skeleton-loader {
  opacity: 0.4;
  .avatar {
    height: 38px;
    width: 38px;
  }
  .res-1 {
    height: 38px;
    width: 60%;
  }
  .res-2 {
    height: 60px;
    width: 95%;
  }
}

</style>