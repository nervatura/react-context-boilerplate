import React from 'react';
import {render} from '@testing-library/react'

import ReposList from './index';

describe('<ReposList />', () => {
  it('should render the loading indicator when its loading', () => {

    const { container } = render(<ReposList loading />);
    expect(container.querySelector('.list-wrapper')).toBeDefined()
  });

  it('should render an error if loading failed', () => {

    const { getByText } = render(<ReposList loading={false} error={{ message: 'Loading failed!' }} />);
    expect(getByText(/Something went wrong/)).toBeDefined()
  });

  it('should render the repositories if loading was successful', () => {
    const repos = [
      {
        owner: {
          login: 'facebook'
        },
        html_url: 'https://github.com/facebook/create-react-app',
        name: 'create-react-app',
        open_issues_count: 20,
        full_name: 'facebook/create-react-app'
      }
    ];

    const { container } = render(<ReposList repos={repos} error={false} />);
    expect(container.querySelectorAll('.list-item').length).toBe(1)
  });

  it('should not render anything if nothing interesting is provided', () => {

    const { container } = render(<ReposList repos={false} error={false} loading={false} />);
    expect(container.querySelectorAll('.list-item').length).toBe(0)
  });
});
