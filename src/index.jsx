import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route, Routes, BrowserRouter,
} from 'react-router-dom';
import './config/firebaseConfig';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import Image from './components/Image';
import assetManager from './assets/initMagazine';
import AdminLayout from './Pages/AdminPages/AdminLayout';
// import reportWebVitals from './reportWebVitals';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/magazines" element={<App />}>
            <Route path=":id" element={<App />} />
          </Route>
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="/test" element={<Image imageList={assetManager.issue18Images} />} />
          <Route path="/" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
