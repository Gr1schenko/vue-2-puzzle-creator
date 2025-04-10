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
  updateImage: ({ commit }, url) => {
    commit('setImageUrl', url);
  },
  updatePuzzleCount: ({ commit }, count) => {
    commit('setPuzzleCount', count);
  },
  loadImage: ({ commit }, file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target.result;
      localStorage.setItem('imageUrl', JSON.stringify(imageUrl));
      commit('setImageUrl', imageUrl);
    }
    reader.readAsDataURL(file);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
