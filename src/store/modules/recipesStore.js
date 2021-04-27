import { firestore } from "@/plugins/firebase";
import MealData from "@/store/data/Meals";
import Meal from "@/components/models/Meal";

export default {
  state: () => ({
    recipes: []
  }),
  mutations: {
    SET_MEALS(state, payload) {
      state.meals.push(payload);
    },
    SET_RECIPES(state, payload) {
      state.recipes = payload;
      state.loading = false;
    },
    setofflineMeals(state, payload) {
      state.recipes = payload;
    }
  },
  actions: {
    loadmealdata({ commit }) {
      let recipelist = [];
      MealData.forEach(meal => {
        const mealobj = Meal.createNewMeal(meal);
        recipelist.push(mealobj);
      });
      commit("setofflineMeals", recipelist);
    },
    getRecipes({ commit, state }) {
      state.recipes = [];
      let payload = [];
      commit("loading", true);

      //const storageRef = firebase.storage().ref();
      //const imageRef = storageRef.child("recipes");
      firestore
        .collection("recipes")
        .get()
        .then(res => {
          res.forEach(doc => {
            const data = doc.data()
            data.id = doc.id;
            let r = Meal.createNewMeal(data)

            payload.push(r)
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
    getofflinemeals: state => {
      return state.recipes;
    },
    getRecipes: state => {
      return state.recipes;
    }
  }
};
