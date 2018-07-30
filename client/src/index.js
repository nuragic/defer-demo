import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import './index.css';
import DeferComparison from './components/DeferComparison';
import StoryList from './components/StoryList';
import StoryDetail from './components/StoryDetail';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const client = new ApolloClient({ uri: 'http://localhost:4000/graphql' });

const App = () => (
  <Router>
    <ApolloProvider client={client}>
      <Switch>
        <Route exact path="/comparison" component={DeferComparison} />
        <Route exact path="/" component={StoryList} />
        <Route path="/story/:id" component={StoryDetail} />
      </Switch>
    </ApolloProvider>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
