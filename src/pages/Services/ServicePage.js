import * as React from 'react';
import { useHistory } from 'react-router';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Card, CardActions, Typography, Button,
  IconButton, CardContent, CardHeader, Container
} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const mdTheme = createTheme()

export default function ServicePage() {
  const history = useHistory()

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
            title={"Service Name"}
            titleTypographyProps={{ color: "white", fontWeight: "bold", fontSize: "20px" }}
          />
          <CardContent sx={{ p: "24px"}}>
            <Typography
              variant='h6'
              fontWeight='bold'
            >
              Description:
            </Typography>
            <Typography
              variant='body1'
            >
              A fan brush is a fantastic piece of equipment. Use it. Make friends with it. How do you make a round circle with a square knife? That's your challenge for the day. Let's have a nice tree right here. Only eight colors that you need. If you don't like it - change it. It's your world.
            </Typography>
            <Typography
              variant='h6'
              fontWeight='bold'
            >
              Webhook Method:
            </Typography>
            <Typography
              variant='body1'
            >
              A fan brush is a fantastic piece of equipment. Use it. Make friends with it. How do you make a round circle with a square knife? That's your challenge for the day. Let's have a nice tree right here. Only eight colors that you need. If you don't like it - change it. It's your world.
            </Typography>
            <Typography
              variant='h6'
              fontWeight='bold'
            >
              URL:
            </Typography>
            <Typography
              variant='body1'
            >
              A fan brush is a fantastic piece of equipment. Use it. Make friends with it. How do you make a round circle with a square knife? That's your challenge for the day. Let's have a nice tree right here. Only eight colors that you need. If you don't like it - change it. It's your world.
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end', p: "24px"}}>
            <Button
              startIcon={<PlayArrowIcon />}
              onClick={null}
              variant="contained"
              color="success"
              sx={{ mr: "10px", width: "125px", fontWeight: "bold" }}
            >
              Run
            </Button>
            <Button
              startIcon={<EditIcon />}
              onClick={null}
              variant="contained"
              sx={{ mr: "10px", width: "125px", fontWeight: "bold" }}
            >
              Edit
            </Button>
            <Button
              startIcon={<DeleteIcon />}
              onClick={null}
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