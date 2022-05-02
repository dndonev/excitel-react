import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Pager from './Pager';

describe('<Pager />', () => {
  test('it should mount', () => {
    // render(<Pager />);
    
    const pager = screen.getByTestId('Pager');

    expect(pager).toBeInTheDocument();
  });
});