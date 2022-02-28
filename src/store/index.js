import { createStore } from 'vuex'

// Required Imports
import router from '../router'
import { auth } from '../firebase'

// Firebase Auth functions
import { createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut } from 'firebase/auth'

export default createStore({
    state: { 
        user: null, // Auth.currentUser or null if no user
        fetched: false // Return true if user has been initialized, return false if not
        // Permits to avoid redirection if the user is logged in but refreshing his page
        // Ex. : Without that, when you were refreshing page, the logged in user was redirected to login page then to dashboard page
    },
    mutations: {
        SET_USER (state, user) {
            state.user = user
            state.fetched = true
        }, // We define state.user to user & state.fetched because a user is logging in
        CLEAR_USER (state) {
            state.user = null
            state.fetched = true
        } // We define state.user to null & state.fetched to true because there is no user or someone is disconnecting
    },
    actions: {
        // Login Function
        async login ({ commit }, details) {
            const { email, password } = details
            try {
                await signInWithEmailAndPassword(auth, email, password)
            } catch (error) {
                // Managing Errors
                switch(error.code) {
                    case 'auth/user-not-found':
                        return "Utilisateur introuvable"
                    case 'auth/wrong-password':
                        return "Mot de passe erroné"
                    default: 
                        return "Une erreur est survenue"
                }
            }
            commit('SET_USER', auth.currentUser) // User is logged in, so we store it...
            router.push('/dashboard') // ... and we redirect him to dashboard
        },
        // Register function
        async register ({ commit}, details) {
            const { email, password } = details
            try {
                await createUserWithEmailAndPassword(auth, email, password)
            } catch (error) {
                // Managing errors
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
            commit('SET_USER', auth.currentUser) // User is registered & logged in, so we store it...
            router.push('/dashboard') // ... and we redirect him to dashboard
        },
        // Logout Function
        async logout ({ commit }) {
            await signOut(auth) // Disconnects user
            commit('CLEAR_USER') // User is logged out, so we clear our store...
            router.push('/') // ... and we redirect to 'home'
        },
        // Getting user Function
        fetchUser ({ commit }) {
            // Observes auth state & executes if something change
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