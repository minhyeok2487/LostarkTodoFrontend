import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import {createRoot} from "react-dom/client";

const root = document.getElementById('root');
const reactRoot = createRoot(root);

reactRoot.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);


reportWebVitals();