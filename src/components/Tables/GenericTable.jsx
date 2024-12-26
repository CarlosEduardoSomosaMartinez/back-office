import React from "react";
import {StyledDataGrid} from "./GenericTables.styles.js"

const GenericTable = ({columns,data}) =>{

    return(
      <StyledDataGrid
      com
      columns={columns}
      rows={data}
      pageSize={5}
    />
    )
}

export default GenericTable;