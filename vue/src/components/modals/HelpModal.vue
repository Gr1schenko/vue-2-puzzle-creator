<template>
  <ModalComponent>
    <div class="modal__text">
      <h1>{{ params.title || 'HelpModal' }}</h1>
    </div>
    <div class="modal__text">
      {{ params.message || 'HelpMessage' }}
    </div>
    <button class="modal__close-button" @click="() => $emit('close')">
      Close
    </button>
    <div>
      <button
        v-for="(btn, index) in params.buttons"
        :key="index"
        :type="btn.type || 'default'"
        @click="() => click(btn)"
      >
        {{ btn.text }}
      </button>
    </div>
  </ModalComponent>
</template>

<script>
import ModalComponent from "@/components/parts/Modal";

export default {
  name: "HelpModal",
  components: {
    ModalComponent
  },
  props: {
    params: Object
  },
  methods: {
    click (btn) {
      if (btn.click) {
        this.clickHandler(btn.click)
      }

      if (btn.afterClick) {
        this.clickHandler(btn.afterClick)
      }
    },
    clickHandler (click) {
      if (typeof click === 'string') {
        if (click === 'emitClose') {
          return this.$emit('close')
        }
      }

      return click()
    }
  }
}
</script>

<style scoped lang="less">
.modal {
  &__text {
    font-size: 16px;
    text-align: center;
    padding: 20px;
    font-family: @ffThree
  }
  &__close-button {
    display: flex;
    margin: 10px auto
  }
}
</style>
