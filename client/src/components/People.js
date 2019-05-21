import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Person from './Person';
import styled from 'styled-components';
import { PulseLoader } from 'react-spinners';


const USERS_AT_LOCATION_QUERY = gql`
  query UsersAtLocationQuery($location: String,$sortBy: String) {
    usersInLocation (location: $location, sortBy: $sortBy) {
      login
      followers
      following
      html_url
      bio
      public_gists
      email
      html_url
      blog
      hireable
      location
      public_repos
      name
    }
  }
`;

const PeopleList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr ;
    grid-gap: 1rem;
    padding:1rem;

    /* Desktops */
    @media (min-width: 1281px) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    } 

    /* Laptops, Desktops */
    @media (min-width: 1025px) and (max-width: 1280px) {
        grid-template-columns: 1fr 1fr 1fr;
    } 

    /* Tablets, Ipads (portrait)*/
    @media (min-width: 768px) and (max-width: 1024px) {
        grid-template-columns: 1fr 1fr;
    } 

     /* Tablets, Ipads (portrait)*/
     @media (min-width: 481px) and (max-width: 767px) {
        grid-template-columns: 1fr;
    } 

    @media (min-width: 320px) and (max-width: 480px) {
        grid-template-columns: 1fr;
    }
    
`

const LoaderComponent = styled.div`
    width:100%;
    height:100%;
    margin:1rem;
    position:absolute;
    text-align:center;
`

class People extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Query query={USERS_AT_LOCATION_QUERY} variables={{ location: this.props.locationInput, sortBy: this.props.sortBy }}>
                    {({ loading, error, data }) => {
                        if (loading) {

                            return <LoaderComponent>
                                <PulseLoader
                                    sizeUnit={"px"}
                                    color={'#444'}
                                    loading={loading}
                                />
                            </LoaderComponent>;
                        };
                        if (error) console.log(error);
                        console.log(this.props.sortBy)
                        console.log('test waiting for')
                        if(!data) {
                            console.log('fixed')
                            return <PeopleList></PeopleList>
                        }
                        let queryData = data[Object.keys(data)[0]]
                        return (
                            <PeopleList>

                                {queryData.map(user => (
                                    <Person key={user.id} user={user} />
                                ))}
                            </PeopleList>
                        );
                    }}
                </Query>
            </React.Fragment>
        );
    }
}

export default People;