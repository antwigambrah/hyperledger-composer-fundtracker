/*eslint-disable*/
class AssetService {
 async add(name,data){
    let res =await axios.post('/asset/'+name+','+data)
    return res.data;
 }
 async getById(){

 }
 async all(name){
     let res =await axios.get('/asset/'+name);
     return res.data;

 }
}
export default new AssetService();