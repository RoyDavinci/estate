import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import './App.css';
import {Home} from './pages';

function App() {
  const router = createBrowserRouter([{path: '/', element: <Home />}]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
