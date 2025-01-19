import { Box, styled } from "@mui/material";

export const StyledBox = styled(Box)(({theme})=>(
    {
        margin:'20px',
        display:'flex',
        flexDirection:'column',
        width:'400px',
        height:'800px',
        alignItems:'center',
        justifyContent:'space-between'
    }
))