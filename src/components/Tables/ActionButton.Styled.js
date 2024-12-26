import { Box, styled } from "@mui/material";    

export const StyledBox = styled(Box)(({theme})=>(
    {
        display:"flex",
        justifyContent:"space-evenly",
        gap:"10px"
    }
))