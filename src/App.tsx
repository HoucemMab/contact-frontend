import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { DefaultLayout } from 'layouts/DefaultLayout';
import { HomePage } from 'pages/Home';
import { AddContactPage } from 'pages/AddContactPage';
import { ContactDetailsPage } from 'pages/ContactDetailsPage';
import { getContacts } from 'store/contact/slice'
import { useAppDispatch } from 'store/hooks';


const App: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getContacts({ page: 1 }));
  })

  return (
    <BrowserRouter>
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="contacts" element={<HomePage />} />
          <Route path="contacts/:id" element={<ContactDetailsPage />} />
          <Route path="contacts/add" element={<AddContactPage />} />
          <Route index element={<HomePage />} />
        </Routes>
      </DefaultLayout>
    </BrowserRouter >
  );
}

export default App;
