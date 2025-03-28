import image from './image'

const state = {
  puzzlePieces: [],
  maxPuzzleContainerWidth: 1000,
  maxPuzzleContainerHeight: 600,
  puzzleContainerWidth: 0,
  puzzleContainerHeight: 0
}

const getters = {
  getPuzzlePieces: state => state.puzzlePieces,
  getPuzzleContainerWidth: state => state.puzzleContainerWidth,
  getPuzzleContainerHeight: state => state.puzzleContainerHeight
}

const mutations = {
  setPuzzlePieces: (state, pieces) => {
    state.puzzlePieces = pieces;
  },
  setPuzzleContainerWidth: (state, width) => {
    state.puzzleContainerWidth = width;
  },
  setPuzzleContainerHeight: (state, height) => {
    state.puzzleContainerHeight = height;
  }
}

const actions = {
  initializePuzzle: ({ commit, state }) => new Promise((resolve, reject) => {
    const size = image.state.puzzleCount;
    const img = new Image();
    img.src = image.state.imageUrl;
    img.onload = () => {
      const imgAspectRatio = img.width / img.height;
      const containerAspectRatio = state.maxPuzzleContainerWidth / state.maxPuzzleContainerHeight;
      let containerWidth, containerHeight;
      if (imgAspectRatio > containerAspectRatio) {
        containerWidth = state.maxPuzzleContainerWidth;
        containerHeight = Math.min(state.maxPuzzleContainerHeight, state.maxPuzzleContainerWidth / imgAspectRatio);
      } else {
        containerHeight = state.maxPuzzleContainerHeight;
        containerWidth = Math.min(state.maxPuzzleContainerWidth, state.maxPuzzleContainerHeight * imgAspectRatio);
      }
      const pieceWidth = containerWidth / size;
      const pieceHeight = containerHeight / size;
      const pieces = [];
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const correctX = x * pieceWidth;
          const correctY = y * pieceHeight;
          pieces.push({
            src: image.state.imageUrl,
            x: Math.random() * (containerWidth - pieceWidth),
            y: Math.random() * (containerHeight - pieceHeight),
            initialX: x * pieceWidth,
            initialY: y * pieceHeight,
            correctX: correctX,
            correctY: correctY,
            width: pieceWidth,
            height: pieceHeight,
          })
        }
      }
      commit('setPuzzlePieces', pieces);
      commit('setPuzzleContainerWidth', containerWidth);
      commit('setPuzzleContainerHeight', containerHeight);
      resolve();
    }
    img.onerror = (error) => {
      reject(error);
    }
  })
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
  modules: {
    image
  }
}
