import { createStore } from 'vuex'
import router from '../router'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'

export default createStore({
    state: { 
        user: null,
        fetched: false
    },
    mutations: {
        SET_USER (state, user) {
            state.user = user
            state.fetched = true
        },
        CLEAR_USER (state) {
            state.user = null
            state.fetched = true
        }
    },
    actions: {
        async login ({ commit }, details) {
            const { email, password } = details
            try {
                await signInWithEmailAndPassword(auth, email, password)
            } catch (error) {
                switch(error.code) {
                    case 'auth/user-not-found':
                        return "Utilisateur introuvable"
                    case 'auth/wrong-password':
                        return "Mot de passe erroné"
                    default: 
                        return "Une erreur est survenue"
                }
            }
            commit('SET_USER', auth.currentUser)
            router.push('/dashboard')
        },
        async register ({ commit}, details) {
            const { email, password } = details
            try {
                await createUserWithEmailAndPassword(auth, email, password)
            } catch (error) {
                switch(error.code) {
                    case 'auth/email-already-in-use':
                      return 'Adresse email utilisée'
                    case 'auth/invalid-email':
                        return 'Email invalide'
                    case 'auth/operation-not-allowed':
                        return 'Operation non autorisée'
                    case 'auth/weak-password':
                        return 'Mot de passe faible'
                    default:
                        return 'Une erreur est survenue'
                }
            }
            commit('SET_USER', auth.currentUser)
            router.push('/dashboard')
        },
        async logout ({ commit }) {
            await signOut(auth)
            commit('CLEAR_USER')
            router.push('/')
        },
        fetchUser ({ commit }) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    commit('SET_USER', user)
                    if (router.isReady() && router.currentRoute.value.path === '/login') router.push('/dashboard')
                } else {
                    commit('CLEAR_USER')
                }
            })
        }
    }
})