// const { RESTDataSource } = require('apollo-datasource-rest');
const axios = require('axios');
class GitHubAPI {
  constructor() {
    this.baseurl = "https://api.github.com/";
    this.auth = '?client_id=28ddb00e958e20e80330&client_secret=f2604eaafb3dc9afca773c76f8e0e84bb9591363';
    this.numResults = '&per_page=6';
  }

  // leaving this inside the class to make the class easier to test
  async userReducer(user) {
    const result = await axios(user.url + this.auth);
    const detailedUser = result.data;
    return {
        id: detailedUser.id || -1,
        login: detailedUser.login || 'not found',
        email: detailedUser.email,
        html_url: detailedUser.html_url,
        company: detailedUser.company,
        blog: detailedUser.blog,
        followers: detailedUser.followers,
        following: detailedUser.followers,
        avatar_url: detailedUser.avatar_url,
        bio: detailedUser.bio || '-',
        hireable: detailedUser.hireable,
        public_gists: detailedUser.public_gists,
        location:detailedUser.location,
        public_repos:detailedUser.public_repos,
        name:detailedUser.name
    };
  }

  async getAllUsers() {
    const response = await axios(this.baseurl + "users" + this.auth + this.numResults);
    const data = response.data ;
    // transform the raw launches to a more friendly
    return Array.isArray(data)
      ? data.map(user => this.userReducer(user)) : [];
  }

  async getUser({ login }) {
    const res = await this.get('users/'+login +this.auth);
    return this.userReducer(res);
  }

  async getUsersAtLocation({location}) {
    const response = await axios(this.baseurl + "search/users?q=location:" + location);
    const data = response.data ;
    return Array.isArray(data.items)
      ? data.items.map(user => this.userReducer(user)) : [];
  }

}

module.exports = GitHubAPI;