<template>
  <PageLayout>
    <h1 class="main-head">Create your own puzzle</h1>
    <p class="main-text">On this page you can create a puzzle from any photo from your device</p>
    <div class="home">
      <div
        class="upload-container"
        @dragover.prevent="(event) => event.preventDefault()"
        @drop.prevent="(event) => onDrop(event)"
      >
        <label>
          <input
            id="input-image"
            accept=".jpg,.png,.webp"
            type="file"
            name="file"
            :style="{display: 'none'}"
            @change="(event) => onFileChange(event)"
          >
          <span class="upload-container__input">Select a photo or drag it here</span>
        </label>
      </div>
    </div>
    <div class="home">
      <div class="number-container">
        <label>
          <input
            v-model="puzzleSize"
            type="number"
            class="number-container__input"
            placeholder="Enter number of pieces (e.g., 3x3)"
          >
        </label>
      </div>
      <button
        class="create-button"
        @click="() => choosePuzzleSize()"
      >
        Create
      </button>
    </div>
    <h1
      v-if="imageUrl"
      class="main-head"
    >
      Preview:
    </h1>
    <div
      v-if="imageUrl"
      class="home"
    >
      <img
        :src="imageUrl"
        class="preview-image"
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
  margin-top: 20px;
  font-family: @mainFontCourierNew
}
.main-head {
  font-size: 32px;
  text-align: center;
  margin-top: 30px;
  font-family: @mainFontCourierNew
}
.home {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-top: 20px;
  .upload-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    height: 100px;
    border: @sizeBorderMainContainer dashed @mainContainerBorder;
    padding: 20px;
    border-radius: 10px;
    background-color: @backgroundMainContainer;
    .upload-container__input {
      font-size: 16px;
      color: gray;
      width: 100%;
      text-align: center;
      cursor: pointer;
      font-family: @mainFontCourierNew
    }
  }
  .number-container {
    width: 30%;
    border: @sizeBorderMainContainer dashed @mainContainerBorder;
    padding: 20px;
    border-radius: 10px;
    background-color: @backgroundMainContainer;
    .number-container__input {
      font-size: 16px;
      color: gray;
      width: 100%;
      height: 100%;
      text-align: center;
      border: none;
      outline: none;
      background-color: @backgroundMainContainer;
      font-family: @mainFontCourierNew
    }
  }
  .preview-image {
    width: 43%;
    border: @sizeBorderDefault solid @mainContainerBorder;
    border-radius: 10px
  }
}
.create-button {
  font-size: 16px;
  color: white;
  width: 10%;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: @createButton;
  cursor: pointer;
  .create-button:hover {
    background-color: @createButtonHover;
  }
}
</style>
