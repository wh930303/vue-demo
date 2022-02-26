<template>
  <div :class="[autoHeight ? 'adaptive-pane-auto' : 'adaptive-pane-fix']">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    autoHeight: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped></style>
