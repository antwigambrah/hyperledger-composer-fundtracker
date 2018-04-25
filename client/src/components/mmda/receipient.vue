<template>
    <div>
        <div class="container-fluid">
            <div class="row">
    
                <side-bar></side-bar>
    
                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                    <div class="col-md-10 offset-md-1">
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
                            <h4> Fund Receipient</h4>
    
                        </div>
    
                        <div class="row search-row">
                            <div class="col-auto  mr-auto"><input class="form-control form-control-sm" type="text" placeholder="search">
                            </div>
                            <div class="col-auto">
    
                                <button class="btn btn-sm btn-outline-secondary" @click="modalShow = !modalShow" href="">
                                            <plus-square-icon></plus-square-icon>
                                            add receipient</button>

                                            <form class="form" @submit.prevent="addfundReceipient">
                                    
                                <b-modal v-model="modalShow">
                                    <div slot="modal-header">
                                        Create
                                    </div>
    
                                    <div class="form-group">
                                        <input type="text" class="form-control form-control-sm" placeholder="account number" v-model="accountnumber">
                                    </div>
      <div class="form-group">
                                        <input type="email" class="form-control form-control-sm" placeholder="email" v-model="email">
                                    </div>
                                      <div class="form-group">
                                        <input type="text" class="form-control form-control-sm" placeholder="mobile" v-model="mobile">
                                    </div>
    
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-6 ">
                     <input type="checkbox" v-model="receipienttype" true-value="company" false-value="individual"> Company
                                            </div>
    
                                            <div class="col-6 ">
                                                <input type="checkbox" v-model="receipienttype" true-value="individual" false-value="company"> Individual </div>
                                        </div>
                                    </div>
    

                                     <div class="form-group" v-if=" receipienttype=='individual'">
                                        <input type="text" class="form-control form-control-sm" placeholder="firstname" v-model="firstname">
                                    </div>
                                     <div class="form-group" v-if="receipienttype=='individual'">
                                        <input type="text" class="form-control form-control-sm" placeholder="lastname" v-model="lastname">
                                    </div>
                                     <div class="form-group" v-if="receipienttype=='company'">
                                        <input type="text" class="form-control form-control-sm" placeholder="company name" v-model="companyname">
                                    </div>
                           <div class="form-group">
                                        <input type="text" class="form-control form-control-sm" placeholder="tin number" v-model="tin">
                                    </div>
                                    <div slot="modal-footer" class="w-100">
                                        <button class="btn btn-sm float-left modal-btn">
                                                                                           Cancel
                                                                                        </button>
                                        <button class="btn btn-sm float-right btn-success   modal-btn" type="submit">
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
    import Navbar from '../layout/nav-bar'
    import {
        ActivityIcon
    } from 'vue-feather-icons'
    import SideBar from '../mmda/sidebar'
    import {
        PlusSquareIcon
    } from 'vue-feather-icons'
    export default {
        mounted(){
           
           this.getReceipients()


        },
        components: {
            'nav-bar': Navbar,
            ActivityIcon,
            PlusSquareIcon,
            SideBar
        },
        data() {
    
            return {
                receipienttype:'',
                firstname:'',
                lastname:'',
                accountnumber:'',
                mobile:'',
                email:'',
                companyname:'',
                tin:'',
                modalShow: false,
                name: '',
                allocation:'',
                lastInsertId:'',
                bank:'Prudential',
                items:[],
                fields:['id','name','receipienttype','tin']
            }
        },
        methods:{
            getReceipients(){

                var self=this;

            axios.get('/asset/fund-receipient/all').then((res)=>{
                if(res.data.length!=0){
                  
                let insertData= res.data[res.data.length -1]
                
                self.$store.state.lastInsertId=insertData.id
                      
                      res.data.map((data)=>{
                        self.items.push({
                            'id':data.id,
                            'name':data.name,
                            'receipienttype':data.receipienttype,
                             'tin':data.tin
                        })
                      })
                }

               })
            },
            addfundReceipient(){
                var self=this;
                    axios.post('/asset/fund-receipient/create',{
                        'id':this.$store.state.lastInsertId,
                       'name': self.receipienttype=='individual'?self.firstname +self.lastname:self.companyname,
                        'email':self.email,
                        'receipienttype':self.receipienttype,
                        'mobile':self.mobile,
                        'accountnumber':self.accountnumber,
                        'tin':self.tin,
                        'bank':self.bank
                    }).then((req)=>{
                        this.modalShow=false
                          self.getReceipients();
                          console.log(req)
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

