import IsAuthUser from "./IsAuthUser"
import Home from "../pages/home/Home"
import Users from "../pages/users/Users"
import Assistants from "../pages/Assistants/Assistants"

const privateRoutes = [
  {
   
    path:"home",
    element:<IsAuthUser auth={true}/>,
    children:[
      {
        index:true,
        element:<Home/>
      },
    ]
    
  },
  {
   
    path:"users",
    element:<IsAuthUser auth={true}/>,
    children:[
      {
        index:true,
        element:<Users/>
      },
    ]
    
  },
  {
   
    path:"assistants",
    element:<IsAuthUser auth={true}/>,
    children:[
      {
        index:true,
        element:<Assistants/>
      },
    ]
    
  }
]

export default privateRoutes