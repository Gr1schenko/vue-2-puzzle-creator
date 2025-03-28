<template>
  <PageLayout>
    <div class="main-text">
      <h1 class="main-head">Create your own puzzle</h1>
      <p>On this page you can create a puzzle from any photo from your device</p>
      <div class="main-container">
        <div
          class="upload-box"
          @dragover.prevent="(event) => event.preventDefault()"
          @drop.prevent="(event) => onDrop(event)"
        >
          <label>
            <input
              id="input-image"
              accept=".jpg,.png,.webp"
              type="file"
              name="file"
              @change="(event) => onFileChange(event)"
            >
            <span class="select-input">Select a photo or drag it here</span>
          </label>
        </div>
      </div>
      <div class="main-container">
        <div class="number-box">
          <label>
            <input
              type="number"
              v-model="puzzleSize"
              class="number-input"
              placeholder="Enter number of pieces (e.g., 3x3)"
            >
          </label>
        </div>
        <button class="puzzle-button" @click="() => choosePuzzleSize()">Create</button>
      </div>
      <h1 class="main-head" v-if="imageUrl">Preview:</h1>
      <div class="main-container" v-if="imageUrl">
        <img
          class="preview-image"
          :src="imageUrl"
          alt="Preview Image"
        />
      </div>
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
  created () {
    const savedImageUrl = localStorage.getItem('imageUrl');
    if (savedImageUrl) {
      this.updateImage(JSON.parse(savedImageUrl));
    }
  },
  computed: {
    ...mapGetters('image', [
      'getImageUrl'
    ]),
    imageUrl () {
      return this.getImageUrl;
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
    onFileChange (event) {
      const file = event.target.files[0];
      if (file) {
        this.loadImage(file);
      }
    },
    onDrop (event) {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      if (file) {
        this.loadImage(file);
      }
    },
    choosePuzzleSize () {
      if (this.puzzleSize > 1) {
        const puzzleSizeNumber = parseInt(this.puzzleSize);
        this.updatePuzzleCount(puzzleSizeNumber);
        this.$router.push({ name: ROUTER_NAMES.PUZZLE});
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
.main-text {
  font-size: 16px;
  text-align: center;
  margin-top: 2%;
  font-family: @mainFont
}
.main-head {
  font-size: 32px;
  text-align: center;
  margin-top: 3%;
  font-family: @mainFont
}
.main-container {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-top: 2%
}
.upload-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 100px;
  border: 2px dashed @containerBorder;
  padding: 20px;
  border-radius: 10px;
  background-color: @backgroundContainer
}
.select-input {
  font-size: 16px;
  color: gray;
  width: 100%;
  text-align: center;
  cursor: pointer;
  font-family: @mainFont
}
.upload-box input[id="input-image"] {
  display: none
}
.number-box {
  width: 30%;
  border: @sizeBorderContainer dashed @containerBorder;
  padding: 20px;
  border-radius: 10px;
  background-color: @backgroundContainer
}
.number-input {
  font-size: 16px;
  color: gray;
  width: 100%;
  height: 100%;
  text-align: center;
  border: none;
  outline: none;
  background-color: @backgroundContainer;
  font-family: @mainFont
}
.puzzle-button {
  font-size: 16px;
  color: white;
  width: 10%;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: @puzzleButton;
  cursor: pointer
}
.puzzle-button:hover {
  background-color: @puzzleButtonHover
}
.preview-image {
  width: 43%;
  border: 1px solid @containerBorder;
  border-radius: 5px
}
</style>
