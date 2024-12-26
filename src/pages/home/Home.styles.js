import { styled,Box } from "@mui/material";

export const StyledBox = styled(Box)(({theme})=>({
    marginTop:'40px',
   display:'flex',
   flexDirection:'column',
    alignItems:'center',
    gap:'20px',
    justifyContent:'center'
}))

export const StyledButtonBox = styled(Box)(({theme})=>(
    {
        display:"flex",
        justifyContent:'flex-end',
        width:"95%",
        gap:"20px"
    }
))

export const StyledDivider = styled(Box)(({theme})=>({
    backgroundColor:theme.palette.background.paper,
    width:'86%',
    height:"2px",
   marginTop:'1%'

}))