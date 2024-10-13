<template>
    <div class="tooltip-wrapper" @mouseenter="showTooltip" @mouseleave="hideTooltip" @focus="showTooltip" @blur="hideTooltip">
      <!-- The element the tooltip is attached to (trigger element) -->
      <slot></slot>
  
      <!-- Tooltip content -->
      <div v-if="isVisible" :class="['tooltip-box', position]" :style="tooltipStyle">
        <slot name="content">{{ text }}</slot>
        <div class="tooltip-arrow" :class="position"></div>
      </div>
    </div>
</template>
  
<script>
  export default {
    name: 'ToolTip',
    props: {
      text: {
        type: String,
        default: ''
      },
      position: {
        type: String,
        default: 'top', // default position
        validator: value => ['top', 'bottom', 'left', 'right'].includes(value)
      }
    },
    data() {
      return {
        isVisible: false,
        tooltipStyle: {
          top: '0px',
          left: '0px'
        }
      };
    },
    methods: {
      showTooltip() {
        this.isVisible = true;
        this.$nextTick(() => this.setPosition());
      },
      hideTooltip() {
        this.isVisible = false;
      },
      setPosition() {
        const tooltip = this.$el.querySelector('.tooltip-box');
        const trigger = this.$el;
        const triggerRect = trigger.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
  
        let top, left;
        switch (this.position) {
          case 'top':
            top = triggerRect.top - tooltipRect.height - 8;
            left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
            break;
          case 'bottom':
            top = triggerRect.bottom + 8;
            left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
            break;
          case 'left':
            top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
            left = triggerRect.left - tooltipRect.width - 8;
            break;
          case 'right':
            top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
            left = triggerRect.right + 8;
            break;
        }
  
        this.tooltipStyle = {
          top: `${top + window.scrollY}px`,
          left: `${left + window.scrollX}px`
        };
      }
    }
};
</script>

<style scoped>
.tooltip-wrapper {
    position: relative;
    display: inline-block;
}

.tooltip-box {
    position: absolute;
    background-color: #333;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    z-index: 10000;
    transition: opacity 0.3s ease;
    opacity: 1;
}

.tooltip-box.top {
    transform: translateY(-100%);
}
.tooltip-box.bottom {
    transform: translateY(100%);
}
.tooltip-box.left {
    transform: translateX(-100%);
}
.tooltip-box.right {
    transform: translateX(100%);
}

.tooltip-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
}

.tooltip-arrow.top {
    border-width: 5px 5px 0 5px;
    border-color: #333 transparent transparent transparent;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
}
.tooltip-arrow.bottom {
    border-width: 0 5px 5px 5px;
    border-color: transparent transparent #333 transparent;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
}
.tooltip-arrow.left {
    border-width: 5px 0 5px 5px;
    border-color: transparent transparent transparent #333;
    top: 50%;
    right: -5px;
    transform: translateY(-50%);
}
.tooltip-arrow.right {
    border-width: 5px 5px 5px 0;
    border-color: transparent #333 transparent transparent;
    top: 50%;
    left: -5px;
    transform: translateY(-50%);
}
</style>
  