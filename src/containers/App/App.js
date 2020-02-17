import React, { Component, Suspense, lazy } from 'react'
import MetaTags from 'react-meta-tags';
import { Route, Switch } from "wouter";
import connectToDevTools from 'remotedev-react-state'

import './style.scss';
import { AppProvider } from './context'

import LoadingIndicator from 'components/LoadingIndicator'
import Header from 'components/Header'
import Footer from 'components/Footer'

const HomePage = lazy(() => import('containers/HomePage'));
const FeaturePage = lazy(() => import('containers/FeaturePage'));
const NotFound = lazy(() => import('containers/NotFoundPage'));

class App extends Component {

  componentDidMount() {
    /* istanbul ignore next */
    if(process.env.NODE_ENV !== 'production' && typeof window === 'object' 
      && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__){
        // Connect to devtools after setup initial state
        connectToDevTools(this, {name: "App"})
      }
  }

  render() {
    return (
      <div className="app-wrapper">
        <AppProvider value={{ data: this.state, actions: this.actions }}>
          <MetaTags>
            <title>React.js Boilerplate</title>
            <meta name="description" content="A React.js Boilerplate application" />
          </MetaTags>
          <Header />
          <Suspense fallback={<LoadingIndicator />}>  
            <Switch>
              <Route path="/"><HomePage /></Route>
              <Route path="/features"><FeaturePage /></Route>
              <Route path="/:rest*"><NotFound /></Route>
            </Switch>
          </Suspense>
          <Footer />
        </AppProvider>
      </div>
    );
  }
}

export default App;
