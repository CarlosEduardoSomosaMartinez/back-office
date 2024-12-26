import ApiClientManager from "./apiClientManager"

class ApiService{

    authClient

     constructor(){
        this.authClient =  ApiClientManager.getClient('authApi',"http://localhost:3000",{type:'',key:""},{})
        
     }
  
    async login(email,password){
        try{
           const result =  await this.authClient.post('/login',{email,password})

           
           console.log(this.authClient.defaults)
           return(result.data)
        }catch(error){
            throw { message:error.message, data:error.response.data ,status:error.response.status}
        }



    }

    async getTable(name,token){
        try{
            this.authClient.defaults.headers['Authorization'] = `Bearer ${token}`
            const result = await this.authClient.get(`/${name}`)
          
            return (result.data)

        }catch(error){
            throw { message:error.message, data:error.response.data ,status:error.response.status} 
        }
    }

    
    async deleteElement(name,id,token){
        try{
            
            this.authClient.defaults.headers['Authorization'] = `Bearer ${token}`
            const result = await this.authClient.delete(`/${name}/${id}`)
            return result
          
        }catch(error){
            throw { message:error.message, data:error.response.data ,status:error.response.status}
        }
    }

    async updateElement(name,row,token){
        try{
             this.authClient.defaults.headers['Authorization'] = `Bearer ${token}`;
             const result = await this.authClient.put(`/${name}/${row.id}`,row)
             console.log(result)
             return result;
        }catch(error){
            console.log(error)
        }
    }

    async createItem(name,item,token){
        try{
            this.authClient.defaults.headers['Authorization'] = `Bearer ${token}`;
             const result = await this.authClient.post(`/${name}`,item)
             return result
        }catch(err){
            console.log(err)
        }
    }

}

const AuthClient = new ApiService();

export default AuthClient;