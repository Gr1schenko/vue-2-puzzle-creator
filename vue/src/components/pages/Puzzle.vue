<template>
  <PageLayout>
    <div class="main-text">
      <h1 class="main-head">This is your puzzle</h1>
      <div class="puzzle-container">
        <div class="puzzle-box" :style="containerStyle">
          <div
            v-for="(piece, index) in pieces"
            :key="piece.id"
            class="puzzle-piece"
            :style="getPieceStyle(piece)"
            @mousedown="(event) => startDrag(event, index)"
          >
            <div :style="getPieceBackgroundStyle(piece)">
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

<script>
import PageLayout from '../parts/PageLayout'
import { ROUTER_NAMES } from "@/router/routes";
import { mapGetters, mapMutations, mapActions } from "vuex";
import HelpModal from "@/components/modals/HelpModal.vue";

export default {
  name: ROUTER_NAMES.PUZZLE,
  components: {
    PageLayout
  },
  data () {
    return {
      isDragging: false,
      dragIndex: null,
      offset: { x: 0, y: 0 },
    }
  },
  computed: {
    ...mapGetters('puzzle', [
      'getPuzzlePieces',
      'getPuzzleContainerWidth',
      'getPuzzleContainerHeight'
    ]),
    pieces () {
      return this.getPuzzlePieces;
    },
    containerStyle () {
      return {
        width: this.getPuzzleContainerWidth + 'px',
        height: this.getPuzzleContainerHeight + 'px',
      }
    }
  },
  mounted () {
    this.initializePuzzle();
    window.addEventListener('mouseup', this.stopDrag);
    window.addEventListener('mousemove', this.onMouseMove);
  },
  beforeDestroy () {
    window.removeEventListener('mouseup', this.stopDrag);
    window.removeEventListener('mousemove', this.onMouseMove);
  },
  methods: {
    ...mapMutations('puzzle', [
      'setPuzzlePieces'
    ]),
    ...mapMutations('modals', [
      'openModal'
    ]),
    ...mapActions('puzzle', [
      'initializePuzzle'
    ]),
    getPieceStyle (piece) {
      return {
        left: piece.x + 'px',
        top: piece.y + 'px',
        width: piece.width + 'px',
        height: piece.height + 'px',
        position: 'absolute',
      }
    },
    getPieceBackgroundStyle (piece) {
      return {
        backgroundImage: 'url(' + piece.src + ')',
        backgroundPosition: '-' + piece.initialX + 'px -' + piece.initialY + 'px',
        backgroundSize: this.getPuzzleContainerWidth + 'px ' + this.getPuzzleContainerHeight + 'px',
        width: '100%',
        height: '100%',
      }
    },
    startDrag (event, index) {
      this.isDragging = true;
      this.dragIndex = index;
      this.offset.x = event.clientX - this.getPuzzlePieces[index].x;
      this.offset.y = event.clientY - this.getPuzzlePieces[index].y;
    },
    stopDrag () {
      if (this.isDragging && this.dragIndex !== null) {
        const piece = this.getPuzzlePieces[this.dragIndex];
        const cellWidth = piece.width;
        const cellHeight = piece.height;
        const cellX = Math.round(piece.x / cellWidth) * cellWidth;
        const cellY = Math.round(piece.y / cellHeight) * cellHeight;
        let isBusy = false;
        for (let i = 0; i < this.getPuzzlePieces.length; i++) {
          if (
              i !== this.dragIndex &&
              this.getPuzzlePieces[i].x === cellX &&
              this.getPuzzlePieces[i].y === cellY
          ) {
            isBusy = true;
            break;
          }
        }
        if (!isBusy) {
          piece.x = cellX;
          piece.y = cellY;
        }
        this.setPuzzlePieces([...this.getPuzzlePieces]);
        this.checkIfPuzzleIsSolved();
      }
      this.isDragging = false;
      this.dragIndex = null;
    },
    onMouseMove (event) {
      if (this.isDragging && this.dragIndex !== null) {
        const piece = this.getPuzzlePieces[this.dragIndex];
        const newX = event.clientX - this.offset.x;
        const newY = event.clientY - this.offset.y;
        piece.x = Math.max(0, Math.min(newX, this.getPuzzleContainerWidth - piece.width));
        piece.y = Math.max(0, Math.min(newY, this.getPuzzleContainerHeight - piece.height));
        this.setPuzzlePieces([...this.getPuzzlePieces]);
      }
    },
    checkIfPuzzleIsSolved () {
      const pieces = this.getPuzzlePieces;
      if (pieces.length > 0) {
        let isSolved = true;
        for (const piece of pieces) {
          if ((Math.abs(piece.x - piece.correctX) !== 0) || (Math.abs(piece.y - piece.correctY) !== 0)) {
            isSolved = false;
            break;
          }
        }
        if (isSolved) {
          this.openModal({
            component: HelpModal,
            params: {
              title: 'Congratulate',
              message: 'You completed the puzzle'
            }
          })
        }
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
.puzzle-container {
  display: flex;
  justify-content: center;
  margin-top: 20px
}
.puzzle-box {
  position: relative;
  border: @sizeBorderContainer solid @containerBorder;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible
}
.puzzle-piece {
  user-select: none;
  border: @sizeBorderDefault solid @pieceBorder;
  overflow: hidden
}
</style>
