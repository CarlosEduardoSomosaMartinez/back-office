import { Typography } from "@mui/material";
import React from "react";

const Channels = [
    'WhatsApp',
    'Instagram',
    'MercadoLibre',
    'Whatsapp (gen)',
    'Instagram (gen)',
    'Demo (gen)',
    'WhatsApp (demo)',

]

const TypeLabel = ({ type }) => {
    return <Typography>{Channels[type]}</Typography>


}

export default TypeLabel