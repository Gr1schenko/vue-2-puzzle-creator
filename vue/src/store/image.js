const state = {
  imageUrl: '',
  puzzleCount: 0
}

const getters = {
  getImageUrl: state => state.imageUrl
}

const mutations = {
  setImageUrl: (state, url) => {
    state.imageUrl = url
  },
  setPuzzleCount: (state, count) => {
    state.puzzleCount = count
  }
}

const actions = {
  updateImage: ({ commit }, url) => new Promise((resolve, reject) => {
    try {
      commit('setImageUrl', url);
      resolve();
    } catch (error) {
      reject(error);
    }
  }),
  updatePuzzleCount: ({ commit }, count) => new Promise((resolve, reject) => {
    try {
      commit('setPuzzleCount', count);
      resolve();
    } catch (error) {
      reject(error);
    }
  }),
  loadImage: ({ commit }, file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target.result;
      localStorage.setItem('imageUrl', JSON.stringify(imageUrl));
      commit('setImageUrl', imageUrl);
      resolve();
    }
    reader.onerror = (error) => {
      reject(error);
    }
    reader.readAsDataURL(file);
  })
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
