# gitscoutweb

Gitscout was created in response to people not being able to search and filter for people easily through Github. Aimed towards people who were looking for others to meet, such as those moving to new cities/countries or employers.

![Project Designs](https://i.imgur.com/nFI7Cvy.gif)

## Code Structure

/client folder contains the frontend of this application, that was built using create-react-app which can be run using 'npm run start'

In the root folder you will find the key backend files for our graphql server, the most important being server.js which the uses both schema.js (contain definition of types and querys) and GitHub.js (datasource connecting to github API).

<b>Videos that would help to learn the structure of the application: </b>https://www.youtube.com/watch?v=SEMTj8w04Z8&t=1548s

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development.

- npm to install dependencies
- then in the root folder outside the client you can run 'npm run dev' which will concurrently run the react app and node server.
  you can also run these individuality if you like.
- now the react app and the node graphql server should be running,you should be all done and ready to make changes now :)


## Deployment

-


## Built With

* [create-react-app](https://github.com/facebook/create-react-app) - The web framework used
* [Express](https://expressjs.com/) - express graphql server
* [GraphQL](https://graphql.org/code/#javascript) - API interface
* [Apollo Client](https://www.apollographql.com/docs/react/) - used for querying GraphQL interface to retrieve data from API, and caching.


## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* The code based was create from the help from https://www.youtube.com/watch?v=SEMTj8w04Z8&t=1548s
