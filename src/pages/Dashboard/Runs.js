import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import axios from 'axios';

function preventDefault(event) {
  event.preventDefault();
}

export default function Runs() {
  const API_URL = "http://localhost:5001/maas-31124/us-central1/api"

  const [count, setCount] = React.useState(0);
  const [date, setDate] = React.useState("");

  React.useEffect(() => {
    getTotalRunsCount();
    getCurrentDate();
  })

  const getCurrentDate = () => {
    const date = new Date();
    setDate(date.toLocaleString("default", { day: "2-digit", month: "long", year: "numeric" }))
  }

  const getTotalRunsCount = () => {
    axios.get(`${API_URL}/stats/services/runs/total`).then((response) => {
      setCount(response.data.totalRuns);
    }).catch((err) => {
      console.error(`Error: ${err}`);
    })
  }

  return (
    <React.Fragment>
      <Typography variant="h6">Total Service Runs</Typography>
      <Typography component="p" variant="h4">
        {count}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on {date}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View Reports
        </Link>
      </div>
    </React.Fragment>
  );
}