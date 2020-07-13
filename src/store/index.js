import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import record from './record'
Vue.use(Vuex)

import firebase  from 'firebase/app'
export default new Vuex.Store({
    state: {
      error: null,
      info : {}
    },
    getters: {
      error: s =>s.error,
      info : s => s.info 
    },
    mutations: {
      setError (state, error){
        state.error = error
        
      },
      clearError(state){
        state.error = null
      },
      setInfo(state, info){
        state.info = info
      },
      clearInfo (state){
          state.info = {} 
      }
    },
    actions: {
      async fetchInfo({dispatch, commit}){
        try {
            const uid = await dispatch('getUid')
            const info = (await firebase.database().ref(`users/${uid}/info`).once('value')).val()
            commit('setInfo', info)
        } catch (error) {
            commit('setError', error)
            throw error
        }  
      },
      async updateInfo({dispatch, commit, getters}, toUpdate){
        try {
            const uid = await dispatch('getUid')
            const updateData = {...getters.info, ...toUpdate}
            await firebase.database().ref(`/users/${uid}/info`).update(updateData)
            commit('setInfo', updateData)
        } catch (error) {
            commit('setError', error)
            throw error
        }
      }
    },
    modules: {
      auth, record
    }
})
