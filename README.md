# DevBattle

### Disclaimer

This project is still in development stage and is not fully supporting mobile devices.

## Synopsys

This is a simple project for helping to organize simple local dev competitions in IT companies.

## Motivation

For organizing dev competitions for developers in IT companies we need an app, which can give us an opportunity to create teams, challenges, tasks and at the same time follow the whole process in real time.

## [Demo](https://devbattle.surenatoyan.com)

## Technical stack

### Server side

 - NodeJs ( version 10+ )
  - Express ( version 4 )
  - [µWS](https://github.com/uNetworking/uWebSockets)
  - V8 virtual machine for executing and testing js code ( at this moment we can create and test only js code )
  - Some new features from Nodejs version 10
      - ES modules ( .mjs )
      - async/await and other features from ES6+
 - LowDB
      - In this project was used a very simple json based database, which is called [LowDB](https://github.com/typicode/lowdb). NOTE ::: Please, if you are going to use it for huge amount of users (e.g 1000+) use more proper database, it's just local contest in which less then 1000 people can participate.

### Client Side

  - ReactJs ( version 16+ )
  - Material UI ( version 1+ )
  
  There is a custom implementation of store management based on React Context API (no Redux or Mobix).
  
## Setup

### Dependencies

#### NodeJs - version 10+
#### npm - version 6+

For checking dependencies' versions and for doing production build run:

```bash
./setup.sh
```

For running server in development environment run:

```bash
npm run start-dev-server
```

For running server in development environment run:

```bash
npm run start-dev-client
```

For running server with client in development environment run:

```bash
npm run start-dev
```

And check http://localhost:3000 in you browser.

##### For Demo or Production Build

For running DevBattle in production environment ( or just for demo ) run:

```bash
npm run start-dev-prod
```

And check http://localhost:8080 in you browser.

## Usage

For creating battle you should log in as an Admin, which name is 'admin' and the default password for admin was declared in config.json.

## License

[MIT](./LICENSE)
