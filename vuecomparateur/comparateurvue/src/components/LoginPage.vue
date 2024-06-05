<template>
    <div class="form-container">
      <h1>Connexion</h1>
      <form @submit.prevent="login">
        <div>
          <label for="username">Username</label>
          <input type="text" name="username" id="username" v-model="username" />
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" name="password" id="password" v-model="password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    data() {
      return {
        isConnected: false,
        username: "",
        password: "",
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post("https://node-api-rosy.vercel.app/auth/login", {
            username: this.username,
            password: this.password,
          });
          const token = response.data.token;
          localStorage.setItem("token", token);
          this.isConnected= true;
          // Rediriger l'utilisateur vers la page protégée
          this.$router.push({ path: "/" });
        } catch (error) {
          console.error(error);
          alert("Invalid username or password");
        }
      },
    },
  };
  </script>
  <style> 


</style>