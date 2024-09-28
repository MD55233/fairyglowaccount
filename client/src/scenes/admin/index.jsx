import React from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { useGetAdminsQuery } from "state/api";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import CustomColumnMenu from "components/DataGridCustomColumnMenu";

const Admin = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if the screen is small (mobile)
  const { data, isLoading } = useGetAdminsQuery();

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
      minWidth: 100,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      minWidth: 100,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
      minWidth: 100,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
      minWidth: 100,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ADMINS" subtitle="Managing admins and list of admins" />
      <Box
        mt="40px"
        height={isMobile ? "60vh" : "75vh"} // Adjust height for mobile
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
          components={{
            ColumnMenu: CustomColumnMenu,
          }}
          autoHeight={isMobile} // Auto height for mobile
          pageSize={isMobile ? 5 : 10} // Adjust page size for mobile
          rowsPerPageOptions={isMobile ? [5] : [5, 10, 25]} // Responsive rows per page
        />
      </Box>
    </Box>
  );
};

export default Admin;
