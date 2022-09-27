export const actions = {
    async nuxtServerInit({ commit }, { req }) {
      let auth = null
      if (req.headers.cookie) {
        // cookie found
        try {
          // check data user login with cookie
          const {
            data
          } = await this.$axios.get('/api/user')
          // server return the data is cookie valid loggedIn is true
          auth = data.data // set the data auth
        } catch (err) {
          // No valid cookie found
          auth = null
        }
      }
  
      // How we can set the user for AuthNuxt
      // Source: https://auth.nuxtjs.org/api/auth
      this.$auth.setUser(auth)
    },
  }
  
  export const getters = {
    user(state) {
      return state.auth.user
    },
    
    isAuthenticated(state) {
      return state.auth.loggedIn
    },
  
    loggedInUser(state) {
      return state.auth.user
    }
  }