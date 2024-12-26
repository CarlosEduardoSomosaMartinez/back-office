import { Box, TextField ,Button, Typography} from "@mui/material";
import React, { useEffect, useState } from "react";
import { StyledBox } from "./FormularioClient.Styled";
import { useSelector } from "react-redux";
import { useFetch } from "../../../hooks/useFetch";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const FormularioClient = ({onClose,setAction,action,row,callback})=>{
    const [confirmForm,setConfirmForm]= useState(false)
    const [response,setResponse] = useState(row||{});
    const token = useSelector((state)=>state.auth.token)

    const {data,loading,error} = useFetch(
        confirmForm?callback:()=>Promise.resolve(null),[response,token]
    )

    const handleSubmit = (e) =>{
        e.preventDefault()
        
        try{  
            setConfirmForm(true)
        }catch(err){
        }
    }

    const handleChange = (e)=>{  
        const {name,value} = e.target;
        setResponse((prev)=>({...prev,[name]:value}));
    }

    const handleClose=()=>{
        setAction("");
        onClose()
        window.location.reload()
        
    }



    return(
        <>
             <Typography sx={{textAlign:'center',margin:'10px'}}>{action==='update'?'Actualizar':'Registrar'}</Typography>
            {   !(data)? (<StyledBox component="form" onSubmit={handleSubmit}>
                <TextField required label="Nombre" name="name" value={response.name||""} onChange={handleChange} fullWidth/>
                <TextField required  type="email" label="Email" name="email" value={response.email||""} onChange={handleChange} fullWidth/>
                {action==='update' && <TextField label="code" name="code" value={response.code||""} onChange={handleChange} fullWidth disabled={action==='update'}/>}
                <TextField required label="Details" type="json" name="details" value={response.details||""} onChange={handleChange}  fullWidth/>
                {loading && <p>Cargando...</p>}
                {error && <p>Error al registrar elemento intente de nuevo</p>}
                <Button variant="contained" color="primary" type="submit">
                    Enviar
                </Button>
            </StyledBox>):(<Box sx={{display:'flex',flexDirection:'column',alignItems:'center',margin:'20px',marginTop:"0px"}}><Typography sx={{textAlign:'center',margin:'20px'}}>{action==='update'?'se Actualizo con exito!!!':'se Registro con exito!!!'}</Typography>
                                <CheckCircleOutlineIcon sx={{textAlign:'center',margin:'align',fontSize:'40px'}}/>
                                <Button onClick={handleClose}>Okay</Button>
                            </Box>)}
        </>
    )
}
export default FormularioClient 