import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import ToyList from './components/ToyList';
import NewToyForm from './components/NewToyForm';
import About from './components/About';
import Contact from './components/Contact';

const router = BrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/home',
        element: <ToyList />
      },
      {
        path: '/add_new_toy',
        element: <NewToyForm />
      },
      {
        path: '/mission',
        element: <About />
      },
      {
        path: '/contact',
        element: <Contact />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();