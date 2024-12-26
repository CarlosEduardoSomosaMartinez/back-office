


function ApiClient(name,baseURL,auth={},option={}){
    return function(target,key){
        target[key] = ApiClientManager.getClient(name,baseURL,auth,option)
    }
}

export default ApiClient;