import { Box, TextField, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { StyledBox } from "../Formulario.Styled";
import { useSelector } from "react-redux";
import { useFetch } from "../../../hooks/useFetch";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ButtonToggle from "../../buttonToggle/ButtonToggle";


const FormularioBalley= ({ onClose, setAction, action, row, callback }) => {
  const [confirmForm, setConfirmForm] = useState(false);
  const [response, setResponse] = useState(row || {});
  const token = useSelector((state) => state.auth.token);
  const resHook = useFetch(confirmForm ? callback : () => Promise.resolve(null), [response, token]);
  
  console.log(row)

  useEffect(() => {
    if (row) {
      setResponse(row); 
    }
  }, [row]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // const date = new Date()
    // response.last_updated=date.toDateString();
    console.log(response)
    setConfirmForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResponse((prev) => ({ ...prev, [name]: value }));
  };

    
  const handleClose = () => {
    setAction("");
    onClose();
  };

 
  const renderForm = () => (
    <StyledBox component="form" onSubmit={handleSubmit}>
      <ButtonToggle 
      label="enabled"
      value={response.enabled || ''}
      onChange={(newValue)=>{setResponse((prev) => ({ ...prev, ['enabled']: newValue }));}}
      />
    <ButtonToggle 
      label="Logged"
      value={response.logged_status || ''}
      onChange={(newValue)=>{setResponse((prev) => ({ ...prev, ['logged_status']: newValue }));}}
      />
         <TextField
        required
        label="Phone number"
        name="config"
        value={response.phone_number || ""}
        onChange={handleChange}
        fullWidth
      />
  
     
      {resHook.loading && <Typography>Cargando...</Typography>}
      {resHook.error && <Typography color="error">Error al regis trar elemento. Intente de nuevo.</Typography>}
      <Button variant="contained" color="primary" type="submit">
        Enviar
      </Button>
    </StyledBox>
  );

  const renderSuccess = () => (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "20px", marginTop: "0px" }}>
      <Typography sx={{ textAlign: "center", margin: "20px" }}>
        {action === "update" ? "¡Se actualizó con éxito!" : "¡Se registró con éxito!"}
      </Typography>
      <CheckCircleOutlineIcon sx={{ fontSize: "40px" }} />
      <Button onClick={handleClose}>Okay</Button>
    </Box>
  );

  return (
    <>
      <Typography sx={{ textAlign: "center", margin: "10px" }}>
        {action === "update" ? "Actualizar" : "Registrar"}
      </Typography>
      {!resHook.data ? renderForm() : renderSuccess()}
    </>
  );
};

export default FormularioBalley;
