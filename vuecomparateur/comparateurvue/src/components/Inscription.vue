<template>
    <div class="form-container">
      <h1>Inscription</h1>
      <form>
        <div class="form-group">
          <label for="username">Nom d'utilisateur</label>
          <input type="text" id="username" v-model="username" />
        </div>
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <button type="submit" @click.prevent="handleSubmit">S'inscrire</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: "InscriptionForm",
    data() {
      return {
        username: "",
        password: "",
      };
    },
    methods: {
      async handleSubmit() {
        try {
          const response = await axios.post("https://node-api-rosy.vercel.app/auth/signup", {
            username: this.username,
            password: this.password,
          });
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>
  
  <style>
  .form-container {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
  }
  
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: #f7f7f7;
    border-radius: 10px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    width: 400px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    width: 100%;
  }
  
  label {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input[type="text"],
  input[type="password"] {
    padding: 10px;
    border-radius: 5px;
    border: none;
    outline: none;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
  }
  
  button[type="submit"] {
    padding: 10px 20px;
    background-color: #0077ff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    outline: none;
    transition: all 0.2s ease-in-out;
  }
  
  button[type="submit"]:hover {
    background-color: #0066cc;
  }
  
  button[type="submit"]:active {
    transform: translateY(2px);
  }
  </style>