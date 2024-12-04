import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../src/features/authSlice';
import contactsReducer from '../src/features/contactSlice';
import Login from '../src/components/Login';
import Contacts from '../src/components/Contacts';
import '../src/App.css';

const store = configureStore({
  reducer: {
    auth: authReducer,
    contacts: contactsReducer,
  },
});

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
