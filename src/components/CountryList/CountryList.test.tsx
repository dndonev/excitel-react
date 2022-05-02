import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CountryList from './CountryList';

describe('<CountryList />', () => {
  test('it should mount', () => {
    // render(<CountryList />);
    
    const countryList = screen.getByTestId('CountryList');

    expect(countryList).toBeInTheDocument();
  });
});