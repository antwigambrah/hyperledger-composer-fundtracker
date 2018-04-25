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

 <el-steps :space="200" :active="state" finish-status="success">
    <el-step title="Loaded" ></el-step>
    <el-step title="RCC"></el-step>
    <el-step title="Fund Administrator"></el-step>
    <el-step title="Accoutant"></el-step>
    <el-step title="Auditor"></el-step>
    <el-step title="CAGD"></el-step>
</el-steps>
                       
<!--     
                        <div class="row table-row">
    
                            <div class="col-12">
                                    <h4>Project History</h4>
      <b-table striped hover :items="historian" :fields='fields'  v-loading="loading">
          <template slot="table-caption">
   <b-modal ref="myModalRef" hide-footer title="" size="lg" >
      <div class="row">
          <div class="col-6 left-column">

  <h6>Initial</h6>
  <div class="row modal-row">
  <div class="col-auto mr-auto">Allocation</div>
  <div class="col-auto">{{initial.allocation}}</div>
</div>
<div class="row  modal-row">
  <div class="col-auto mr-auto">GOG</div>
  <div class="col-auto">{{initial.GOG}}</div>
</div>
<div class="row  modal-row">
  <div class="col-auto mr-auto">IGF</div>
  <div class="col-auto">{{initial.IGF}}</div>
</div>
<div class="row  modal-row">
  <div class="col-auto mr-auto">CFC</div>
  <div class="col-auto">{{initial.CFC}}</div>
</div>
<div class="row  modal-row">
  <div class="col-auto mr-auto">CIDA</div>
  <div class="col-auto">{{initial.CIDA}}</div>
</div>
<div class="row  modal-row">
  <div class="col-auto mr-auto">DDF</div>
  <div class="col-auto">{{initial.DDF}}</div>
</div>
<div class="row  modal-row">
  <div class="col-auto mr-auto">UDG</div>
  <div class="col-auto">{{initial.UDG}}</div>
</div>

     
          </div>

          <div class="col-6">
  <h6>Change</h6>
  <div class="row modal-row">
  <div class="col-auto mr-auto">Allocation</div>
  <div class="col-auto">{{change.allocation}}</div>
</div>
<div class="row  modal-row">
  <div class="col-auto mr-auto">GOG</div>
  <div class="col-auto">{{change.GOG}}</div>
</div>
<div class="row  modal-row">
  <div class="col-auto mr-auto">IGF</div>
  <div class="col-auto">{{change.IGF}}</div>
</div>
<div class="row  modal-row">
  <div class="col-auto mr-auto">CFC</div>
  <div class="col-auto">{{change.CFC}}</div>
</div>
<div class="row  modal-row">
  <div class="col-auto mr-auto">CIDA</div>
  <div class="col-auto">{{change.CIDA}}</div>
</div>
<div class="row  modal-row">
  <div class="col-auto mr-auto">DDF</div>
  <div class="col-auto">{{change.DDF}}</div>
</div>
<div class="row  modal-row">
  <div class="col-auto mr-auto">UDG</div>
  <div class="col-auto">{{change.UDG}}</div>
</div>
          </div>
      </div>
  
    </b-modal>
    </template>

             <template slot="actions" slot-scope="row">                                         
    <button  class="btn btn-primary btn-sm" @click="showModal(row.item.initial,row.item.change)">view</button>
          </template>
          


             
           </b-table>


                                 
                            </div>
                        </div> -->
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
    import SideBar from '../../mmda/sidebar'
    import {
        PlusSquareIcon
    } from 'vue-feather-icons'
    export default {
        mounted(){
            this.loading=true;
        this.getProject();
        this.getHistrian()
        console.log('same')
        },
        components: {
            'nav-bar': Navbar,
            ActivityIcon,
            PlusSquareIcon,
            SideBar
        },
        data() {
    
            return {
                    loading:false,
                    status:'',
                    state:1,
                    loaded:'',
                    initiate:'',
                    inprogress:'',
                    underreview:'',
                    approved:'',
                    rejected:'',
                    historian:[],
                    initial:{},
                    change:{},
                    fields:[
                        {
                            key:'id',label:'id',
                        },
                        {
                            key:'transactioninvoked',
                            label:'Transaction Invoked'
                        },
                        {
                            key:'invokedby',
                            label:'Invoked By'
                        },
                        {
                            key:'from',
                            label:'from'
                        },       
                        {
                            key:'timestamp',
                            label:'Timestamp'
                        },
                        // {
                        //  key:'inital',
                        //     label:'initial'
                        // },
                        { key: 'actions', label: 'view'},
                    ]
            }
        },
        computed:{
        getInitial()      
        {
            return this.initial
        },
        getChange(){
            return this.change
        }
          },
        methods:{
            checkStatus(){
                if(this.status='LOADED'){
                this.state=1
                }else if(this.status='INITIATED'){
                    this.state=2
                } else if(this.status='INPROGRESS'){
                    this.state=3
                }else if(this.status='UNDERREVIEW'){
                    this.state=4
                } else if(this.status='REJECTED'){
                    this.state=5
                } else if(this.status='APPROVED'){
                    this.state=6
                }
            },
            getHistrian(){        
     axios.get('/asset/project/'+this.$route.params.id+'/historian').then((res)=>{
             console.log(res)
             this.loading=false;
             this.historian=res.data;
                })
            },
            getProject(){
      axios.get('/asset/project/mmda/'+this.$route.params.id).then((res)=>{
                  console.log(res)
             
                  this.status=res.data.ProjectStatus
                  this.checkStatus()
                })
            },
                showModal (initial,change) {
          this.initial=initial
          this.change=change

      this.$refs.myModalRef.show()
    },
    hideModal () {
      this.$refs.myModalRef.hide()
    }
        }
    }
</script>

<style lang="scss" scoped>
    .search-row {
        margin-bottom: 20px;
    }
    .table-row{
        margin-top: 10px;
    }

    .modal-body{
        padding-bottom: 0 !important;
    }
    .left-column{
        border-right: 1px solid #e4e4e4
    }
    .modal-row{
        border-bottom:  1px solid #e4e4e4;
        padding:10px;
    }
</style>
