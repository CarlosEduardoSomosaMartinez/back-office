import { Box, TextField, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { StyledBox } from "../Formulario.Styled";
import { useSelector } from "react-redux";
import { useFetch } from "../../../hooks/useFetch";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import OperationBasic from "../../../pages/home/logicHome";
import DropDown from "../../DropDown/DropDown";

const clientOp = new OperationBasic("clients");

const FormularioPeriodic= ({ onClose, setAction, action, row, callback }) => {
  const [confirmForm, setConfirmForm] = useState(false);
  const [response, setResponse] = useState(row || {});
  const token = useSelector((state) => state.auth.token);
  const resHook = useFetch(confirmForm ? callback : () => Promise.resolve(null), [response, token]);
  
  console.log("data 1")

  useEffect(() => {
    if (row) {
      setResponse(row); 
    }
  }, [row]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // const date = new Date()
    // response.last_updated=date.toDateString();
    setConfirmForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResponse((prev) => ({ ...prev, [name]: value }));
  };

    
  const handleDrop = (name, value) => {
    setResponse((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setAction("");
    onClose();
  };

 
  const renderForm = () => (
    <StyledBox component="form" onSubmit={handleSubmit}>
        <DropDown
        token={token}
        label="Client ID"
        value={response.client_id}
        onChange={(value) => handleDrop("client_id", value)}
        fetchOptions={clientOp.getTables}
      />
      <TextField
        required
        label="Name"
        name="name"
        value={response.name || ""}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        required
        label="Config"
        name="config"
        value={response.config || ""}
        onChange={handleChange}
        fullWidth
      />
    <TextField
        required
        label="Schedule"
        name="schedule"
        value={response.schedule || ""}
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

export default FormularioPeriodic;
