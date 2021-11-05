import * as React from 'react';
import { useHistory, useParams } from 'react-router';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Card, CardActions, MenuItem, Grid, Button,
  IconButton, CardContent, CardHeader, Container,
  TextField, Snackbar, Alert
} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';

const mdTheme = createTheme();

export default function ServicePage() {
  const CHARACTER_LIMIT = 200;
  const API_URL = "http://localhost:5001/maas-31124/us-central1/api"

  const { serviceId } = useParams()
  const history = useHistory()
  const [openAlert, setOpenAlert] = React.useState(false)
  const [edit, setEdit] = React.useState(false)
  const [service, setService] = React.useState({})

  React.useEffect(() => {
    getService(serviceId);
  }, [serviceId])

  const getService = (serviceId) => {
    axios.get(`${API_URL}/services/${serviceId}`).then((response) => {
      setService(response.data);
    }).catch((err) => {
      console.error(`Error: ${err}`);
    })
  }

  const handleRun = () => null

  const handleEdit = () => setEdit(!edit)
  const handleAlertClose = () => setOpenAlert(false)

  const handleSave = () => {
    axios.put(`${API_URL}/services/${serviceId}`, service).then((response) => {
      setOpenAlert(true);
      setEdit(false);
    }).catch((err) => {
      console.error(`Error: ${err}`);
    })
  }

  const handleDelete = () => {
    axios.delete(`${API_URL}/services/${serviceId}`).then((response) => {
      history.push("/services");
    }).catch((err) => {
      console.error(`Error: ${err}`);
    })
  }

  const handleCHange = field => event => {
    setService({ ...service, [field]: event.target.value})
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
              <Grid item sx={12} sm={4}>

              </Grid>
              <Grid item sx={12} sm={8}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      disabled
                      id="uuid"
                      name="uuid"
                      label="UUID"
                      fullWidth
                      multiline
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
                      multiline
                      inputProps={{ readOnly: !edit }}
                      value={service.name ? service.name : ""}
                      onChange={handleCHange("name")}
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
                      value={service.description ? service.description : "No description"}
                      onChange={handleCHange("description")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      disabled={!edit}
                      select
                      id="webhook"
                      name="webhook"
                      label="Webhook"
                      fullWidth
                      inputProps={{ readOnly: !edit }}
                      value={service.hook ? service.hook : ""}
                      onChange={handleCHange("hook")}
                    >
                      <MenuItem key={"GET"} value={"GET"}>
                        {"HTTP GET"}
                      </MenuItem>
                      <MenuItem key={"POST"} value={"POST"}>
                        {"HTTP POST"}
                      </MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <TextField
                      disabled={!edit}
                      id="url"
                      name="url"
                      label="URL"
                      fullWidth
                      multiline
                      inputProps={{ readOnly: !edit }}
                      value={service.url ? service.url : ""}
                      onChange={handleCHange("url")}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end', p: "24px" }}>
            <Button
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
              { edit ? "Save" : "Edit" }
            </Button>
            <Button
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
              color="error"
              variant="contained"
              sx={{ width: "125px", fontWeight: "bold" }}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
        <Snackbar
          open={openAlert}
          autoHideDuration={5000}
          onClose={handleAlertClose}
          anchorOrigin={{vertical: "bottom", horizontal: "left"}}
        >
          <Alert onClose={handleAlertClose} variant="filled" severity="success">
            Sucessfully saved service updates!
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}