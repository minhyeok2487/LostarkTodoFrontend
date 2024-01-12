import * as React from 'react';
import {Box, LinearProgress} from "@mui/material";

export default function LinearIndeterminate() {
  return (
    <Box sx={{ position: 'fixed', top: 0, width:'100%', zIndex:99999 }}>
      <LinearProgress color='success' style={{height:7}}/>
    </Box>
  );
}