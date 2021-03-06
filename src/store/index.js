import Vue from "vue";
import Vuex from "vuex";
import Question from "../components/models/question";
import recipesStore from "./modules/recipesStore";
import { firestore, fireBucket } from "@/plugins/firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: false,
    loading: true,
    question: [],
    meals: [],
    recipes: [],
    images: "",
    gallerie: [],
    user: null,
    menuItems: [
      { action: "mdi-food", title: "Abendessen", to: "/" },
      { action: "mdi-floppy", title: "Rezept speichern", to: "/saveRecipe" },
      { action: "mdi-login", title: "LogIn", to: "Login" },
      { action: "mdi-upload", title: "Image Upload", to: "/upload" },
      { action: "mdi-form-select", title: "Inventar", to: "/inventar" }
    ],
    foodTable: {
      headers: [
        {
          text: "Menge",
          align: "start",
          value: "value",
          width: "8%"
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
        },
        { text: "Actions", value: "actions", sortable: false }
      ],
      items: []
    }
  },
  mutations: {
    SET_GALLERIE(state, payload) {
      console.log("payload images", payload);
      state.gallerie = payload;
    },
    CREATE_QUESTION(state, payload) {
      console.info(payload);
      const newQuestion = new Question.createQuestion(payload);
      state.question.push(newQuestion);
    },
    loading(state, load) {
      state.loading = load;
    },
    SET_USER(state, payload) {
      state.user = payload;
    },
    addInventoryItem(state, payload) {
      state.foodTable.items.push(payload);
    },
    deleteItem(state, id) {
      console.log(id, "wird gelöscht");
    }
  },
  actions: {
    loadImages({ commit }) {
      let storage = fireBucket;
      let storageRef = storage.ref();
      let listRef = storageRef.child("recipes");
      listRef.listAll().then(res => {
        let image = [];
        console.log("Bilder laden...", res);
        res.items.forEach(item => {
          storageRef
            .child(item.fullPath)
            .getDownloadURL()
            .then(url => {
              image.push(url);
            });
        });
        commit("SET_GALLERIE", image);
      });
    },
    autoLogin({ commit }, user) {
      commit("SET_USER", {
        id: user.uid,
        email: user.email,
        fbKey: {}
      });
    },
    saveLebensmittel({ commit, dispatch }, payload) {
      console.log(payload);
      firestore
        .collection("inventory")
        .add(payload)
        .then(res => {
          payload.id = res.id;
          commit("addInventoryItem", payload);
          dispatch("getInventory");
        });
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
    getInventory({ commit, state }) {
      state.foodTable.items = [];
      firestore
        .collection("inventory")
        .get()
        .then(response => {
          response.forEach(el => {
            let item = el.data();
            item.id = el.id;
            commit("addInventoryItem", item);
          });
        });
    },
    deleteInventoryItem({ commit, dispatch }, id) {
      firestore
        .collection("inventory")
        .doc(id)
        .delete()
        .then(() => {
          commit("deleteItem", id);
        })
        .finally(() => dispatch("getInventory"));
    }
  },

  getters: {
    menuItems: state => {
      return state.menuItems;
    },
    loading: state => {
      return state.loading;
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
  modules: {
    recipesStore
  }
});
