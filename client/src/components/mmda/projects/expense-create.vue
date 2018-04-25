<template>
    <div>
        <form>
            <table class="table table-sm">
                <thead class="thead-light">
                    <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Description</th>
                        <th scope="col">Allocation</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="expense in expenses" :key="expense.id">
                        <th scope="row">{{expense.id}}</th>
                        <th scope="row">{{expense.description}}</th>
                        <th scope="row">{{expense.allocation}}</th>
                    </tr>
                </tbody>
            </table>
        </form>
        <hr>
        <div class="row">

            <div class="col-8 expense-add-column">
            
                    
            
                <div class="form-row">
                    <div class="form-group col-md-10">
                        <label for="inputPassword4">Description</label>
                        <textarea name="" id="" class="form-control for m-control-sm" v-model="description"></textarea>
    
                    </div>
                    <div class="form-group col-md-2">
                        <label for="inputPassword4">Allocation</label>
                        <input type="number" class="form-control form-control-sm" id="inputPassword4" v-model="allocation">
                    </div>
                </div>
            </div>
            <div class="col-4 total-column">
                <div class="float-right">
                    <h5>
                        TOTAL
                    </h5>
                    {{ totalExpense}}
                </div>
            </div>
    
    
        </div>
        <div class="row">
            <div class="col-auto mr-auto">
                <a  @click="addExpense" href="#"> <plus-square-icon></plus-square-icon> expense</a>
            </div>
            <div class="col-auto">
                      <form class="form" @submit.prevent="addProject">
                <button class="btn btn-success btn-sm"  type="submit">  submit <arrow-right-icon></arrow-right-icon>
                </button>
                      </form>

            </div>
        </div>    
    </div>
</template>

<script>
/*eslint-disable*/
    import {
        PlusSquareIcon
    } from 'vue-feather-icons'
    import {
        ThumbsUpIcon
    } from 'vue-feather-icons'
    import { ArrowRightIcon } from 'vue-feather-icons'
    export default {
        mounted(){
            this.$store.state.lastInsertId=''
            this.getProjects();
          console.log(this.$store.state.lastInsertId)
            this.getExpenses();
        },
        components: {
            PlusSquareIcon,
            ThumbsUpIcon,
            ArrowRightIcon
        },
        data() {
            return {
                description: '',
                allocation: 0,
                expenseId:'',
            }
        },
        methods: {
            getProjects(){
                var self=this;
                axios.get('/asset/project/all').then((res)=>{
                    if (res.data.length!=0) {
                let insertData= res.data[res.data.length -1]
                self.$store.state.lastInsertId=insertData.id

                    console.log( self.$store.state.lastInsertId)

                    }
                })
            },
            getExpenses(){
             var self=this;
                axios.get('/asset/expense/all').then((res)=>{
                    if (res.data.length!=0) {
                let insertData= res.data[res.data.length -1]
                self.expenseId=insertData.id
                    console.log(  self.expenseId)

                    }
                })

            },
            addExpense() {
                this.$store.state.project.expense.push({
                   'description': this.description,
                    'allocation': parseInt(this.allocation)
                })
            },
            addProject(){
                var self=this;
                console.log(self.$store.state.lastInsertId);
                axios.post('/asset/project/create',{
                    'id':self.$store.state.lastInsertId,
                    'name':self.$store.state.project.name,
                    'objective':self.$store.state.project.objective,
                    'fund':self.$store.state.project.fundsource,
                     'allocation':self.$store.state.project.allocation,
                     'mmda':self.$store.state.project.mmda,
                     'program':self.$store.state.project.program,

                         }).then((res)=>{

                            return  this.$store.state.project.expense.forEach(element => {
                      return  axios.post('/asset/expense/create',{
                      'id':self.expenseId,
                      'project':res.data.id,
                       'description':element.description,
                       'allocation':element.allocation
                       })     
                             });
               
                            }).then((res)=>{
                                console.log(res)
                                this.expenseId=res.data.id;
                            })

            }
        },
        computed: {
            expenses() {
                return this.$store.state.project.expense;
            },
            totalExpense() {
               
return  this.$store.state.project.expense.map(expense => expense.allocation ).reduce((a,b)=> a+b ,0)
               
            }
        }
    
    }
</script>

<style lang="scss" scoped>
    
</style>
