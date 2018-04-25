<template>
    <form class="form" @submit.prevent='addProject'>
        <div class="form-group">
            <label>Project Name</label>
            <input type="text" class="form-control form-control-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="project name" v-model="name">
        </div>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label>Metropolitan,Municipal and District Assemblies </label>
                <b-form-select v-model="mmda" :options="mmdas" size="sm" />
            </div>
            <div class="form-group col-md-6">
                <label> Fund Source</label>
                <b-form-select v-model="fundsource" :options="fundsources" size="sm" />
            </div>
    
        </div>
        <div class="form-row">
            <div class="form-group col-md-12">
                <label>Program</label>
                <b-form-select v-model="program" :options="programs" size="sm" />
            </div>
        </div>
    
        <div class="form-row">
            <div class="form-group col-md-12">
                <label>Objective</label>
                <input type="text" class="form-control form-control-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="project objective" v-model="objective">
            </div>
        </div>
    
        <div class="form-row">
            <div class="form-group col-md-6">
                <input type="number" class="form-control form-control-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="allocation" v-model="allocation">
            </div>
        </div>
    
        <button class="btn btn-sm btn-primary  float-right" type='submit'> submit 
                   <arrow-right-icon></arrow-right-icon>
                   </button>
    </form>
</template>

<script>
    import {
        ArrowRightIcon
    } from 'vue-feather-icons'
    import Spinner from 'vue-spinner-component/src/Spinner.vue'
    /*eslint-disable*/
    export default {
        mounted() {
            this.getMMda()
            this.getProgram()
            this.getProject()
    
        },
        components: {
            ArrowRightIcon,
            Spinner
        },
    
        data() {
            return {
                showSpinner: false,
                active:'active',
                color:'#fffff',
                size:2,
                name: '',
                mmda: '',
                fundsource: '',
                program: '',
                objective: '',
                allocation: 0,
                mmdas: [],
                budget: '',
                fundsources: [{
                    value: 'IGF',
                    text: 'IGF'
                }, {
                    value: 'CFC',
                    text: 'CFC'
                }, {
                    value: 'CIDA',
                    text: 'CIDA'
                }, {
                    value: 'DDF',
                    text: 'DDF'
                }, {
                    value: 'UDG',
                    text: 'UDG'
                }, {
                    value: 'GOG',
                    text: 'GOG'
                }],
                programs: []
            }
        },
        methods: {
            getMMda() {
                var self = this;
    
                axios.get("/asset/mmda/all").then((res) => {
    
                    if (res.data.length != 0) {
                        self.mmdas = res.data.map((data) => {
    
                            return {
                                value: data.id,
                                text: data.name
                            }
                        })
                    }
                })
            },
            getProgram() {
                var self = this;
    
                axios.get("/asset/program/all").then((res) => {
    
                    if (res.data.length != 0) {
                        self.programs = res.data.map((data) => {
    
                            return {
                                value: data.id,
                                text: data.name
                            }
                        })
                    }
                })
            },
            async addProject() {
                var self = this;
                await this.getBudget();

                 
              await   axios.post('asset/project/create',{
                    'id': self.$store.state.lastInsertId,
                    'name': self.name,
                    'objective': self.objective,
                    'fund': self.fundsource,
                    'allocation': self.allocation,
                    'mmda': self.mmda,
                    'program': self.program,
                    'budget': self.budget
                 })

                
                
              
    
            },
            async getBudget() {
                var self = this;
           
            
                let budget = await axios.get('/asset/budget/all');
    
                if (budget) {
                    budget.data.map((data) => {
                    
                    
                        if (self.mmda==data.mmdaid) {
                         
                            self.budget=data.id
                            console.log(self.budget)
                        }
    
                    })
    
    
                }
            },
             async getProject() {
                
                console.log('same')
                var self = this;
                this.projects=[]
                axios.get('asset/project/all').then((res) => {
                    if (res.data.length != 0) {
                        let insertData = res.data[res.data.length - 1]
                        self.$store.state.lastInsertId = insertData.id
                    
    
                    }
                })
            }
    
        },
    
    
    }
</script>

<style>
    
</style>
