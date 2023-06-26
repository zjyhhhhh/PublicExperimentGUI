import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import IterationTableToolbar from "./IterationTableToolbar";

interface Props {
  experimentId: string;
  bucketId: string;
  rows: IterationTableRow[];
  handleDelete: () => void;
  handleToggleModal: () => void;
}

const IterationTable = ({
  experimentId,
  bucketId,
  rows,
  handleDelete,
  handleToggleModal,
}: Props) => {
  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      flex: 4,
      sortable: false,
      renderCell: (params) => {
        return (
          <a href={`/experiment/${experimentId}/${params.row.id}`} style={{ color: "blue" }}>
            {params.value}
          </a>
        );
      },
    },
    {
      field: "startTime",
      headerName: "Start Time",
      flex: 1,
      valueFormatter: (params) => params.value.slice(0, 10),
    },
    // {
    //   field: "stopTime",
    //   headerName: "Stop Time",
    //   flex: 1,
    //   valueFormatter: (params) => params.value.slice(0, 10),
    // },
  ];

  const [rowsSelctedIds, setRowsSelectedIds] = React.useState<String[]>([]);

  return (
    <div style={{ width: "100%" }}>
      <IterationTableToolbar
        handleDelete={handleDelete}
        experimentId={experimentId}
        bucketId={bucketId}
        rowsSelctedIds={rowsSelctedIds}
        // handleDelete={handleDelete}
        handleToggleModal={handleToggleModal}
      />
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onRowSelectionModelChange={(ids) => {
          const selectedIds = ids.map((id) => String(id));
          setRowsSelectedIds(selectedIds);
        }}
        getRowId={(row: any) => row.id}
      />
    </div>
  );
};

export default IterationTable;