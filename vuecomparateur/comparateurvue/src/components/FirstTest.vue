<template>
  <div>
    <p class="text-comparaison">{{ message }}</p>
    <p class="text-comparaison">Cliquez sur "comparer" sur deux joueurs pour les selectionner. Un nouveau bouton "comparer les deux joueurs" va apparaître en bas de la page, cliquez pour effectuer la comparaison</p>
    <div class="search-container">
      <input class="search" type="text" v-model="search" placeholder="Rechercher un joueur" />
    </div>

    <div class="card-container v-cloak">
      <div class="card" v-for="joueur in filteredJoueurs" :key="joueur._id">
        <div class="card-header">
          <img :src="require(`../assets/${joueur.picture}`)" alt="Avatar" />
          <h4><b>{{ joueur.name }}</b></h4>
          <p>{{ joueur.position }}, {{ joueur.team }}</p>
        </div>
        <div class="card-attributes">
          <div class="card-attribute">
            <p>Age</p>
            <p>{{ joueur.age }} ans</p>
          </div>
          <div class="card-attribute">
            <p>Taille (cm)</p>
            <p>{{ joueur.height }} cm</p>
          </div>
          <div class="card-attribute">
            <p>Poids (kg)</p>
            <p>{{ joueur.weight }} kg</p>
          </div>
          <div class="card-attribute">
            <p>Classement</p>
            <p>{{ joueur.ranking }}</p>
          </div>
          <div class="card-attribute">
            <p>Salaire ($)</p>
            <p>{{ numberWithSpaces(joueur.salary) }}</p>
          </div>
          
        </div>
        <router-link to="/playersgestion" class="btn btn-primary" v-if="userLoggedIn" >Nouveau</router-link>
        <router-link :to="{ name: 'playersgestion', params: { id: joueur._id }}" class="btn btn-success" v-if="userLoggedIn">Modifier</router-link>

        <button class="btn btn-danger" v-if="userLoggedIn" @click="deleteJoueur(joueur._id)">Supprimer</button>
        <button class="btn btn-dark" @click="selectJoueur(joueur._id)">{{ selectedJoueurs.includes(joueur._id) ? 'Désélectionner' : 'Comparer' }}</button>
      </div>
    </div>
    <div class="contain-comparer" v-if="selectedJoueurs.length === 2">
  <router-link :to="getComparisonLink()" class="btn btn-dark comparer">Comparer les deux joueurs</router-link>
      <div class="comparison-card" v-for="(stat, index) in comparisonStats" :key="index">
        <h5>{{ stat.name }}</h5>
        <p>{{ joueurs[selectedJoueurs[0]][stat.property] }} {{ stat.unit }}</p>
        <p>{{ joueurs[selectedJoueurs[1]][stat.property] }} {{ stat.unit }}</p>
      </div>
    </div>
    <div class="ratio-taille-poids" v-if="bestHeightWeight">
      <h4>Meilleur ratio taille/poids</h4>
      <p>{{ bestHeightWeight.joueur.name }} : {{ ((bestHeightWeight.joueur.height / bestHeightWeight.joueur.weight)).toFixed(2) }} cm/kg </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "FirstTest",
  props: {
    title: {
      type: String,
    },
    count: {
      type: Number,
      default: 1,
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      userLoggedIn: false,
      message: "Retrouvez vos joueurs de Basket favoris et obtenez une comparaison",
      joueurs: [],
      search: "",
      selectedJoueurs: []
    };
  },
  created() {
    const token = localStorage.getItem("token");
    if (token) {
      this.userLoggedIn = true;
    }
  },
  mounted() {
    this.fetchJoueurs();
  },
  computed: {
    filteredJoueurs() {
      return this.joueurs.filter((joueur) =>
        joueur.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    bestHeightWeight() {
      return this.filteredJoueurs.reduce((best, joueur) => {
        const ratio = joueur.height / joueur.weight;
        if (!best || ratio > best.ratio) {
          return {
            joueur,
            ratio
          };
        }
        return best;
      }, null);
    }
  },
  methods: {
    getComparisonLink() {
  if (this.selectedJoueurs.length === 2) {
    const player1 = this.selectedJoueurs[0];
    const player2 = this.selectedJoueurs[1];
    return `/comparison?player1=${player1}&player2=${player2}`;
  } else {
    return "";
  }
},

    selectJoueur(joueurId) {
    if (this.selectedJoueurs.includes(joueurId)) {
      this.selectedJoueurs = this.selectedJoueurs.filter(id => id !== joueurId);
    } else {
      if (this.selectedJoueurs.length < 2) {
        this.selectedJoueurs.push(joueurId);
      }
    }
  },
  deleteJoueur(joueurId) {
  const token = localStorage.getItem('token');
  axios.delete(`https://node-api-rosy.vercel.app/players/${joueurId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(() => {
      const index = this.joueurs.findIndex(joueur => joueur._id === joueurId);
      this.joueurs.splice(index, 1);
    }).catch(error => {
    console.error(error);
  });
},

    async fetchJoueurs() {
      try {
        const response = await axios.get("https://node-api-rosy.vercel.app/players");
        this.joueurs = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    numberWithSpaces(number) {
      return new Intl.NumberFormat('fr-FR', { style: 'decimal' }).format(number);
    }
  },

  
};
</script>

<style>
.card-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.card {
  width: 300px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
  margin: 1rem 1rem;
  text-align: center;
}

.card-header {
  padding: 1rem;
  background-color: #333;
  color: #fff;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.card-header img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 0.5rem;
  object-fit: cover;
}

.card-attributes {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
}

.card-attribute {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.search-container{
  display: flex;
  justify-content: center;
  
}

.search{
  width : 30% !important;
  text-align: center;
}

.text-comparaison{
  margin: 20px 0 20px 0;
  text-align: center;
  font-size: 1.5rem;
}

.ratio-taille-poids{
  margin-top : 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.comparer{
  
  font-size: 2.5rem !important;
  width:90%;
}
.contain-comparer{
  
  display: flex;
  justify-content: center;
}
</style>