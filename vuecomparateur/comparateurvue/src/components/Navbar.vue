<template>
    <nav>
      <div class="container">
        <router-link to="/">Accueil</router-link>
        <ul>
          <li v-for="route in routes" :key="route.path">
            <router-link :to="route.path">{{ route.name }}</router-link>
          </li>
          <li>
          <a style="cursor: pointer;" @click="logout">Déconnexion</a>
        </li>
        </ul>
      </div>
    </nav>
  </template>
  
  <script>
import { computed } from 'vue';
import router from '@/router';

export default {
  name: 'NavbarView',
  setup() {
    const routes = computed(() =>
      router.options.routes.filter(route => route.name && route.name !== 'Comparison' && route.name !== 'Players' && route.name !== 'playersgestion')
    );

    const logout = () => {
      localStorage.removeItem('token');
      router.push({ path: '/login' });
    };

    return {
      routes,
      logout,
    };
  },
};
</script>
  
  <style>
  nav {
    background-color: #212121;
    color: white;
    display: flex;
    justify-content: center;
    font-family: 'Poppins', sans-serif;
  }
  
  .container {
    max-width: 1200px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
  }
  
  .logo {
    font-size: 2rem;
    font-weight: bold;
    color: white;
    text-decoration: none !important;
  }
  
  ul {
    display: flex;
    list-style-type: none;
    margin: 0 !important;
    padding: 0;
  }
  
  li {
    margin: 0 10px;
  }
  
  a {
    color: white !important;
    text-decoration: none !important;
    font-size: 1.2rem;
    font-weight: 500;
    letter-spacing: 0.5px;
    transition: all 0.2s ease-in-out;
  }
  
  a:hover {
    color: #f44336 !important;
  }

  nav{
    height: 80px;
  }

  button{
    text-decoration: none;
    border: none !important;
  }
  </style>
  