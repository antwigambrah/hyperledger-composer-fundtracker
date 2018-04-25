<template>
    <div>
        <div class="container-fluid">
            <div class="row">
    
                <side-bar></side-bar>
    
                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                    <div class="col-md-10 offset-md-1">
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
                            <h4> Fund Sources</h4>
    
                        </div>
    
                        <div class="row search-row">
                            <div class="col-auto  mr-auto"><input class="form-control form-control-sm" type="text" placeholder="search">
                            </div>
                            <div class="col-auto">
    
                                <button class="btn btn-sm btn-outline-secondary" @click="modalShow = !modalShow" href="">
                                    <plus-square-icon></plus-square-icon>
                                    add source</button>
                                        <form class="form" @submit.prevent='addFundsource'>
                                            
                                      
                                <b-modal v-model="modalShow">
                                    <div slot="modal-header">
                                        Create
                                    </div>
    
                                    <div class="form-group">
                                        <input type="text" class="form-control form-control-sm" placeholder="Name" v-model="name">
                                    </div>
                                       <div class="form-group">
                                        <input type="number" class="form-control form-control-sm" placeholder="Allocation" v-model="allocation">
                                    </div>

                                     <div class="form-group">
                                        <label>choose mmda</label>
                                       <b-form-select v-model="mmda" :options="mmdas" class="mb-3" size="sm" />
                                    </div>

                                  
                                    <div slot="modal-footer" class="w-100">
                                        <button class="btn btn-sm float-left btn-success modal-btn">
                                                                                   Cancel
                                                                                </button>
                                        <button class="btn btn-sm float-right  modal-btn"  type="submit">
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
    import SideBar from '../../layout/side-bar'
    import {
        PlusSquareIcon
    } from 'vue-feather-icons'
    export default {

        mounted(){
            var self=this;
            
 self.$store.state.lastInsertId
            this.getFundSource();

              axios.get('/asset/mmda/all').then((req)=>{

                console.log(req.data)
                self.mmdas=req.data.map((data)=>{

                    return {
                        value:data.id,
                        text:data.name
                    }
                })
              })
        },
        components: {
            'nav-bar': Navbar,
            ActivityIcon,
            PlusSquareIcon,
            SideBar
        },
        data() {
    
            return {
                mmda:'',
                modalShow: false,
                name:'',
                allocation:'',
                mmdas:[],
                fields:['id','source','allocation','mmda'],
                items:[],
              }
        },
    methods:{
        getFundSource(){
            var self=this;

                axios.get('/asset/fund-source/all').then((res)=>{

                    if (res.data.length!=0) {
                    let insertData= res.data[res.data.length -1]
                self.$store.state.lastInsertId=insertData.id



                      res.data.map((data)=>{

                          if(data.MMDA){
          let id = data.MMDA.split("#").pop();

         axios.get('/asset/mmda/'+id).then((req)=>{

           
                        self.items.push({
                            'id':data.id,
                            'source':data.name,
                             'allocation':data.allocation,
                             'mmda':req.data.name
                        })

          })
       }

                      })


                    }
                }) 
},
        addFundsource(){
         var self=this;
                axios.post('/asset/fund-source/create',{
                    'id': self.$store.state.lastInsertId,
                    'name':self.name,
                    'allocation':self.allocation,
                    'mmdaid':self.mmda
                }).then((req)=>{
                    console.log(req)

                                this.getFundSource();
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

