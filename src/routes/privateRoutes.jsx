import IsAuthUser from "./IsAuthUser"
import Home from "../pages/home/Home"

const privateRoutes = [
  {
   
    path:"home",
    element:<IsAuthUser auth={true}/>,
    children:[
      {
        index:true,
        element:<Home/>
      }
    ]
    
  }
]

export default privateRoutes