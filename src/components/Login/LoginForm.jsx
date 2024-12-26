
import { TextField } from "@mui/material";
import { ButtonGeneralCustom } from "../ButtonCustom/ButtonCustom";
import { StyledBox } from "./LoginForm.styles";
import { useEffect, useState } from "react";
import { onChangeForm,onSubmitForm } from "../../pages/login/logicLogin";
import Modal from "./Modal";
import { useDispatch,useSelector} from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";


const LoginForm = ()=>{
    const isAuth = useSelector((state)=>state.auth.isAuthenticated);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const dispath = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(isAuth){
            navigate('/home')
        }
    },[isAuth,navigate])


    const handleSubmit= async  (e) =>{
        e.preventDefault()
         await onSubmitForm(email,password ,dispath);

    }

    return (<form onSubmit={handleSubmit}>
        <Modal message=" email/password incorrectos"/>
        <TextField label="Email" type="email" variant="outlined"  fullWidth margin="normal"  value={email} onChange={onChangeForm(setEmail)} required/>
        <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" value={password} onChange={onChangeForm(setPassword)} required/>
        <StyledBox>
            <ButtonGeneralCustom label="login" typed="submit" />
        </StyledBox>
        
    </form>)
}

export default LoginForm;