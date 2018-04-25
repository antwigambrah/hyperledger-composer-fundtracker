<template>
    <div>
        <div class="container-fluid">
            <div class="row">
    
                <side-bar></side-bar>
    
                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                    <div class="col-md-10 offset-md-1">
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
                            <h4> Projects</h4>
                        </div>
    
                        <div class="row search-row">
                            <div class="col-auto  mr-auto"><input class="form-control form-control-sm" type="text" placeholder="search">
                            </div>
                            <div class="col-auto">                       
           
                            </div>
                        </div>
                        <div class="row">
    
             <div class="col-12">
                {{this.$route.params.name}}
                                  <b-table striped hover :items="projects" :fields='fields'  v-loading="loading">
                                       <template slot="receipients" slot-scope="row">
                                          
         <button class="btn btn-sm btn-primary"  @click="modalShow = !modalShow">attach</button>

  <b-modal v-model="modalShow">
    <b-form-select v-model="receipient" :options="receipients" size="sm" />

     <div slot="modal-footer" class="w-100">
         <b-btn size="sm" class="float-right" variant="primary" @click="addReceipient(row.item.id)">
           ok
         </b-btn>
       </div>

    </b-modal>
      </template>

       <template slot="transfer" slot-scope="row">
                                          
        <button  class="btn btn-sm btn-primary" @click="initiateTransfer(row.item.id)"> initiate</button>
      </template>


                <template slot="actions" slot-scope="row">
                                          
        <router-link :to="{name: 'mmdaprojectsview', params: { id:row.item.id }}" class="btn btn-sm btn-primary"> view </router-link>
      </template>

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
    import SideBar from '../../mmda/sidebar'
    import {
        PlusSquareIcon
    } from 'vue-feather-icons'
    export default {
        mounted(){
            
            this.loading=true
        this.getProject()
        this.getReceipient();
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
                modalShow: false,
                loading:false,
                receipient:'',
                receipients:[],
                projects: [],
                    fields:[{
                        key:'id',label:'Id'},
                        {
                            key:'name',
                            label:'Name',
                        },
                        {
                            key:'fundsource',label:'FundSource'
                        },{
                            key:'allocation',
                            label:'Allocation'
                        },
                        {
                            key:'FundTransferStatus',
                            label:'FundTransferStatus'
                        },
                        {
                            key:'transfer',
                            label:'transfer'
                        },
                        {
                            key:'receipients',
                            label:'receipients'
                        },
                        {
                            key:'actions',
                            label:'View'
                        }]

            }
        },
        methods:{
            initiateTransfer(id){
                axios.post('/asset/project/initiatetransfer',{
                    'project':id
                }).then((res)=>{
                    console.log(res)
                })
            },
            getProject(){               
     axios.get('/asset/project/'+this.$route.params.name).then((res)=>{
                 console.log(res)
                this.projects= res.data.map((data)=>{
                   return {
                    'id':data.id,
                    'name':data.name,
                    'fundsource':data.FundSource,
                    'allocation':data.allocation,
                     'FundTransferStatus':data.FundTransferStatus,
                   }
                 })
                 this.loading=false;
                })
            },
            getReceipient(){
                var self=this;
                axios.get('/asset/fund-receipient/all').then((res)=>{
                    console.log(res)
                       if (res.data.length != 0) {
                        self.receipients = res.data.map((data) => {
    
                            return {
                                value: data.id,
                                text: data.name
                            }
                        })
                    }
                })
            },
            addReceipient(id){
                console.log(id)
                this.modalShow=false
                axios.post('/asset/project/attachreceipient',{
                    'project':id,
                    'receipient':this.receipient
                }).then((res)=>{
                    console.log(res)
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
