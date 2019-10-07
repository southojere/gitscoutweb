import React, { Component } from 'react';


class Person extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            BIO_SUMMARY_MAX_LENGTH: 220
        };
    }

    /**
     * Responsible for rendering out the info values (Gists, followers, following ...)
     * and applying the approriate class to the highest of them, to style it green.
     * 
     * @param {String} infoName - current info we are rendering public_gists,public_repos,followers, following
     * @param {Number} value - corresponding value of info
     */
    infoValue(infoName, value) {
        let user = this.state.user;
        // only interested in info components
        let reduced = {
            public_gists: user.public_gists,
            public_repos: user.public_repos,
            followers: user.followers,
            following: user.following
        }
        let highestInfoName = Object.keys(reduced).reduce((a, b) => reduced[a] > reduced[b] ? a : b);
        if (highestInfoName === infoName) {
            return <h3 className="highestValue">{value}</h3>;
        } else {
            return <h3>{value}</h3>;
        }
    }

    render() {

        //hireable or not
        let hireable;
        if (this.state.user.hireable) {
            hireable = <span className="hireable"><p>Hireable</p></span>
        } else {
            hireable = <span className="nothireable"><p>-</p></span>
        }

        //email
        let email;
        if (this.state.user.email) {
            email = <p>{this.state.user.email}</p>
        } else {
            email = <p>No email found</p>
        }

        return (

            <div className="personContainer">
                <div className="languages">
                    <p>JavaScript</p>
                    <p>Node</p>
                    <p>CSS</p>
                </div>
                <div className="info">
                    <div>
                        <p>Gist</p>
                        {
                            this.infoValue('public_gists', this.state.user.public_gists)
                        }
                    </div>
                    <div>
                        <p>Contributions</p>
                        <h3>-</h3>
                    </div>
                    <div>
                        <p>Repos</p>
                        {
                            this.infoValue('public_repos', this.state.user.public_repos)
                        }
                    </div>
                    <div>
                        <p>Following</p>
                        {
                            this.infoValue('following', this.state.user.following)
                        }
                    </div>
                    <div>
                        <p>Followers</p>
                        {
                            this.infoValue('followers', this.state.user.followers)
                        }
                    </div>
                </div>
                <div className="bio">
                    <p>{this.state.user.bio.length < this.state.BIO_SUMMARY_MAX_LENGTH ? 
                        this.state.user.bio : 
                        this.state.user.bio.substring(0, this.state.BIO_SUMMARY_MAX_LENGTH) + '...'}</p>
                    {
                        email
                    }
                </div>
                <div className="name">
                    <a href={this.state.html_url}><h4>{this.state.user.name} <span className="login">{this.state.user.login}</span></h4></a>
                    <p className="location">{this.state.user.location}</p>
                    {
                        hireable
                    }
                </div>
            </div>
        );
    }
}

export default Person;