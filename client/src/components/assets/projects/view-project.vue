<template>
    <div>
        <div class="container-fluid">
            <div class="row">
    
                <side-bar></side-bar>
    
                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                    <div class="col-md-12">
                         <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
                            <h4>Current Stage</h4>
                        </div>

        <el-steps :space="200" :active="1" finish-status="success">
  <el-step title="Done"></el-step>
  <el-step title="Processing"></el-step>
  <el-step title="Step 3"></el-step>
</el-steps>
                       
    
                        <div class="row">
    
                            <div class="col-12">
            {{this.$route.params.id}}
                                 
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
                items:[],
                fields:['id','name','fundsource','projectstatus']

            }
        },
        methods:{

            getProgram(){
                var self=this;

                axios.get('/asset/program/all').then((res)=>{

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
                })

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

