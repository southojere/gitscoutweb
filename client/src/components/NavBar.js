import React, { Component } from 'react';
import styled from 'styled-components';

import Radio from '@material-ui/core/Radio';

const Nav = styled.div`
    display: flex;
    flex-direction:row;
    flex-flow: wrap;
    justify-content: flex-end;
    align-items:center;
    background:white;

    >*:first-child {
        margin-right:auto;
    }
    
    >* {
        margin-right:20px;
    }

    @media (max-width: 620px) {
        flex-direction: column;
        padding:1rem;

        >*:first-child {
            margin:0;
        }
    }
`

const Logo = styled.h1`
    margin-left:2rem;
`

const SearchIcon = styled.i`
    margin-right:2rem;
`

const LocationInput = styled.input`
    padding: 12px 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    @media (max-width: 620px) {
        width: 100%;
    }
`

const LanguageSelection = styled.select`
    padding: 12px 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    @media (max-width: 620px) {
        width: 100%;
    }
`

const SearchButton = styled.button`
    background:none;
    border:none;
    @media (max-width: 620px) {
        background: darkgray;
        border-radius:4px;
        width: 100%;
        height: 3rem;
    }
`
class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            parentState: props.parent,
            location: '',
            radioOption: 'followers'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.radioChange = this.radioChange.bind(this)
    }


    handleChange(event) {
        this.setState({ location: event.target.value });
    }

    /**
     * Handles the form submission
     */
    handleSubmit(event) {
        event.preventDefault();
        console.log('submitted')
        console.log(this.state.radioOption)
        this.props.onChange(this.state.location, this.state.radioOption)
    }


    radioChange(event) {
        console.log(this.state.radioOption)
        this.setState({ radioOption: event.target.value });
        console.log(this.state.radioOption)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Nav>
                    <Logo>GitScout</Logo>

                    <p>Filter by:</p>
                    <LocationInput type="text" id="location" name="location" placeholder="Wellington" value={this.state.location} onChange={this.handleChange} />


                    <LanguageSelection>
                        <option value="java">Java</option>
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                    </LanguageSelection>

                    <div className="radioGroup">
                        <Radio
                            checked={this.state.radioOption === 'followers'}
                            onChange={this.radioChange}
                            color="default"
                            value="followers"
                            name="sortby"
                        />Followers
                     <Radio
                            checked={this.state.radioOption === 'repositories'}
                            onChange={this.radioChange}
                            color="default"
                            value="repositories"
                            name="sortby"
                        />Repositories
                    </div>

                    <SearchButton type="submit" value="Submit">
                        <SearchIcon button className="fas fa-search"></SearchIcon>
                    </SearchButton>
                </Nav>
            </form >

        );
    }
}

export default NavBar;