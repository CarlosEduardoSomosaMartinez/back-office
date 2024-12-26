import React, { useEffect, useState } from "react";
import GenericTable from "../../components/Tables/GenericTable";
import OperationBasic from "./logicHome.js"
import { useSelector } from "react-redux";
import { useFetch } from "../../hooks/useFetch";
import ActionButton from "../../components/Tables/ActionButton";
import {useModal} from "./../../hooks//useModal"
import Modal from "../../components/Tables/modal/Modal";
import FormularioClient from "../../components/Tables/formularioClient/FormularioClient";
import Delete from "../../components/Tables/Delete/Delete";
import { Button, Box } from "@mui/material";
import { StyledBox,StyledButtonBox,StyledDivider } from "./Home.styles";
const operaciones = new OperationBasic('clients')

const Home = () =>{
    const [selectRow,setSelect] = useState(null)
    const [action,setAction] = useState("")
    const token = useSelector((state)=>state.auth.token)
    const {data,loading,error} =useFetch(operaciones.getTables,[token])
    const [items,setItems] = useState(data)
    const {isOpen,closeModal,openModal,toggleModal} = useModal();
    

    const columns = [
        {field:"id",headerName:'ID',flex:1,isDrop:true},
        {field:"name",headerName:'Name',flex:1},
        {field:"email",headerName:'Email',flex:1},
        {field:"code",headerName:'Code',flex:1},
        {field:"details",headerName:"Details",flex:1},
        {
            field:'actiones',
            headerName:"Actiones",
            flex:1,
            renderCell:(params)=> (<ActionButton    action={setAction}  select={()=>setSelect(params.row)}  />)     
        }
    ]

    useEffect(()=>{
        setItems(data)
    },[data])


    useEffect(()=>{
        openModal()
    },[action,selectRow])
    
    useEffect(()=>{
        if(action==='sDelete'){
            const filterdata = items.filter(element=>element.id!==selectRow.id)
            setItems(filterdata)
            setAction('')
        }
        
    },[action])


    return (
        <StyledBox>
                <StyledButtonBox>
                    <StyledDivider></StyledDivider>
                    <Button onClick={()=>{setSelect({});setAction('create')}}>Nuevo Elemento</Button>
                </StyledButtonBox>
                {action && <Modal  isOpen={isOpen}   row={selectRow} action={action} handleClose={closeModal} setAction={setAction} callback={action==='update'?operaciones.editItem:action==='create'?operaciones.createItem:operaciones.deleteItem}   Component={action==='delete'?Delete:FormularioClient} />}
                {items && <GenericTable columns={columns} data={items}/>}
             
        </StyledBox>
    )
}

export default Home;