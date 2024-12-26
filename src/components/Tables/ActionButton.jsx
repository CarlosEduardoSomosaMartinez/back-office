import { Button } from "@mui/material";
import { StyledBox } from "./ActionButton.Styled";
import React from "react";


const ActionButton = ({action,select}) =>{
    

    return (
        <StyledBox>
            <Button onClick={()=>{
                select()
                action("delete")
               } 
            }>Borrar</Button>
            <Button onClick={()=>{
                select()
                action("update")}}>Actualizar</Button>
        </StyledBox>
    )

}

export default ActionButton