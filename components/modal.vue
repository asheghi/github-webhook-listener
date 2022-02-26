<template>
  <div class="Modal">
    <transition name="fade">
      <div
        v-if="open"
        class="modal-fullscreen"
        @click.stop.prevent="outSideClicked"
      >
        <div class="modal-box" @click.stop>
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Modal",
  components: { },
  props: {
    closeOnClickOutside: {
      type: Boolean,
      default: true,
      required: false,
    },
    title:{
      type:String,
      default: null,
    }
  },
  emits: ["onClose"],
  data() {
    return {
      open: false,
    };
  },
  methods: {
    show() {
      this.open = true;
    },
    outSideClicked() {
      if (!this.closeOnClickOutside) return;
      this.hide();
    },
    hide() {
      this.open = false;
      this.$emit("onClose");
    },
  },
};
</script>

<style lang="scss">
.Modal {
  transition: all ease 360ms;

  .modal-fullscreen {
    @apply fixed inset-0 w-full h-screen overflow-hidden;
    z-index: 9999;
    @apply w-full h-full flex justify-center items-center;
    background: rgba(black, 0.1);
    backdrop-filter: blur(1px);

    .modal-box {
      .close-icon {
        @apply absolute top-1 right-1 cursor-pointer;
      }
      @apply relative bg-white px-4 py-6 rounded-xl shadow-xl;
      max-height: 80vh;
      overflow-y: auto;
      max-width: 90vw;
      overflow-x: auto;
    }
  ;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
