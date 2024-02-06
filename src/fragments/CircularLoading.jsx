import * as React from 'react';
import {LinearProgress} from "@mui/material";

export default function CircularLoading() {
  return (
    <div className="loading-overlay">
        <LinearProgress color='success' style={{height:7}}/>
    </div>
  );
}