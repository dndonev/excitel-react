import styles from './App.module.scss';

import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Header from './components/Header/Header';
import CountryLayout from './components/CountryLayout/CountryLayout';
import CountryItem from './components/CountryItem/CountryItem';
import Autocomplete from './components/Autocomplete/Autocomplete';

const App: FC = () => (
  <main className={styles.App}>
    <Router>
      <Header />
      <Routes>
        <Route path='countries' element={ <CountryLayout/> } />
        <Route path='countries/:name' element={ <CountryItem/> } />
        <Route path='autocomplete' element={ <Autocomplete/> } />
        <Route path="*" element={ <Navigate to={ 'countries' } /> }></Route>
      </Routes>
    </Router>
  </main>
);

export default App;
