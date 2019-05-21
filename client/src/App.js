import React, { Component } from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import styled from 'styled-components';
import NavBar from './components/NavBar'
import People from './components/People';

const Main = styled.div`
  padding:0;
`

const client = new ApolloClient({
  uri: '/graphql'
});

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location: "",
      sortBy:""
    }
    
    this.navBarInputChange = this.navBarInputChange.bind(this)
  }

  /**
   * Call back function passed to our navbar, to allow us to pass the changed location to our query in
   * People component.
   * @param {String} location 
   */
  navBarInputChange(location,sortBy) {
    this.setState({
      location,
      sortBy
    })
    console.log('here1')
    console.log(this.state)
  }

  render() {
    const { location } = this.state
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Main>
            <NavBar parent={location} onChange={this.navBarInputChange} />
            <People locationInput={this.state.location} sortBy={this.state.sortBy} />
          </Main>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
