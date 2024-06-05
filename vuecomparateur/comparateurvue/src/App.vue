<template>
  <div id="container app">
    <navbar></navbar>
    <img alt="Vue logo" class="logo" src="./assets/logo.png"  style="align-self: center">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import router from '@/router';
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'App',
  router,
  components: {
    Navbar,
  },
  data() {
    return {
      joueurs: []
    }
  },
  mounted() {
    this.getJoueurs()
  },
  methods: {
    getJoueurs() {
      // Appel à l'API pour récupérer les joueurs
      fetch('https://node-api-rosy.vercel.app/players')
        .then(response => response.json())
        .then(data => {
          this.joueurs = data
        })
        .catch(error => console.error(error))
    }
  }
}
</script>

<style>
.logo {
  margin-top : 50px !important;
  width: 340px;
  height: auto;
  display: flex;
  margin: auto;
}

.fade-enter-active,
.fade-leave-active {
  transition-property: opacity 3s;
  transition-duration: 3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
