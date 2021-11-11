import * as React from 'react';
import {
  Button, Grid, Paper, TextField, Typography, Box
} from "@mui/material";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-tomorrow";

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
  const CHARACTER_LIMIT = 200;

  const editorStyle = {
    border: 1,
    borderRadius: "4px",
    borderColor: "grey.400",
    overflow: "hidden"
  };

  const [name, setName] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [url, setUrl] = React.useState("")
  const [requestBody, setRequestBody] = React.useState({})

  const handleSubmit = (event) => {
    event.preventDefault()
    props.create(name, description, url, requestBody)
    props.handler()
  }

  function onRequestBodyChange(newBody) {
    setRequestBody(newBody)
    console.log(newBody)
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
              onChange={(event) => setName(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="description"
              name="description"
              label="Description"
              fullWidth
              multiline
              rows={3}
              variant="filled"
              value={description}
              inputProps={{ maxLength: CHARACTER_LIMIT }}
              helperText={`Characters: ${description.length}/${CHARACTER_LIMIT}`}
              onChange={(event) => setDescription(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              disabled
              id="http-method"
              name="http-method"
              label="HTTP Method"
              fullWidth
              value={"POST"}
              variant="filled"
            >
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
              onChange={(event) => setUrl(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} display="flex" flexDirection="column">
            <Typography>
              Request Body
            </Typography>
            <Box
              sx={editorStyle}
            >
              <AceEditor
                height="144px"
                width="100%"
                mode="json"
                theme="tomorrow"
                id="request-body"
                name="request-body"
                label="Request Body"
                defaultValue={"{}"}
                onChange={onRequestBodyChange}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
          </Grid>
          <Grid item xs={3} sm={3}>
            <Button
              sx={{ fontWeight: "bold" }}
              type="submit"
              variant="contained"
              fullWidth
            >
              Create Service
            </Button>
          </Grid>
          <Grid item xs={3} sm={3}>
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