<template>
  <ModalComponent>
    <div class="main-text">
      <h1>{{ params.title || 'HelpModal' }}</h1>
    </div>
    <div class="main-text">
      {{ params.message || 'HelpMessage' }}
    </div>
    <button class="close-button" @click="() => $emit('close')">
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
.main-text {
  font-size: 16px;
  text-align: center;
  padding: 20px;
  font-family: @mainFontCourierNew
}
.close-button {
  display: flex;
  margin: 10px auto
}
</style>
