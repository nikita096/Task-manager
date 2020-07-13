import firebase, {database} from 'firebase/app'
export default {
    actions: {
        async registration({dispatch, commit}, {email, password, name}){
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/info`).set({
                    name: name
                })
            } catch (error) {
                commit('setError', error)
                throw error
            }
        },
        getUid(){
            const user = firebase.auth().currentUser
            return user ? user.uid : null
        },
        async login({dispatch, commit}, {email, password}){
            try {
                await firebase.auth().signInWithEmailAndPassword( email, password)
           } catch (e){
               commit('setError', e)
               throw e
           }
        },
        async logout({commit}){
            await firebase.auth().signOut()
            commit('clearInfo')
        }
    }
}