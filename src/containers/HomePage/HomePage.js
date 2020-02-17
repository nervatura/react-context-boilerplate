import React, { Component } from 'react';
import MetaTags from 'react-meta-tags';

import AppStore from 'containers/App/context'
import ReposList from 'components/ReposList';
import './style.scss';


class HomePage extends Component {
  static contextType = AppStore

  render() {
    const data = (this.context.data) ?  this.context.data : {}
    const username = (data.home) ? data.home.username || "" : ""
    const reposListProps = {
      loading: data.request || false,
      error: (data.home) ? data.home.error || false : false,
      repos: (data.home) ? data.home.repos || [] : []
    };
    return (
      <article>
        <MetaTags>
          <title>Home Page</title>
          <meta name="description" content="A React.js Boilerplate application homepage" />
        </MetaTags>
        <div className="home-page">
          <section className="centered">
            <h2>Start your next react project in seconds</h2>
            <p>
              A minimal <i>React Context API</i> boilerplate with all the best practices
            </p>
          </section>
          <section>
            <h2>Try me!</h2>
            <form onSubmit={(evt)=>{
                if (evt !== undefined && evt.preventDefault)
                  evt.preventDefault()
                if (username !== "")
                  this.requestGitHubData(username)
              }}>
              <label htmlFor="username">
                Show Github repositories by
                <span className="at-prefix">@</span>
                <input
                  id="username"
                  type="text"
                  placeholder="facebook"
                  value={username}
                  onChange={
                    (evt)=>this.changeValue("username", evt.target.value) }/>
              </label>
            </form>
            <ReposList {...reposListProps}/>
          </section>
        </div>
      </article>
    );
  }
}

export default HomePage;