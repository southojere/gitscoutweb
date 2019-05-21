# gitscoutweb

Gitscout was created in response to people not being able to search and filter for people easily through Github. Aimed towards people who were looking for others to meet, such as those moving to new cities/countries or employers.

## Code Structure

/client folder contains the frontend of this application, that was built using create-react-app which can be run using 'npm run start'

In the root folder you will find the key backend files for our graphql server, the most important being server.js which the uses both schema.js (contain definition of types and querys) and GitHub.js (datasource connecting to github API)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

- npm to install dependencies
- then in the root folder outside the client you can run 'npm run dev' which will concurrently run the react app and node server.
  you can also run these individuality if you like.
- now the react app and the node graphql server should be running,you should be all done and ready to make changes now :)


### Prerequisites

What things you need to install the software and how to install them

```
Give examples
```

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Deployment

Add additional notes about how to deploy this on a live system


## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
