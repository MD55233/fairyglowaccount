import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";

const Customers = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetCustomersQuery();
  console.log("data", data);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 120, // Minimum width to maintain usability
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
      flex: 1,
      minWidth: 130,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "country",
      headerName: "Country",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      minWidth: 100,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMERS" subtitle="List of Customers" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
         
          // Responsive styles
          overflowX: "auto", // Allow horizontal scrolling
          padding: "0 10px", // Add padding for mobile
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
          autoHeight // Automatically adjust height based on rows
          disableColumnMenu // Disable the column menu for simplicity on mobile
        />
      </Box>
    </Box>
  );
};

export default Customers;
