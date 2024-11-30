<template>
    <div class="flex ai-c flex-column gap-4">
        <div class="br-50 animate-pulse skeleton-surface" style="height: 80px; width: 80px;"></div>
        <p class="br-24 animate-pulse skeleton-surface" style="height: 20px; width: 240px; margin-top: 4px;"></p>
        <p class="br-32 animate-pulse skeleton-surface" style="height: 12px; width: 150px; margin-top: 4px;"></p>
        <p class="br-24 animate-pulse skeleton-surface" style="height: 15px; width: 250px; margin-top: 4px;"></p>
    </div>
</template>
<script>
export default {
    name: 'AgentPageSkeleton'
}
</script>