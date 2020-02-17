import React from 'react';
import {render} from '@testing-library/react'

import ListItem from './index';

describe('<ListItem />', () => {
  it('should have a className', () => {

    const { container } = render(<ListItem className="test" />);
    expect(container.querySelectorAll('.test')).toBeDefined()
  });

  it('should render the content passed to it', () => {
    
    const content = <div>Hello world!</div>;
    const { getByText } = render(<ListItem item={content} />);
    expect(getByText('Hello world!')).toBeDefined()
  });
});
