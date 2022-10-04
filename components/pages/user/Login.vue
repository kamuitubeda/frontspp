<template>
    <div class="row w-100 mx-0">
      <div class="col-lg-4 mx-auto">
        <div class="auth-form-light text-left py-5 px-4 px-sm-5">
          <div class="brand-logo">
            <img src="~/assets/images/logo.svg" alt="logo">
          </div>
          <h4>Hello! let's get started</h4>
          <h6 class="fw-light">Sign in to continue.</h6>
          <form class="pt-3" @submit.prevent="login" action="." autocomplete="off">
            <div class="form-group">
              <input type="email" class="form-control form-control-lg" id="exampleInputEmail1" v-model="auth.email" placeholder="Username">
            </div>
            <div class="form-group">
              <input type="password" class="form-control form-control-lg" id="exampleInputPassword1" v-model="auth.password" placeholder="Password">
            </div>
            <div class="mt-3">
              <button class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" type="submit">SIGN IN</button>
            </div>
            <div class="text-center mt-4 fw-light">
              Don't have an account? <a href="register.html" class="text-primary">Create</a>
            </div>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    auth: false,
    data() {
          return {
              //VARIABLE UNTUK MENAMPUNG INPUTAN USER
              auth: {
                  email: null,
                  password: null
              },
              showPassword: false,
              error: ''
          }
      },
      mounted() {
          //KITA LAKUKAN PENGECEK, JIKA SUDAH LOGIN
          if (this.$auth.loggedIn) {
              //MAKA REDIRECT KE HALAMAN UTAMA ATAU DASHBOARD
              this.$router.push('/')
          } 
      },
      methods: {
          //JIKA TOMBOL LOGIN DITEKAN, MAKA METHOD INI AKAN DIJALANKAN
          async login() {
              try {
                  await this.$auth.loginWith('local', { 
                    data: this.auth 
                  }).then(res => {
                    this.$router.push('/') // redirecting after login
                  }).catch(err => {
                    console.log(err.response)
                  })
              } catch (err) {
                  console.log(err)
              }
          },
      }
}
</script>