const axios = require('axios');

class GitHubAPI {
  constructor() {
    this.baseurl = "https://api.github.com/";
    this.auth = `?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`;
    // no auth -> just use normal api query without key
    if(process.env.GITHUB_CLIENT_ID || process.env.GITHUB_CLIENT_SECRET) {
      this.auth = "";
    }
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
        following: detailedUser.following,
        avatar_url: detailedUser.avatar_url,
        bio: detailedUser.bio || '-',
        hireable: detailedUser.hireable,
        public_gists: detailedUser.public_gists,
        location:detailedUser.location,
        public_repos:detailedUser.public_repos,
        name:detailedUser.name
    };
  }

  /**
   * deprecated - no need to get all users...
   */
  async getAllUsers() {
    const response = await axios(this.baseurl + "users" + this.auth + this.numResults);
    const data = response.data ;
    // transform the raw launches to a more friendly
    return Array.isArray(data)
      ? data.map(user => this.userReducer(user)) : [];
  }

  /**
   * Currently not used  
   */
  async getUser({ login }) {
    const res = await this.get('users/'+login +this.auth);
    return this.userReducer(res);
  }

  /**
   * 
   * @param {String} location city/location to search in
   * @param {String} sortBy how the result are going to be sorted i.e. followers, gists, repos...radio buttons 
   */
  async getUsersAtLocation({location,sortBy}) {
    const response = await axios(this.baseurl + "search/users?q=location:" + location + "+sort:" + sortBy);
    const data = response.data ;
    return Array.isArray(data.items)
      ? data.items.map(user => this.userReducer(user)) : [];
  }

}

module.exports = GitHubAPI;