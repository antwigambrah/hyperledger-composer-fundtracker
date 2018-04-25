
<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <side-bar></side-bar>
                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                    <div class="col-md-10 offset-md-1">
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
                            <h4>Budgets</h4>
    
                        </div>
    
                        <div class="row search-row">
                            <div class="col-auto  mr-auto">
    
                            </div>
                            <div class="col-auto">
    
                                <button class="btn btn-secondary-outline" @click="modalShow = !modalShow">
                        <plus-square-icon class="custom-class"></plus-square-icon>
                        allocation </button>
                                <form class="form" @submit.prevent="addBudget">
                                    <b-modal v-model="modalShow">
                                        <div slot="modal-header">
                                            Create
                                        </div>
    
                                        <div class="form-group">
                                            <input type="number" class="form-control form-control-sm" placeholder="Allocation" v-model="allocation">
                                        </div>
                                        <label>Metropolitan,Municipal and District Assembly</label>
                                        <b-form-select v-model="mmda" :options="mmdas" class="mb-3" size="sm" />
                                        <label>Fund Sources </label>
                                        <div class="form-group">
                                            <div class="form-row">
                                                <div class="col-6">
                                                    <input type="number" class="form-control form-control-sm" placeholder="GOG" v-model="gog">
                                                </div>
                                                <div class="col-6">
                                                    <input type="number" class="form-control form-control-sm" placeholder="IGF" v-model="igf">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="form-row">
                                                <div class="col-6">
                                                    <input type="number" class="form-control form-control-sm" placeholder="CFC" v-model="cfc">
                                                </div>
                                                <div class="col-6">
                                                    <input type="number" class="form-control form-control-sm" placeholder="CIDA" v-model="cida">
                                                </div>
                                            </div>
                                        </div>
    
                                        <div class="form-group">
                                            <div class="form-row">
                                                <div class="col-6">
                                                    <input type="number" class="form-control form-control-sm" placeholder="DDF" v-model="ddf">
                                                </div>
                                                <div class="col-6">
                                                    <input type="number" class="form-control form-control-sm" placeholder="UDG" v-model="udg">
                                                </div>
                                            </div>
    
                                        </div>
    
                                        <div slot="modal-footer" class="w-100">
                                            <button class="btn btn-sm float-left  modal-btn">
                                                                                        Cancel
                                                                                </button>
                                            <button class="btn btn-sm float-right btn-primary modal-btn" type="submit">
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
    import moment from 'moment'
    import AssetService from '../../../services/assetService'
import assetService from '../../../services/assetService';

            var self = this;
    export default {

       async mounted() {
            this.$store.state.lastInsertId=''
          await   this.getMMDA()
          await  this.getBudget()
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
                allocation: '',
                mmda: '',
                igf: '',
                cfc: '',
                cida: '',
                ddf: '',
                gog:'',
                udg:'',
                items: [],
                mmdas:[],
                fields: ['id', 'allocation', 'mmda', 'region','igf','cfc','cida','ddf','udg','gog'],
                id: '',
    
            }
        },
        methods: {
           async addBudget() {
               var self=this;
                let res = await axios.post('/asset/budget/create',{
                    'id': self.$store.state.lastInsertId,
                    'allocation': parseFloat( self.allocation),
                    'mmda': self.mmda,
                    'igf':parseFloat(self.igf),
                    'cfc':parseFloat(self.cfc),
                    'cida':parseFloat(self.cida),
                    'ddf':parseFloat(self.ddf),
                    'udg':parseFloat(self.udg),
                    'gog':parseFloat(self.gog)
                })
                console.log(res)
            
               await this.getBudget();
                 self.modalShow = false;

            },
           async  getBudget() {
                var self=this;
                this.items=[];
                let res =await axios.get('/asset/budget/all')
                if (res.data.length!=0) {
    
                        let insertData = res.data[res.data.length - 1]
                        self.$store.state.lastInsertId = insertData.id
                        console.log(self.$store.state.lastInsertId)     
                            self.items=res.data
    
    
                    }
    
            },
            async getMMDA() {
                var self = this;
              let res =await  axios.get('/asset/mmda/all')

               self.mmdas = res.data.map((data) => {
    
                        return {
                            value: data.id,
                            text: data.name
                        }
                    })
    
            }
        },
        computed: {
            regions() {
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
