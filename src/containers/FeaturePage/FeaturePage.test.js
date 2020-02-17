import React from 'react';
import {render} from '@testing-library/react'

import FeaturePage from './index';

describe('<FeaturePage />', () => {
  it('should render its heading', () => {

    const { getByText, rerender } = render(<FeaturePage />);
    expect(getByText('Features').tagName).toEqual('H1')
    //should never re-render the component
    rerender(<FeaturePage />)
  });

});
