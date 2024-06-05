<template>
    <div>
      <div class="comparison-container">
        <div class="comparison-card" v-for="(joueur, index) in joueurs" :key="joueur._id">
          <div class="comparison-header">
            <img :src="require(`../assets/${joueur.picture}`)" alt="Avatar" />
            <h4><b>{{ joueur.name }}</b></h4>
            <p>{{ joueur.position }}, {{ joueur.team }}</p>
          </div>
          <div class="comparison-attributes">
            <div class="comparison-attribute">
              <p>Age</p>
              <p :class="getAttributeClass(index, 'age')">{{ joueur.age }}</p>
            </div>
            <div class="comparison-attribute">
              <p>Taille (cm)</p>
              <p :class="getAttributeClass(index, 'height')">{{ joueur.height }}</p>
            </div>
            <div class="comparison-attribute">
              <p>Poids (kg)</p>
              <p :class="getAttributeClass(index, 'weight')">{{ joueur.weight }}</p>
            </div>
            <div class="comparison-attribute">
              <p>Classement</p>
              <p :class="getAttributeClass(index, 'ranking')">{{ joueur.ranking }}</p>
            </div>
            <div class="comparison-attribute">
              <p>Salaire ($)</p>
              <p :class="getAttributeClass(index, 'salary')">{{ numberWithSpaces(joueur.salary) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  import axios from "axios";
  export default {
    name: "ComparisonView",
    data() {
      return {
        joueurs: [],
        player1: null,
        player2: null
      };
    },
    async created() {
      const player1Id = this.$route.query.player1;
      const player2Id = this.$route.query.player2;
      if (player1Id && player2Id) {
        await this.fetchPlayers([player1Id, player2Id]);
      }
    },
    methods: {
      async fetchPlayers(playerIds) {
        try {
          const response = await axios.get("https://node-api-rosy.vercel.app/players");
          this.joueurs = response.data.filter((joueur) => playerIds.includes(joueur._id));
          this.player1 = this.joueurs[0];
          this.player2 = this.joueurs[1];
        } catch (error) {
          console.error(error);
        }
      },
      getAttributeClass(index, attribute) {
        const player1Value = this.player1[attribute];
        const player2Value = this.player2[attribute];
        if (attribute === 'ranking') {
        if (player1Value < player2Value) {
          return index === 0 ? "attribute-green" : "attribute-red";
        } else if (player1Value > player2Value) {
          return index === 0 ? "attribute-red" : "attribute-green";
        } else {
          return "attribute-neutral";
        }
      } else {
        if (player1Value > player2Value) {
          return index === 0 ? "attribute-green" : "attribute-red";
        } else if (player1Value < player2Value) {
          return index === 0 ? "attribute-red" : "attribute-green";
        } else {
          return "attribute-neutral";
        }
      }},
      numberWithSpaces(number) {
        return new Intl.NumberFormat('fr-FR', { style: 'decimal' }).format(number);
      }
    },
  };
  </script>
  
  <style>
  .comparison-container {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }
  
  .comparison-card {
    width: 300px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
    margin: 0 1rem;
    text-align: center;
  }
  
  .comparison-header {
    padding: 1rem;
    background-color: #333;
    color: #fff;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  
  .comparison-header img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 0.5rem;
  object-fit: cover;
}
  
  .comparison-attributes {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
  }
  
  .comparison-attribute {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
  
  .attribute-green {
    color: green;
    font-weight: bold;
  }
  
  .attribute-red {
    color: red;
    font-weight: bold;
  }
  
  .attribute-neutral {
    color: #333;
    font-weight: bold;
  }
</style>
