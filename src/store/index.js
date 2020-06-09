import Vue from "vue";
import Vuex from "vuex";
import Question from "../components/models/question";
import Meal from "../components/models/Meal";
import MealData from "./data/Meals";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    question: [],
    meals: []
  },
  mutations: {
    CREATE_QUESTION(state, payload) {
      console.info(payload);
      const newQuestion = new Question.createQuestion(payload);
      state.question.push(newQuestion);
    },
    SET_MEALS(state, payload) {
      state.meals.push(payload);
    }
  },
  actions: {
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
    setMeal: ({ commit }) => {
      let zahl = MealData.length;
      let rand = Math.floor(Math.random() * (zahl)); // rand ist random 0 bis 2 und wird dem MealData als Index übergeben. MealData[0], MealData[1] usw...
      let newMeal = Meal.createNewMeal(MealData[rand]);
      console.info("random:", rand, zahl, ",", newMeal);
      commit("SET_MEALS", newMeal);
    }
  },

  getters: {
    getQuestions: state => {
      return state.question;
    },
    getMeals: state => {
      return state.meals;
    }
  },
  modules: {}
});
