import * as React from 'react';
import { Card, Grid, Button, CardContent, Typography, CardActions } from "@mui/material";
import { useHistory } from 'react-router';

export default function ServiceCard(props) {
  const history = useHistory()

  const handleSelect = () => {
    history.push(`/services/${props.uuid}`)
  }

  return (
    <Grid item align="center" xs={12} sm={3}>
      <Card sx={{ width: 250, height: 300, padding: 3 }}>
        <Grid container direction="column" spacing={3}>
          <Grid item align="center" xs={12}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              fontWeight="bold"
            >
              {props.name}
            </Typography>
          </Grid>
          <Grid item align="center" xs={12}>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              ID: {props.uuid}
            </Typography>
          </Grid>
          <Grid item align="center" xs={12}>
            <Typography
              variant="body1"
              fontWeight="bold"
            >
              Webhook Verb: {props.hook}
            </Typography>
          </Grid>
        </Grid>
        <Grid item align="center">
          <Button
            onClick={handleSelect}
            variant="contained"
            sx={{ fontWeight: "bold" }}
          >
            Select
          </Button>
        </Grid>
      </Card>
    </Grid>
  )
}