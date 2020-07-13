import firebase, {database} from 'firebase/app'

export default {
    state: {
        record: {}
      },
      getters: {
        record : s => s.record 
      },
      mutations: {
        setRecord(state, record){
          state.record = record
        },
        clearRecord(state){
            state.record = {} 
        }
      },
    actions: {
        async creatRecord({dispatch, commit}, record){
            try {
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/records`).push(record)
            } catch (error) {
                commit('setError',error )
                throw error
            }
        },
        async fetchRecords({dispatch, commit}){
            try {
                const uid = await dispatch('getUid')
                const records =  (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {}
                return Object.keys(records).map(key => ({...records[key], id:key}))
            } catch (error) {
                commit('setError',error )
                throw error
            }
        },
        async fetchRecordById({dispatch, commit}, id){
            try {
                const uid  = await dispatch ('getUid')
                const record =  (await firebase.database().ref(`/users/${uid}/records`).child(id).once('value')).val() || {}
                commit('setRecord', record)
            } catch (error) {
                commit('setError', error)
                throw error
            }
        },
        async updateRecord({dispatch, commit, getters}, {description, status, id, date}){
            try {
                const uid  = await dispatch ('getUid')
                await firebase.database().ref(`/users/${uid}/records`).child(id).update({description,status,date}) 
                commit('setRecord', {...getters.record, description, status, id, date}) 
            } catch (error) {
                commit('setError', error)
                throw error
            }
        },
        async deleteRecordById({dispatch},id){
            const uid  = await dispatch ('getUid')
            await firebase.database().ref(`/users/${uid}/records`).child(id).remove()   

        }
    }
}