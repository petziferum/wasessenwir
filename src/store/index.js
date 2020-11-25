import Vue from "vue";
import Vuex from "vuex";
import Question from "../components/models/question";
import Meal from "../components/models/Meal";
import MealData from "./data/Meals";
import db from "@/plugins/firebase";
//import firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: false,
    loading: false,
    question: [],
    meals: [],
    recipes: [],
    images: "",
    user: null,
    foodTable:{headers: [
        {
          text: "Menge",
          align: "start",
          value: "value",
          width: "10%"
        },
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "name",
          width: "20%"
        },
        {
          text: "Kategorie",
          align: "start",
          sortable: true,
          value: "category",
          width: "20%"
        },
        {
          text: "Beschreibung",
          align: "start",
          sortable: false,
          value: "description",
          width: "40%"
        }
      ],
      items: [
        {
          name: "Bauernschinken",
          category: "Fleisch",
          value: 1,
          description: "Der gräucherte, nicht der gegarte.",
          status: null
        },
        {
          name: "Apfel",
          category: "Obst",
          value: 4,
          description: "",
          status: null
        }
      ]}
  },
  mutations: {
    CREATE_QUESTION(state, payload) {
      console.info(payload);
      const newQuestion = new Question.createQuestion(payload);
      state.question.push(newQuestion);
    },
    SET_MEALS(state, payload) {
      state.meals.push(payload);
    },
    SET_RECIPES(state, payload) {
      state.recipes = payload;
      state.loading = false;
    },
    loading(state, load) {
      state.loading = load;
    },
    SET_USER(state, payload) {
      state.user = payload
    }
  },
  actions: {
    autoLogin({ commit }, user) {
      commit("SET_USER", {
        id: user.uid,
        email: user.email,
        fbKey:{},
      })
},
    createQuestion: ({ commit }) => {
      let inhalt = {
        id: "34",
        name: "Kalter Fisch",
        description: "Einfach kalter roher Fisch, lecker!",
        justify: "end",
        isScalable: false
      };
      commit("CREATE_QUESTION", inhalt);
    },
    getRecipes({ commit, state }) {
      state.recipes = [];
      let payload = [];
      commit("loading", true);

      //const storageRef = firebase.storage().ref();
      //const imageRef = storageRef.child("recipes");
      db.collection("recipes")
        .get()
        .then(res => {
          res.forEach(el => {
            let r = el.data();
            r.id = el.id;
            if (!r.recipeDescription) {
              r.recipeDescription = "";
            }
            payload.push(r);
          });
          commit("SET_RECIPES", payload);
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          commit("loading", false);
        });

      /*imageRef.listAll().then(res => {
        res.items.forEach(el => {
          console.log("el", el);
        });
      }); */
    },
    setMeal: ({ commit }) => {
      let zahl = MealData.length;
      let rand = Math.floor(Math.random() * zahl); // rand ist random 0 bis 2 und wird dem MealData als Index übergeben. MealData[0], MealData[1] usw...
      let newMeal = Meal.createNewMeal(MealData[rand]);
      console.info("random:", rand, zahl, ",", newMeal);
      commit("SET_MEALS", newMeal);
    }
  },

  getters: {
    loading: state => {
      return state.loading;
    },
    getRecipes: state => {
      return state.recipes;
    },
    drawer: state => {
      return state.drawer;
    },
    getUser: state => {
      return state.user;
    },
    getQuestions: state => {
      return state.question;
    },
    getMeals: state => {
      return state.meals;
    }
  },
  modules: {}
});
