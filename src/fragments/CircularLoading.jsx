import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function CircularLoading() {
  return (
    <div className="circular-loading-overlay">
      <CircularProgress size={200} />
    </div>
  );
}