/**
 * Test the repo list item
 */

import React from 'react';
import {render, getNodeText} from '@testing-library/react'

import RepoListItem from './RepoListItem';

describe.only('<RepoListItem />', () => {
  let item;

  // Before each test reset the item data for safety
  beforeEach(() => {
    item = {
      owner: {
        login: 'user'
      },
      html_url: 'https://github.com/facebook/create-react-app',
      name: 'create-react-app',
      open_issues_count: 20,
      full_name: 'facebook/create-react-app'
    };
  });

  it('should render a ListItem', () => {

    const { container } = render(<RepoListItem item={item} />);
    expect(container.querySelector('.list-item').childElementCount).toEqual(1)
  });

  it('should not render the current username', async () => {

    const { container } = render(<RepoListItem item={item} currentUser={item.owner.login} />);
    const text = getNodeText(container.querySelector('.repo-list-item__repo-link'))
    expect(text.includes(item.owner.login)).toBe(false)
  });

  it('should render usernames that are not the current one', () => {

    const { container } = render(<RepoListItem item={item} currentUser='nikgraf' />);
    const text = getNodeText(container.querySelector('.repo-list-item__repo-link'))
    expect(text.includes(item.owner.login)).toBe(true)
  });

  it('should render the repo name', () => {

    const { container } = render(<RepoListItem item={item} />);
    const text = getNodeText(container.querySelector('.repo-list-item__repo-link'))
    expect(text.includes(item.name)).toBe(true)
  });

  it('should render the issue count', () => {

    const { container } = render(<RepoListItem item={item} />);
    const text = getNodeText(container.querySelector('.repo-list-item__issue-link'))
    expect(text.includes(item.open_issues_count)).toBe(true)
  });

  it('should render the IssueIcon', () => {

    const { container } = render(<RepoListItem item={item} />);
    expect(container.querySelector('svg').childElementCount).toEqual(1)
  });
});
