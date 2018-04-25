<template>
    <div>
        <div class="container-fluid">
            <div class="row">

                <side-bar></side-bar>

                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                    <div class="col-md-10 offset-md-1">
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
                            <h4> Fund Transfer Approver</h4>

                        </div>

                        <div class="row search-row">
                            <div class="col-auto  mr-auto"><input class="form-control form-control-sm" type="text" placeholder="search">
                            </div>
                            <div class="col-auto">

                                <button class="btn btn-sm btn-outline-secondary" @click="modalShow = !modalShow" href="">
                                                <plus-square-icon></plus-square-icon>
                                                add approver</button>

                                                <form class="form" @submit.prevent="addApprover">

                                <b-modal v-model="modalShow">
                                    <div slot="modal-header">
                                        Create
                                    </div>

                                    <div class="form-group">
                                        <input type="text" class="form-control form-control-sm" placeholder="firstname" v-model="firstname">
                                    </div>
                                       <div class="form-group">
                                        <input type="text" class="form-control form-control-sm" placeholder="lastname" v-model="lastname">
                                    </div>
                                      <div class="form-group">
                                        <input type="email" class="form-control form-control-sm" placeholder="email" v-model="email">
                                    </div>

                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-6 ">
                                                <input type="checkbox" v-model="toggle" true-value="mda" false-value="mmda"> Mda </div>

                                            <div class="col-6 ">
                                                <input type="checkbox" v-model="toggle" true-value="mmda" false-value="mda"> Mmda</div>
                                        </div>
                                    </div>

                          <div class="form-group" v-if="toggle=='mda'">
                                        <b-form-select v-model="mda" :options="mdas" class="mb-3" size="sm" />
                                    </div>
                      <div class="form-group" v-if="toggle=='mmda'">
            <b-form-select v-model="mmda" :options="mmdas" class="mb-3" size="sm" />
                                    </div>

                                    <div class="form-group">
                                         <b-form-select v-model="role" :options="roles" class="mb-3" size="sm" />
                                    </div>
                                    <div slot="modal-footer" class="w-100">
                                        <button class="btn btn-sm float-left  modal-btn">
                                                                                               Cancel
                                                                                            </button>
                                        <button class="btn btn-sm btn-success float-right  modal-btn" type="submit">
                                                                                                Add
                                                                                            </button>
                                    </div>
                                </b-modal>
             </form>
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
        async mounted(){
            var self=this;
             self.$store.state.lastInsertId=''

               await    this.getApprover()
               
             let mmda= await axios.get('/asset/mmda/all');
               if (mmda.data.length!=0) {

                    self.mmdas=mmda.data.map((data)=>{

                        return {
                            value:data.id,
                            text:data.name
                        }
                    })
                }
                let mda = await axios.get('/asset/mda/all');

                  if (mda.data.length!=0) {

                    self.mdas=mda.data.map((data)=>{

                        return {
                            value:data.id,
                            text:data.name
                        }
                    })
                }

  let role=await axios.get('/asset/role/all')
     if (role.data.length!=0) {
 
                    self.roles=role.data.map((data)=>{

                        return {
                            value:data.id,
                            text:data.name
                        }
                    })
                }
             
       
       


        },
        components: {
            'nav-bar': Navbar,
            ActivityIcon,
            PlusSquareIcon,
            SideBar
        },
        data() {
    
            return {
                toggle: '',
                firstname:'',
                lastname:'',
                email:'',
                role:'',
                roles:[],
                rolename:'',
                mmda:'',
                mda:'',
                mmdas: [],
                mdas:[],
                modalShow: false,
                name: '',
                allocation: null,
                 items:[],
                 fields:['id','name','role','mmda or mda']
            }
        },
        methods:{

           async  getApprover(){
                var self=this;
           let res = await axios.get('/participant/fund-approver/all');

            if (res.data.length!=0) {
               let insertData= res.data[res.data.length -1]
                self.$store.state.lastInsertId=insertData.id

                self.items=res.data;

    }

            },
            addApprover(){

                    var self=this;
    console.log(this.mda)
                    axios.post('/participant/fund-approver/create',{
                        'id': self.$store.state.lastInsertId,
                        'firstname':self.firstname,
                        'lastname':self.lastname,
                         'email':self.email,
                         'role':self.role,
                         'mmdaid':self.mmda,
                         'mdaid':self.mda,
                    }).then((res)=>{
                          self.items=[]
                        self.modalShow=false;
                        this.getApprover()
                        this.firstname='',
                        this.lastname='',
                        this.email='',
                        this.role='',
                        this.mmda='',
                        this.mda=''
                    
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

