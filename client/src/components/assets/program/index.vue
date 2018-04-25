<template>
    <div>
        <div class="container-fluid">
            <div class="row">
    
                <side-bar></side-bar>
    
                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                    <div class="col-md-10 offset-md-1">
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
                            <h4> Programs</h4>

        </div>
    
                        <div class="row search-row">
                            <div class="col-auto  mr-auto"><input class="form-control form-control-sm" type="text" placeholder="search">
                            </div>
                            <div class="col-auto">
    
                                <button class="btn btn-sm btn-outline-secondary" @click="modalShow = !modalShow" href="">
                                    <plus-square-icon></plus-square-icon>
                                    add program</button>
                                    <form class="form" @submit.prevent="addProgram">
                                <b-modal v-model="modalShow">
                                    <div slot="modal-header">
                                        Create
                                    </div>
    
                                    <div class="form-group">
                                        <input type="text" class="form-control form-control-sm" placeholder="Name" v-model="name">
                                    </div>
                     
                                  
                                    <div slot="modal-footer" class="w-100">
                                        <button class="btn btn-sm float-left modal-btn">
                                                                                   Cancel
                                                                                </button>
                                        <button class="btn btn-sm float-right btn-primary modal-btn"  type="submit">
                                                                                    Add
                                                                                </button>
                                    </div>
                                </b-modal>
       </form>
                            </div>
                        </div>
                        <div class="row">
    
                            <div class="col-12">
    
                                        <b-table striped hover :items="programs" :fields='fields'></b-table>
                                 
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
    export default {
        mounted(){
             this.$store.state.lastInsertId=''
            this.getProgram()
        },
        components: {
            'nav-bar': Navbar,
            ActivityIcon,
            PlusSquareIcon,
            SideBar
        },
        data() {
    
            return {
                modalShow: false,
                name:'',
                allocation:0,
                programs:[],
                fields:['id','program name'],

            }
        },
        methods:{

           async  getProgram(){
                var self=this;

              
               let res = await  axios.get('/asset/program/all');

                if (res.data.length!=0) {

                let insertData= res.data[res.data.length -1]

                self.$store.state.lastInsertId=insertData.id
                    self.programs=res.data.map((data)=>{

                        return {
                            'id':data.id,
                            'program name':data.name
                         }
                    })

                    }

            },
            addProgram(){
                var self=this;

                axios.post('/asset/program/create',{
                    'id':self.$store.state.lastInsertId,
                    'name':self.name,
                    'allocation':parseFloat(self.allocation)
                }).then((res)=>{
                    console.log(res)
                    self.modalShow=false;
                    self.programs=[]
                    this.getProgram();
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

