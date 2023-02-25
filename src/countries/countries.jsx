import React, { useState, forwardRef } from "react";
import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { CountrieList } from "./countryDetails";
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};
// initialize a GraphQL client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://countries.trevorblades.com",
});

// write a GraphQL query that asks for names and codes for all countries
const LIST_COUNTRIES = gql`
  {
    countries {
      name
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`;

// create a component that renders a select input for coutries
export function Countries() {
  const defaultMaterialTheme = createTheme();
  const { data, loading, error } = useQuery(LIST_COUNTRIES, { client });
  const [selectedRow, setSelectedRow] = useState("");
  const [details, setdetails] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const countryList = structuredClone(data?.countries);

  const viewDetails = (items) => {
    setdetails(items);
    setSelectedRow(items.name);
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <Box sx={{ p: 10 }}>
      <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable
          isLoading={loading || error ? true : false}
          title="Country List"
          columns={[
            { title: "Country", field: "name" },
            { title: "Capital", field: "capital" },
            { title: "Currency", field: "currency" },
            { title: "Native", field: "native" },
            { title: "Emoji", field: "emoji" },
          ]}
          data={countryList}
          options={{
            sorting: true,
            search: true,
            searchAutoFocus: true,
            pageSize: 10,
            pageSizeOptions: [10, 20, 50],
            padding: "dense",
            actionsColumnIndex: -1,
            isLoading: true,
            headerStyle: {
              backgroundColor: "#01579b",
              color: "#FFF",
            },
            rowStyle: (rowData) => ({
              backgroundColor: selectedRow === rowData.name ? "#EEE" : "#FFF",
            }),
          }}
          icons={tableIcons}
          actions={[
            { icon: "" },
            {
              icon: () => <FormatListBulletedIcon />,
              onClick: (event, rowData) => viewDetails(rowData),
            },
          ]}
        />
      </ThemeProvider>
      <div>
        <Dialog
          open={openModal}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Country Details</DialogTitle>
          <DialogContent>
            <CountrieList details={details} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Box>
  );
}
