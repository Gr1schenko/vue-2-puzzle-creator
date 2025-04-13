<template>
  <PageLayout>
    <h1 class="home__head">Create your own puzzle</h1>
    <p class="home__text">On this page you can create a puzzle from any photo from your device</p>
    <div class="home">
      <div
          class="home__upload"
          @dragover.prevent="(event) => event.preventDefault()"
          @drop.prevent="(event) => onFileSelection(event)"
      >
        <label>
          <input
              id="input-image"
              accept=".jpg,.png,.webp"
              type="file"
              name="file"
              :style="{display: 'none'}"
              @change="(event) => onFileSelection(event)"
          >
          <span class="home__upload__input">Select a photo or drag it here</span>
        </label>
      </div>
    </div>
    <div class="home">
      <div class="home__number">
        <label>
          <input
              v-model="puzzleSize"
              type="number"
              class="home__number__input"
              placeholder="Enter number of pieces (e.g., 3x3)"
          >
        </label>
      </div>
      <button
          class="home__create-button"
          @click="() => choosePuzzleSize()"
      >
        Create
      </button>
    </div>
    <h1
        v-if="getImageUrl"
        class="home__head"
    >
      Preview:
    </h1>
    <div
        v-if="getImageUrl"
        class="home"
    >
      <img
          :src="getImageUrl"
          class="home__preview"
          alt="Preview Image"
      />
    </div>
  </PageLayout>
</template>

<script>
import PageLayout from '../parts/PageLayout'
import { ROUTER_NAMES } from "@/router/routes";
import { mapGetters, mapActions, mapMutations } from "vuex";
import HelpModal from "@/components/modals/HelpModal.vue";

export default {
  name: ROUTER_NAMES.HOME,
  components: {
    PageLayout,
  },
  data () {
    return {
      puzzleSize: null,
    }
  },
  computed: {
    ...mapGetters('image', [
      'getImageUrl'
    ])
  },
  created () {
    const savedImageUrl = localStorage.getItem('imageUrl');
    if (savedImageUrl) {
      this.updateImage(JSON.parse(savedImageUrl))
    }
  },
  methods: {
    ...mapActions('image', [
      'updateImage',
      'updatePuzzleCount',
      'loadImage'
    ]),
    ...mapMutations('modals', [
      'openModal'
    ]),
    onFileSelection (event) {
      let file
      if (event.target.files) {
        file = event.target.files[0]
      } else if (event.dataTransfer) {
        file = event.dataTransfer.files[0]
      }
      this.loadImage(file)
    },
    choosePuzzleSize () {
      if (this.puzzleSize > 1) {
        const puzzleSizeNumber = parseInt(this.puzzleSize)
        this.updatePuzzleCount(puzzleSizeNumber)
        this.$router.push({ name: ROUTER_NAMES.PUZZLE})
      } else {
        this.openModal({
          component: HelpModal,
          params: {
            title: 'Warning',
            message: 'Enter the correct number of puzzles (more than 1)'
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.home {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  &__head {
    font-size: 32px;
    text-align: center;
    margin-top: 30px;
    font-family: @ffThree;
  }
  &__text {
    font-size: 16px;
    text-align: center;
    margin-top: 20px;
    font-family: @ffThree;
  }
  &__upload {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    border: 2px dashed @cBorderOne;
    padding: 5% 3%;
    border-radius: 10px;
    background-color: @cBaseOne;
    &__input {
      font-size: 16px;
      color: gray;
      width: 100%;
      cursor: pointer;
      font-family: @ffThree;
    }
  }
  &__number {
    width: 30%;
    border: 2px dashed @cBorderOne;
    padding: 2% 3%;
    border-radius: 10px;
    background-color: @cBaseOne;
    &__input {
      width: 100%;
      border: none;
      outline: none;
      text-align: center;
      font-size: 16px;
      color: gray;
      background-color: @cBaseOne;
      font-family: @ffThree;
    }
  }
  &__preview {
    width: 46%;
    border: 1px solid @cBorderOne;
    border-radius: 10px;
  }
  &__create-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10%;
    padding: 2% 3%;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    color: white;
    background-color: #7C7C7C;
    &:hover {
      background-color: #707070;
    }
  }
}
</style>
