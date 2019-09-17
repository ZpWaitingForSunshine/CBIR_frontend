import { logout } from '@/api/user'
import { removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
//   steps: [1, 0, 0, 0, 0], // upload hdr image choose waiting
  step: 0
}

const mutations = {
  SET_STEP: (state, step) => {
    state.step = step
  }
}

const actions = {

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
