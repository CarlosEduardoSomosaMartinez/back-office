import { Box, styled } from "@mui/material";

export const StyledBox = styled(Box)(({theme})=>(
    {
        margin:'10px',
        display:'flex',
        flexDirection:'column',
        width:'400px',
        height:'450px',
        alignItems:'center',
        justifyContent:'space-between'
    }
))