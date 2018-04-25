<template>
    <form>
        <div class="form-group">
            <input type="text" class="form-control form-control-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="project name" v-model="project.name">
        </div>
        <div class="form-row">
            <div class="form-group col-md-6">
                  <label>MMda </label>
                <b-form-select v-model="project.mmda" :options="mmdas" size="sm" />
            </div>
            <div class="form-group col-md-6">
                  <label> Fund Source</label>
                <b-form-select v-model="project.fundsource" :options="fundsources" size="sm" />
            </div>
    
        </div>
        <div class="form-row">
            <div class="form-group col-md-12">
                <label>Program</label>
                <b-form-select v-model="project.program" :options="programs" size="sm" />
            </div>
        </div>
    
        <div class="form-row">
            <div class="form-group col-md-12">
                  <label>Objective</label>
                <input type="text" class="form-control form-control-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="project objective" v-model="project.objective">
            </div>
        </div>
    
        <div class="form-row">
            <div class="form-group col-md-6">
                <input type="number" class="form-control form-control-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="allocation" v-model="project.allocation">
            </div>
        </div>
    </form>
</template>

<script>
/*eslint-disable*/
    export default {
        mounted(){
            this.getMMda()
            this.getFundsource()
            this.getProgram()

        },
    
        data() {
            return {
                project: {
                    name:'',
                    mmda: '',
                    fundsource: '',
                    program: '',
                    objective: '',
                    allocation: 0,
                },
                mmdas: [],
                fundsources: [],
                programs:[]
            }
        },
        methods:{
            getProject(){

                axios.get('asset/project/all').then((res)=>{

                  if (res.data.length!=0) {
                let insertData= res.data[res.data.length -1]
                self.$store.state.lastInsertId=insertData.id

                console.log(res)

                    }
                })
            },
    getMMda(){
            var self=this;

            axios.get("/asset/mmda/all").then((res)=>{

                if (res.data.length!=0) {
                    self.mmdas=res.data.map((data)=>{

                        return {
                            value:data.id,
                            text:data.name
                        }
                    })
                }
            })
        },
         getProgram(){
            var self=this;

            axios.get("/asset/program/all").then((res)=>{

                if (res.data.length!=0) {
                    self.programs=res.data.map((data)=>{

                        return {
                            value:data.id,
                            text:data.name
                        }
                    })
                }
            })
        },
        getFundsource(){
            var self=this;

            axios.get("/asset/fund-source/all").then((res)=>{

                if (res.data.length!=0) {
                    self.fundsources=res.data.map((data)=>{

                        return {
                            value:data.id,
                            text:data.name
                        }
                    })
                }
            })
        }
        },
    
    
    }
</script>

<style>
    
</style>
