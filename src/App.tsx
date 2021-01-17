import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import AttendantsComponent from './component/AttendantsComponent';
import HostComponent from './component/HostComponent';

function App() {
  return (
    <BrowserRouter>
      <Route path="/host/@:room" component={HostComponent}/>
      <Route path="/attendant/@:room" component={AttendantsComponent} /> 
    </BrowserRouter>
  );
}

export default App;
