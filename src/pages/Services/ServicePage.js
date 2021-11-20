import * as React from 'react';
import { useHistory, useParams } from 'react-router';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Card, CardActions, Grid, Button, Typography, Box,
  IconButton, CardContent, CardHeader, Container,
  TextField, Snackbar, Alert, TableContainer, Paper,
  Table, TableHead, TableBody, TableRow, TableCell
} from '@mui/material'

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import RefreshIcon from '@mui/icons-material/Refresh';
import axios from 'axios';
import ServiceRun from './ServiceRun';

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-tomorrow";

const mdTheme = createTheme();

export default function ServicePage() {
  const CHARACTER_LIMIT = 200;
  const API_URL = "http://localhost:5001/maas-31124/us-central1/api"

  const { serviceId } = useParams()
  const history = useHistory()
  const [openAlert, setOpenAlert] = React.useState(false)
  const [edit, setEdit] = React.useState(false)
  const [service, setService] = React.useState({})
  const [lastChange, setLastChange] = React.useState({})
  const [runs, setRuns] = React.useState([])
  const [alert, setAlert] = React.useState({})

  const editorStyle = {
    border: 1,
    borderRadius: "4px",
    borderColor: "grey.400",
    overflow: "hidden"
  };

  React.useEffect(() => {
    getService(serviceId);
    getServiceRuns(serviceId);
  }, [serviceId])

  const getService = (serviceId) => {
    axios.get(`${API_URL}/services/${serviceId}`).then((response) => {
      setService(response.data);
      setLastChange(response.data);
    }).catch((err) => {
      console.error(`Error: ${err}`);
    })
  }

  const getServiceRuns = (serviceId) => {
    axios.get(`${API_URL}/services/${serviceId}/runs`).then((response) => {
      setRuns(response.data);
    }).catch((err) => {
      console.error(`Error: ${err}`);
    })
  }

  const handleRun = () => {
    axios.post(`${API_URL}/services/${serviceId}/runs`).then((response) => {
      handleAlertOpen("Successfully run requested service!", "success")
      handleRefresh()
    }).catch((err) => {
      console.error(`Error: ${err}`);
    })
  }

  const handleEdit = () => {
    setEdit(!edit)
    setLastChange(service);
  }

  const handleAlertOpen = (message, severity) => {
    setAlert({message: message, severity: severity});
    setOpenAlert(true);
  }

  const handleAlertClose = () => {
    setOpenAlert(false)
  }

  const handleSave = () => {
    if(lastChange === service) {
      handleAlertOpen("No changes to save.", "warning");
      setEdit(false);
    } else {
      axios.put(`${API_URL}/services/${serviceId}`, service).then((response) => {
        handleAlertOpen("Successfully saved changes.", "success")
        setEdit(false);
      }).catch((err) => {
        console.error(`Error: ${err}`);
      })
    }
  }

  const handleDelete = () => {
    axios.delete(`${API_URL}/services/${serviceId}`).then((response) => {
      history.push("/services");
    }).catch((err) => {
      console.error(`Error: ${err}`);
    })
  }

  const handleChange = field => event => {
    setService({ ...service, [field]: event.target.value })
  }

  const handleRequestBodyChange = (newBody) => {
    setService({ ...service, requestBody: newBody })
  }

  const handleRefresh = () => {
    getServiceRuns(serviceId);
  }

  const handleCancel = () => {
    setService(lastChange);
    setEdit(false);
  }

  const handleBack = () => {
    history.push("/services");
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Card>
          <CardHeader
            action={
              <IconButton onClick={handleBack}>
                <ChevronLeftIcon sx={{ fontSize: "24px", color: 'white' }} />
              </IconButton>
            }
            sx={{ p: "16px 24px", backgroundColor: "primary.main" }}
            title={service.name ? service.name : ""}
            titleTypographyProps={{ color: "white", fontWeight: "bold", fontSize: "20px" }}
          />
          <CardContent sx={{ p: "24px" }}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      disabled
                      id="uuid"
                      name="uuid"
                      label="UUID"
                      fullWidth
                      inputProps={{ readOnly: true }}
                      value={service.uuid ? service.uuid : ""}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      disabled={!edit}
                      id="name"
                      name="name"
                      label="Service Name"
                      fullWidth
                      inputProps={{ readOnly: !edit }}
                      value={service.name ? service.name : ""}
                      onChange={handleChange("name")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      disabled={!edit}
                      id="description"
                      name="description"
                      label="Description"
                      fullWidth
                      multiline
                      rows={3}
                      inputProps={{ readOnly: !edit, maxLength: CHARACTER_LIMIT }}
                      helperText={`Characters: ${service.description ? service.description.length : 0}/${CHARACTER_LIMIT}`}
                      value={service.description ? service.description : ""}
                      onChange={handleChange("description")}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      disabled={true}
                      id="http-method"
                      name="http-method"
                      label="HTTP Method"
                      fullWidth
                      inputProps={{ readOnly: true }}
                      value={"POST"}
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      disabled={!edit}
                      id="url"
                      name="url"
                      label="URL"
                      fullWidth
                      inputProps={{ readOnly: !edit }}
                      value={service.url ? service.url : ""}
                      onChange={handleChange("url")}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid item xs={12} display="flex" flexDirection="column">
                  <Typography color={edit ? "black" : "grey.500"} sx={{ ml: "14px", mb: "5px" }}>
                    Request Body
                  </Typography>
                  <Box
                    sx={editorStyle}
                  >
                    <AceEditor
                      style={{ filter: edit ? "none" : "grayscale(100%) opacity(50%)" }}
                      height="253px"
                      width="100%"
                      mode="json"
                      theme="tomorrow"
                      id="request-body"
                      name="request-body"
                      label="Request Body"
                      value={service.requestBody ? service.requestBody : "{}"}
                      onChange={handleRequestBodyChange}
                      readOnly={!edit}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end', p: "0px 24px 24px" }}>
            <Button
              disabled={edit}
              startIcon={<PlayArrowIcon />}
              onClick={handleRun}
              variant="contained"
              color="success"
              sx={{ mr: "10px", width: "125px", fontWeight: "bold" }}
            >
              Run
            </Button>
            <Button
              startIcon={edit ? <SaveIcon /> : <EditIcon />}
              onClick={edit ? handleSave : handleEdit}
              variant="contained"
              sx={{ mr: "10px", width: "125px", fontWeight: "bold" }}
            >
              {edit ? "Save" : "Edit"}
            </Button>
            <Button
              startIcon={edit ? <CancelIcon /> : <DeleteIcon />}
              onClick={edit ? handleCancel : handleDelete}
              color="error"
              variant="contained"
              sx={{ width: "125px", fontWeight: "bold" }}
            >
              {edit ? "Cancel" : "Delete"}
            </Button>
          </CardActions>
        </Card>
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table aria-label="collapsible-table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "primary.main", height: "64px" }}>
                <TableCell colSpan={4} sx={{ color: "white", fontWeight: "bold", fontSize: "16px", p: "8px 24px" }}>
                  Service Runs:
                </TableCell>
                <TableCell align="right" sx={{ p: "8px 16px" }} colSpan={2}>
                  <IconButton onClick={handleRefresh}>
                    <RefreshIcon sx={{ fontSize: "24px", color: 'white' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ '& > *': { borderBottom: 'unset' } }}>
              {runs && runs.length !== 0 ?
                runs.map((run) => (
                  <ServiceRun key={run.uuid} run={run} />
                )) :
                <TableRow>
                  <TableCell colSpan={6}>
                    No runs available.
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </TableContainer>
        <Snackbar
          open={openAlert}
          autoHideDuration={3000}
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert onClose={handleAlertClose} variant="filled" severity={alert.severity}>
            {alert.message}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}