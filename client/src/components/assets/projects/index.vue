<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <side-bar></side-bar>
                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                    <div class="col-md-12">
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
                            <h4> Projects</h4>
                        </div>
    
                        <div class="row search-row">
                            <div class="col-auto  mr-auto">
                                <!-- <input class="form-control form-control-sm" type="text" placeholder="search"> -->
                            </div>
                            <div class="col-auto">
                                <router-link class="btn btn-sm btn-outline-secondary" to='/projects/new'>
                                    <plus-square-icon></plus-square-icon>
                                    new project</router-link>
                            </div>
                        </div>
                        <div class="row">
    
                            <div class="col-12">
    
                                <b-table striped hover :items="projects" :fields='fields' :current-page="currentPage" :per-page="perPage">

                                      <template slot="actions" slot-scope="row">
                                          
        <router-link :to="{name: 'projectview', params: { id:row.item.id,mmda:row.item.mmda }}" class="btn btn-sm btn-primary"> view </router-link>
      </template>
    <template slot="approve" slot-scope="row">                                  
        <button  class="btn btn-sm btn-primary" v-if="row.item.FundTransferStatus=='INITIATED' &&  getRole==true" @click="controllerApprove(row.item.id)"> approve</button>
                <button  class="btn btn-sm btn-primary" v-if="row.item.FundTransferStatus=='INITIATED' &&  getRole==false" @click="mofApprove(row.item.id)"> approve</button>
      </template>


        <b-pagination :total-rows="projects.length" :per-page="perPage" v-model="currentPage" class="my-0" />

                                </b-table>
    
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
    import SideBar from '../../layout/side-bar'
    import {
        PlusSquareIcon
    } from 'vue-feather-icons'
    import { EyeIcon } from 'vue-feather-icons'
    import Spinner from 'vue-spinner-component/src/Spinner.vue'
    export default {
        async mounted() {
            await this.getProject()
        },
        components: {
            'nav-bar': Navbar,
            ActivityIcon,
            PlusSquareIcon,
            SideBar,
            EyeIcon,
             Spinner
        },
        data() {
    
            return {
                currentPage: 1,
                perPage: 20,
                approve:false,
                modalShow: false,
                projects: [],
                fields:[ { key: 'id', label: 'Id'},{key:'name',label:'Name'},{ key: 'mmda', label: 'Mmda'},{ key: 'region', label: 'Region'},{ key: 'fund source', label: 'Fund Source'},{ key: 'allocation', label: 'Allocation'},{ key: 'status', label: 'Status'},
                {
                    key:'FundTransferStatus',label:'FundTransferStatus'
                },
                
                { key: 'actions', label: 'View'}, { key: 'approve', label:'approve'}],
                 showSpinner:false
            }
        },
        computed:{
            getRole(){
         var role=JSON.parse(this.$localStorage.get('role'))
         if (role=="ControllerRep") {
             return true
         }else {
             return false
         }
            },
        sortProject(){
          var project=  this.projects.sort((a,b)=>{
              return a.id-b.id;
            })
        }
        },
        methods: {
            mofApprove(id){
axios.post('/asset/project/mofapprove/',{
    'project':id
}).then((res)=>{
    console.log(res)
})
            },
            controllerApprove(id){
axios.post('/asset/project/controllerapprove/',{
    'project':id
}).then((res)=>{
    console.log(res)
})
            },
            viewProject(id,mmda){
                   this.$router.push({ name: 'projectview', params: { id:id,mmda:mmda }})
            },
            async getProject() {
                console.log('same')
                var self = this;
                this.projects=[]
                axios.get('asset/project/all').then((res) => {
                    if (res.data.length != 0) {
                        let insertData = res.data[res.data.length - 1]
                        self.$store.state.lastInsertId = insertData.id
                        console.log(res)
                       self.projects=res.data;
    
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .search-row {
        margin-bottom: 20px;
    }
</style>
