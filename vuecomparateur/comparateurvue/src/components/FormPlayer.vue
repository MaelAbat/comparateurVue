<template>
  <div class="form-container">
    <h1>{{ isEditing ? 'Modification' : 'Ajout' }} d'un joueur</h1>
    <form>
      <div class="form-group">
        <label for="name">Nom</label>
        <input type="text" id="name" v-model="name" />
      </div>
      <div class="form-group">
        <label for="team">Équipe</label>
        <input type="text" id="team" v-model="team" />
      </div>
      <div class="form-group">
        <label for="position">Position</label>
        <input type="text" id="position" v-model="position" />
      </div>
      <div class="form-group">
        <label for="height">Taille (en cm)</label>
        <input type="number" id="height" v-model="height" />
      </div>
      <div class="form-group">
        <label for="weight">Poids (en kg)</label>
        <input type="number" id="weight" v-model="weight" />
      </div>
      <div class="form-group">
        <label for="age">Âge</label>
        <input type="number" id="age" v-model="age" />
      </div>
      <div class="form-group">
        <label for="salary">Salaire (en $)</label>
        <input type="number" id="salary" v-model="salary" />
      </div>
      <div class="form-group">
        <label for="ranking">Classement</label>
        <input type="number" id="ranking" v-model="ranking" />
      </div>
      <div class="form-group">
        <label for="picture">Photo (URL)</label>
        <input type="text" id="picture" placeholder="Ex : lebronjames.png" v-model="picture" />
      </div>
      <button type="submit" @click.prevent="handleSubmit">{{ isEditing ? 'Modifier' : 'Ajouter' }} le joueur</button>
    </form>
  </div>
</template>
<script>
import axios from 'axios';
import router from '@/router';

export default {
  name: "PlayersForm",
  data() {
    return {
      isEditing: false,
      url: 'https://node-api-rosy.vercel.app/players',
      id: this.$route.params.id,
      name: "",
      team: "",
      position: "",
      height: "",
      weight: "",
      age: "",
      salary: "",
      ranking: "",
      picture: "",
      
    };
    
  },
  
  async created() {
    if (this.id) {
      try {
        const response = await axios.get(`${this.url}/${this.id}`);
        this.name = response.data.name;
        this.team = response.data.team;
        this.position = response.data.position;
        this.height = response.data.height;
        this.weight = response.data.weight;
        this.age = response.data.age;
        this.salary = response.data.salary;
        this.ranking = response.data.ranking;
        this.picture = response.data.picture;
        this.isEditing = true;
      } catch (error) {
        console.error(error);
      }
    }
  }, 
  methods: {
    async handleSubmit() {
      try {
        const token = localStorage.getItem("token"); // Récupérer le token d'authentification
        const config = {
          headers: { Authorization: `Bearer ${token}` }, // Ajouter le token dans l'en-tête
        };

        if (this.isEditing) {
          const response = await axios.put(`${this.url}/${this.id}`, {
            name: this.name,
            team: this.team,
            position: this.position,
            height: this.height,
            weight: this.weight,
            age: this.age,
            salary: this.salary,
            ranking: this.ranking,
            picture: this.picture,
          }, config); // Utiliser la configuration avec le token
          console.log(response.data);
        } else {
          const response = await axios.post(`${this.url}`, {
            name: this.name,
            team: this.team,
            position: this.position,
            height: this.height,
            weight: this.weight,
            age: this.age,
            salary: this.salary,
            ranking: this.ranking,
            picture: this.picture,
          }, config); // Utiliser la configuration avec le token
          console.log(response.data);
        }

        router.push('/'); // Rediriger l'utilisateur vers la liste des joueurs
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