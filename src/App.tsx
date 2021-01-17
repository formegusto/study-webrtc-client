import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import WebinarComponent from './component/WebinarComponent';

function App() {
  return (
    <WebinarComponent />
  );
}

export default App;
