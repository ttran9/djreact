import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from './routes';
import 'antd/dist/antd.css';

import CustomLayout from './containers/Layout';

function App() {
    /* BaseRouter evaluates what component needs to be displayed there */
    return (
      <div className="App">
        <Router>
            <CustomLayout>
            <BaseRouter />
          </CustomLayout>
        </Router>
    </div>
  );
}

export default App;
