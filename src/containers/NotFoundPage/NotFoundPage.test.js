/**
 * Testing the NotFoundPage
 */

import React from 'react';
import {render} from '@testing-library/react'

import NotFound from './index';

describe('<NotFound />', () => {
  it('should render the Page Not Found text', () => {
    const { getByText } = render(<NotFound />);
    expect(getByText('Page not found.').tagName).toEqual('H1')
  });
});
