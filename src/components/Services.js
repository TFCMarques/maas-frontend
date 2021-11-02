import * as React from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Button,
  Card, CardActionArea, CardContent, Container,
  Grid, MenuItem, Modal, Paper, TextField, Typography
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const mdTheme = createTheme()

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}

const ServiceForm = () => {
  const [hook, setHook] = React.useState("")

  const handleChange = (event) => {
    setHook(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault()
    console.log("Hello World")
  }

  return (
    <Paper sx={modalStyle}>
      <Typography
        fontWeight="bold"
        id="modal-modal-title"
        variant="h6"
        sx={{ mb: "25px" }}
        gutterBottom
      >
        Create a new Service
      </Typography>
      <form onSubmit={() => handleSubmit()}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="serviceName"
            name="serviceName"
            label="Service Name"
            variant="filled"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="description"
            name="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            variant="filled"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            select
            id="webhook"
            name="webhook"
            label="Webhook"
            fullWidth
            value={hook}
            onChange={handleChange}
            variant="filled"
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
            required
            id="url"
            name="url"
            label="URL"
            fullWidth
            variant="filled"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            sx={{ fontWeight: "bold" }}
            type="submit"
            variant="contained"
          >
            Create Service
          </Button>
        </Grid>
      </Grid>
      </form>
    </Paper>
  );
}

export default function Services() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <ThemeProvider theme={mdTheme}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={5}>
          <Grid item align="center" xs={3}>
            <Card sx={{ height: 300, width: 250 }} />
          </Grid>
          <Grid item align="center" xs={3}>
            <Card sx={{ height: 300, width: 250 }} />
          </Grid>
          <Grid item align="center" xs={3}>
            <Card sx={{ height: 300, width: 250 }} />
          </Grid>
          <Grid item align="center" xs={3}>
            <Card sx={{ height: 300, width: 250 }} />
          </Grid>
          <Grid item align="center" xs={3}>
            <Card sx={{ height: 300, width: 250 }} />
          </Grid>
          <Grid item align="center" xs={3}>
            <Card sx={{ width: 250, backgroundColor: "primary.main" }}>
              <CardActionArea onClick={() => handleOpen()}>
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
          <ServiceForm />
        </Modal>
      </Container>
    </ThemeProvider>
  )
}