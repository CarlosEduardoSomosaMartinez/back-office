import AxiosFactory from "./AxiosFactory";

class ApiClientManager{
    static instance = {};

    static getClient(name,baseUrl,auth={},option={}){ 
        if(!this.instance[name]){
            const headers = {
                ...option.headers,
                ...(auth.type === 'header' && auth.key?{Authorization:`Bearer ${auth.key}`}:{})
            }

            const params = {
                ...option.params,
                ...(auth.type == 'query' && auth.key? {apiKey:auth.key}:{})
            }

            this.instance[name] = AxiosFactory.createClient(baseUrl,{...option,headers,params});
        }
        return this.instance[name];
    


    }

    static setAuth(name,auth){
        this.instance[name].defaults.headers['Authorization'] = `Bearer ${auth}`
    }
    
    
}

export default ApiClientManager;