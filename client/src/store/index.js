import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    hello: "Hello",
    loading: false,
    lastInsertId: '',
    isloggedIn: false,
    regions: [
      { value: null, text: 'Select Region' },
      {
        text: "Ashanti",
        value: "Ashanti"
      },
      {
        text: "Brong Ahafo",
        value: "Brong Ahafo"
      },
      {
        text: "Central",
        value: "Central"
      },
      {
        text: "Eastern",
        value: "Eastern"
      },
      {
        text: "Greater-Accra",
        value: "Greater-Accra"
      },
      {
        text: "Northern",
        value: "Northern"
      },
      {
        text: "Upper-East",
        value: "Upper-East"
      },
      {
        text: "Upper-West",
        value: "Upper-West"
      },
      {
        text: "Volta",
        value: "Volta"
      },
      {
        text: "Western",
        value: "Western"
      }
    ],
    user: {
      firstname: "",
      lastname: "",
      role: ""
    },
    project: {
      name: '',
      program: '',
      mmda:'',
      fundsource:'',
      objective: '',
      allocation: 0,
      receipient:'',
      expense: []

    }
  }
})

export default store
