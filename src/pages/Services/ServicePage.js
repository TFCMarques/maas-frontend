import * as React from 'react';
import { v4 as uuid } from 'uuid';
import { useHistory } from 'react-router';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Card, CardActions, MenuItem, Grid, Button,
  IconButton, CardContent, CardHeader, Container,
  TextField
} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SaveIcon from '@mui/icons-material/Save';

const mdTheme = createTheme()

const dummy = {
  uuid: uuid(),
  name: "Dummy Service",
  description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
  hook: "POST",
  url: "http://nowhereis.com/where/you/post"
}

export default function ServicePage() {
  const CHARACTER_LIMIT = 200;

  const history = useHistory()
  const [edit, setEdit] = React.useState(false)
  const [service, setService] = React.useState(dummy)

  const handleRun = () => null
  const handleEdit = () => setEdit(!edit)
  const handleDelete = () => null

  const handleCHange = field => event => {
    setService({ ...service, [field]: event.target.value})
  }

  const handleBack = () => {
    history.push("/services")
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
            title={service.name}
            titleTypographyProps={{ color: "white", fontWeight: "bold", fontSize: "20px" }}
          />
          <CardContent sx={{ p: "24px" }}>
            <Grid container spacing={3}>
              <Grid item sx={12} sm={4}>

              </Grid>
              <Grid item sx={12} sm={8}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      disabled
                      id="uuid"
                      name="uuid"
                      label="UUID"
                      fullWidth
                      multiline
                      inputProps={{ readOnly: true }}
                      value={service.uuid}
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
                      helperText={`Characters: ${service.description.length}/${CHARACTER_LIMIT}`}
                      value={service.description}
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
                      value={service.hook}
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
                      value={service.url}
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
              onClick={handleEdit}
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
      </Container>
    </ThemeProvider>
  );
}