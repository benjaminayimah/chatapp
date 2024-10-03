<template>
    <aside class="flex" :class="menu ? 'expanded' : 'collapsed'">
        <div class="bg-surface-2 flex-1 flex flex-column aside-wrapper">
            
            
        </div>
    </aside>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'SideBar',
    computed: {
        ...mapState({
            menu: (state) => state.DeviceWindow.menu,
            device: (state) => state.DeviceWindow.device
        }),
    }
}
</script>

<style lang="scss" scoped>

aside {
    height: 100vh;
    position: sticky;
    top: 0;
    transition: 0.3s ease-in-out width, 0.3s ease-in-out left;
}
.desktop, .tablet {
    .expanded {
        width: var(--side-bar-full-width);
    }
    .collapsed{
        width: var(--side-bar-mini-width);
    }
}

.mobile {
    aside {
        position: fixed;
        height: 100%;
        width: calc(100vw - 40px);
    }
    .expanded {
       left: 0;
    }
    .collapsed{
       left: calc(-100vw - 40px);
       width: var(--side-bar-mini-width);
    }
}
.aside-wrapper {
    padding: 80px 24px 24px 24px;
}


</style>