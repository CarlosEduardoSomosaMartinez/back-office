import React, { useEffect, useState, useCallback } from "react";
import GenericTable from "../../components/Tables/GenericTable";
import OperationBasic from "./logicHome.js";
import { useSelector } from "react-redux";
import { useFetch } from "../../hooks/useFetch";
import ActionButton from "../../components/Tables/ActionButton";
import { useModal } from "../../hooks/useModal";
import Modal from "../../components/Tables/modal/Modal";
import FormularioClient from "../../components/Tables/formularioClient/FormularioClient";
import Delete from "../../components/Tables/Delete/Delete";
import { Button } from "@mui/material";
import { ContainerBox, StyledBox, StyledButtonBox, StyledDivider, NavbarContainer } from "./Home.styles";
import NavBar from "../../components/NavBar/NavBar.jsx";

const operaciones = new OperationBasic("clients");

const Home = () => {
  const [selectRow, setSelect] = useState(null);
  const [action, setAction] = useState("");
  const token = useSelector((state) => state.auth.token);
  const { data, loading, error } = useFetch(operaciones.getTables, [token]);
  const [items, setItems] = useState(data);
  const { isOpen, closeModal, openModal } = useModal();

  const handleSetAction = useCallback((newAction) => setAction(newAction), []);
  const handleSetSelect = useCallback((row) => setSelect(row), []);

  const columns = [
    { field: "id", headerName: "ID", flex: 1, isDrop: true },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "code", headerName: "Code", flex: 1 },
    {
      field: "actiones",
      headerName: "Actiones",
      flex: 1,
      renderCell: (params) => (
        <ActionButton action={handleSetAction} select={() => handleSetSelect(params.row)} />
      ),
    },
  ];

  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data]);

  useEffect(() => {
    if (action) {
      openModal();
    }
  }, [action]);

  useEffect(() => {
    if (action === "sDelete" || action == "reloded") {
      setAction("");
      operaciones.getTables(token)
      .then(fetchedData => {
        setItems(fetchedData);
      })
      .catch(error => {});
    }
  }, [action, selectRow,token]);

  return (
    <ContainerBox>
      <NavbarContainer>
        <NavBar />
      </NavbarContainer>
      <StyledBox>
        <StyledButtonBox>
          <StyledDivider />
          <Button onClick={() => { setSelect({}); setAction("create"); }}>Nuevo Elemento</Button>
        </StyledButtonBox>
        {action && isOpen && (
          <Modal
            isOpen={isOpen}
            row={selectRow}
            action={action}
            handleClose={closeModal}
            setAction={setAction}
            callback={
              action === "update"
                ? operaciones.editItem
                : action === "create"
                ? operaciones.createItem
                : operaciones.deleteItem
            }
            Component={action === "delete" ? Delete : FormularioClient}
          />
        )}
        {items && <GenericTable columns={columns} data={items} />}
      </StyledBox>
    </ContainerBox>
  );
};

export default Home;
