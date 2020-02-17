import React from 'react';
import {render} from '@testing-library/react'

import Footer from './index';

describe('<Footer />', () => {
  it('should render the copyright notice and credits', () => {

    const { getByText } = render(<Footer />);
    expect(getByText('This project is licensed under the MIT license.')).toBeDefined()
    expect(getByText('Nervatura')).toBeDefined()
  });
});
