import { createAsyncThunk } from "@reduxjs/toolkit";    
import AuthClient from "../../api/auth";
import { CssOutlined } from "@mui/icons-material";

const login = createAsyncThunk(
    "auth/Login",
    async({email,password},{rejectWithValue})=>{
        try{           
            const response = await AuthClient.login(email,password);   
            return response;
        }catch(err){
            return rejectWithValue(err||"error data");
           
        }
    }
)

export default login;