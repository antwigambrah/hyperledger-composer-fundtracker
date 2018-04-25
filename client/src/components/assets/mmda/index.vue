
<template>
    <div>
        <div class="container-fluid">
            <div class="row">

                <side-bar></side-bar>

                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                    <div class="col-md-10 offset-md-1">
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
                            <h4> MMDA</h4>

                        </div>

                        <div class="row search-row">
                            <div class="col-auto  mr-auto"><input class="form-control form-control-sm" type="text" placeholder="search">
                            </div>
                            <div class="col-auto">
     <button class="btn btn-sm btn-outline-secondary" @click="modalShow = !modalShow" href="">
                                                <plus-square-icon></plus-square-icon>
                                                add mda</button>
                   <form class="form" @submit.prevent="addMmda">
                <b-modal v-model="modalShow">
                    <div slot="modal-header">
                        Create
                    </div>

 <div class="form-group">
                        <input type="text" class="form-control form-control-sm" placeholder="Name" v-model="name">
                    </div>
                    <b-form-select v-model="region" :options="regions" class="mb-3" size="sm" />
                    <div slot="modal-footer" class="w-100">
                        <button class="btn btn-sm float-left modal-btn" type="submit">
                                                                                  Cancel                                                                            </button>
                        <button class="btn btn-sm float-right btn-success modal-btn">
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
import Navbar from '../../layout/nav-bar'
import {
  ActivityIcon
} from 'vue-feather-icons'
import SideBar from '../../layout/admin-sidebar'
import {
  PlusSquareIcon
} from 'vue-feather-icons'
export default {
    mounted(){

 this.$store.state.lastInsertId=''
this.getMmda()

    },
  components: {
    'nav-bar': Navbar,
    ActivityIcon,
    PlusSquareIcon,
    SideBar
  },
  data () {
    return {
      region: null,
      modalShow: false,
      name: '',
      region: '',
      items: [],
      fields: ["id", "name",'region']
    }
  },
  methods:{
     getMmda(){

                var self=this;

            axios.get('/asset/mmda/all').then((res)=>{
                if(res.data.length!=0){
                  
                let insertData= res.data[res.data.length -1]
                self.$store.state.lastInsertId=insertData.id

                    console.log( self.$store.state.lastInsertId)

        self.items=res.data.map((data)=>{
            return {
                "id" :data.id,
                "name":data.name,
                "region":data.Region
            }
       })
                }

               })
            },
    addMmda(){
        var self=this;
         var id=JSON.parse(this.$localStorage.get('mmdaid'))
        axios.post('/asset/mmda/create',{
            'id': self.$store.state.lastInsertId,
            'name':self.name,
            'region':self.region

        }).then((req)=>{
            console.log(req)
            self.items=[]
                this.getMmda();
                self.modalShow=false;
                this.name='',
                this.region=''
        })
    }
  },
  computed: {
    regions () {
      return this.$store.state.regions
    }
  }
}
</script>

<style lang="scss" scoped>
    .search-row {
        margin-bottom: 20px;
    }
</style>
