import * as React from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Card, Modal, CardActionArea, CardContent, Container, Grid, Typography, Snackbar, Alert } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ServiceForm from './ServiceForm';
import ServiceCard from './ServiceCard';

const mdTheme = createTheme()

export default function Services() {
  const [open, setOpen] = React.useState(false)
  const [openAlert, setOpenAlert] = React.useState(false)
  const [services, setServices] = React.useState([
    {
      uuid: "asbc-asda-sdadc-rres",
      name: "Strawberry",
      description: "Some strawberries",
      hook: "POST",
      url: "http://nowhere.com"
    }
  ])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleAlertClose = () => setOpenAlert(false)

  const createNewService = () => {
    let newService = {
      uuid: "asbc-asda-sdadc-rres",
      name: "Strawberry",
      description: "Some strawberries",
      hook: "POST",
      url: "http://nowhere.com"
    }

    setServices(services => [...services, newService]);
    setOpenAlert(true);
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={5}>
          {services.map((service) => {
            return (
              <ServiceCard uuid={service.uuid} name={service.name} hook={service.hook} />
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
          anchorOrigin={{vertical: "bottom", horizontal: "left"}}
        >
          <Alert onClose={handleAlertClose} variant="filled" severity="success">
            Successfully created a new Service!
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  )
}