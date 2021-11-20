import * as React from 'react';
import {
  Collapse, IconButton, TableCell, TableRow,
  Table, TableBody, Chip
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Box } from '@mui/system';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import ConstructionIcon from '@mui/icons-material/Construction';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';

export default function ServiceRun(props) {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(!open);
  }

  const handleChipColor = () => {
    switch(props.run.status) {
      case "Starting":
        return "primary";
      case "Running":
        return "warning";
      case "Finished":
        return "success";
      default:
        return "error";
    }
  }

  const handleChipIcon = () => {
    switch(props.run.status) {
      case "Starting":
        return <HourglassTopIcon />;
      case "Running":
        return <ConstructionIcon />;
      case "Finished":
        return <CheckIcon />;
      default:
        return <ErrorIcon />;
    }
  }

  return (
    <React.Fragment>
      <TableRow key={props.key}>
        <TableCell sx={{ width: "30px" }} >
          <IconButton
            aria-label="expand-row"
            size="small"
            onClick={handleOpen}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="left" colSpan={3}>
          <span style={{ fontWeight: "bold" }}>UUID: </span> {props.run.uuid}
        </TableCell>
        <TableCell align="right" sx={{ pr: "24px" }}>
          <Chip 
            label={props.run.status} 
            size="small" 
            color={handleChipColor()} 
            icon={handleChipIcon()}
            sx={{ width: "100px", fontWeight: "bold", mr: "24px" }}
          />
          <span style={{ fontWeight: "bold" }}>Last Updated: </span>{props.run.lastUpdated}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ pb: 0, pt: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ m: 1 }}>
              <Table size="small" aria-label="logs">
                <TableBody>
                  {props.run.logs && props.run.logs.length !== 0 ?
                    props.run.logs.map((log, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {log}
                        </TableCell>
                      </TableRow>
                    )) : "No logs available. Try refreshing the logs component!"
                  }
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}