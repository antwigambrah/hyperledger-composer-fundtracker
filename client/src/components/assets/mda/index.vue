
<template>
    <div>
        <div class="container-fluid">
            <div class="row">

                <side-bar></side-bar>

                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                    <div class="col-md-10 offset-md-1">
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
                            <h4> MDA</h4>

                        </div>

                        <div class="row search-row">
                            <div class="col-auto  mr-auto"><input class="form-control form-control-sm" type="text" placeholder="search">
                            </div>
                            <div class="col-auto">

                   <button class="btn btn-sm btn-outline-secondary" @click="modalShow = !modalShow" href="">
                                                <plus-square-icon></plus-square-icon>
                                                add mda</button>

                   <form class="form" @submit.prevent="addMda()">
                <b-modal v-model="modalShow">
                    <div slot="modal-header">
                        Create
                    </div>

 <div class="form-group">
                        <input type="text" class="form-control form-control-sm" placeholder="Name" v-model="name">
                    </div>
               
                    <div slot="modal-footer" class="w-100">
                        <button class="btn btn-sm float-left modal-btn" >
                                                                                  Cancel
                                                                            </button>
                        <button class="btn btn-sm float-right btn-success modal-btn" type="submit">
                                                                                Add
                                                                            </button>
                    </div>

                </b-modal></form>
                            </div>
                        </div>
                        <div class="row">

                            <div class="col-12">

                                <b-table striped hover :items="items" :fields='fields'></b-table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>

    </div>
</template>

<script>
/*eslint-disable*/

import Navbar from "../../layout/nav-bar";
import { ActivityIcon } from "vue-feather-icons";
import SideBar from "../../layout/admin-sidebar";
import { PlusSquareIcon } from "vue-feather-icons";
export default {
  mounted() {
    var self = this;
     self.$store.state.lastInsertId=''
    this.getMda();
  },
  components: {
    "nav-bar": Navbar,
    ActivityIcon,
    PlusSquareIcon,
    SideBar
  },
  data() {
    return {
      modalShow: false,
      name: "",
      items: [],
      fields: ["id", "name"]
    };
  },
  methods: {
    getMda() {
      var self = this;
      axios.get("/asset/mda/all").then(res => {
        if (res.data.length != 0) {
          let insertData = res.data[res.data.length - 1];
          self.$store.state.lastInsertId = insertData.id;
          console.log(self.$store.state.lastInsertId);
          self.items = res.data.map(data => {
            return {
              id : data.id,
              name: data.name
            };
          });
        }
      });
    },
    addMda() {
      var self = this;

      axios
        .post("/asset/mda/create", {
          id: self.$store.state.lastInsertId,
          name: self.name
        })
        .then(req => {
          console.log(req);
          self.items=[]
          this.getMda();
          this.name=''
          this.modalShow=false;
        });
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.search-row {
  margin-bottom: 20px;
}
</style>
