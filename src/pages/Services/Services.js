import * as React from 'react';
import axios from 'axios';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Card, Modal, CardActionArea, CardContent, Container,
  Grid, Typography, Snackbar, Alert
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ServiceForm from './ServiceForm';
import ServiceCard from './ServiceCard';

const mdTheme = createTheme()

export default function Services() {
  const API_URL = "http://localhost:5001/maas-31124/us-central1/api"

  const [open, setOpen] = React.useState(false)
  const [openAlert, setOpenAlert] = React.useState(false)
  const [services, setServices] = React.useState([])

  React.useEffect(() => {
    getAllServices();
  }, [])

  const getAllServices = () => {
    axios.get(`${API_URL}/services`).then((response) => {
      setServices(response.data);
      console.log(response.data)
    }).catch((err) => {
      console.error(`Error: ${err}`);
    })
  }

  const createNewService = (name, description, url, requestBody) => {
    let newService = {
      name: name,
      description: description,
      url: url,
      httpMethod: "POST",
      requestBody: requestBody
    }

    axios.post(`${API_URL}/services`, newService).then((response) => {
      setServices(services => [...services, response.data]);
      setOpenAlert(true);
    }).catch((err) => {
      console.error(`Error: ${err}`);
    })
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleAlertClose = () => setOpenAlert(false)

  return (
    <ThemeProvider theme={mdTheme}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={5}>
          {services.map((service) => {
            return (
              <ServiceCard
                key={service.uuid}
                uuid={service.uuid}
                name={service.name}
                httpMethod={service.httpMethod}
              />
            )
          })}
          <Grid item align="center" xs={12} sm={3}>
            <Card sx={{ width: 250, backgroundColor: "primary.main" }}>
              <CardActionArea onClick={handleOpen}>
                <CardContent sx={{ height: 300, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <AddIcon sx={{ fontSize: 75, margin: "30% 0 10% 0", color: "white" }} />
                  <Typography sx={{ flex: 1, fontWeight: 'bold', color: "white" }}>
                    Create new Service
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ServiceForm create={createNewService} handler={handleClose} />
        </Modal>
        <Snackbar
          open={openAlert}
          autoHideDuration={5000}
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert onClose={handleAlertClose} variant="filled" severity="success">
            Successfully created a new Service!
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  )
}