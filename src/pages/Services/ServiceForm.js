import * as React from 'react';
import { Button, Grid, MenuItem, Paper, TextField, Typography } from "@mui/material";

const style = {
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

export default function ServiceForm(props) {
  //const [name, setName] = React.useState("")
  //const [description, setDescription] = React.useState("")
  const [hook, setHook] = React.useState("")
  //const [url, setUrl] = React.useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("Hello World")
    props.create()
    props.handler()
  }

  return (
      <Paper sx={style}>
        <Typography
          fontWeight="bold"
          id="modal-modal-title"
          variant="h6"
          sx={{ mb: "25px" }}
          gutterBottom
        >
          Create a new Service
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="serviceName"
                name="serviceName"
                label="Service Name"
                variant="filled"
                onChange={(event) => null}
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
                onChange={(event) => null}
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
                onChange={(event) => setHook(event.target.value)}
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
                onChange={(event) => null}
              />
            </Grid>
            <Grid item xs={12} sm ={3}>
              <Button
                sx={{ fontWeight: "bold" }}
                type="submit"
                variant="contained"
                fullWidth
              >
                Create Service
              </Button>
            </Grid>
            <Grid item xs={12} sm ={3}>
              <Button
                sx={{ fontWeight: "bold" }}
                variant="contained"
                fullWidth
                color="error"
                onClick={props.handler}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
  );
}