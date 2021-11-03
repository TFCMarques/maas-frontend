import * as React from 'react';
import { Card, Grid, Button, Typography, CardContent, CardActions, CardHeader } from "@mui/material";
import { useHistory } from 'react-router';

export default function ServiceCard(props) {
  const history = useHistory()

  const handleSelect = () => {
    history.push(`/services/${props.uuid}`)
  }

  return (
    <Grid item align="center" xs={12} sm={3}>
      <Card sx={{ width: 250, height: 300, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
        <CardHeader 
          title={props.name}
          titleTypographyProps={{fontWeight: "bold"}}
        />
        <CardContent>
          <Typography
            variant="body1"
            fontWeight="bold"
          >
            Webhook Method: {props.hook}
          </Typography>
        </CardContent>
        <CardActions sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Button
            onClick={handleSelect}
            variant="contained"
            sx={{ fontWeight: "bold" }}
          >
            Select
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}