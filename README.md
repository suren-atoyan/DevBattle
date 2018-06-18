# Hackathon

### Disclaimer

This project is still in early development stage.
After releasing stable version README.md file should be updated.
Please don't use it now.

## Synopsys

This is a simple project for helping to organize simple local hackathons in IT companies.

## Motivation

For organizing hackathons or quizzes for developers in IT companies we need an app, which can give us an opportunity for creating teams, challenges, tasks and at the same time follow the whole process in real time.

## Technical stack

### Server side

 - NodeJs ( version 10+ )
  - Express ( version 4 )
  - SocketIo
  - V8 virtual machine for executing and testing js code ( at this moment we can create and test only js code )
  - Some new features from Nodejs version 10
      - ES modules ( .mjs )
      - async/await and other features from ES6+
 - LowDB
      - In this project was used a very simple json based database, which is called [LowDB](https://github.com/typicode/lowdb). NOTE ::: Please, if you are going to use it for huge amount of users (e.g 1000+) use more proper database, it's just local contest in which less then 1000 people can participate.

### Client Side

  - ReactJs ( version 16+ )
  - Material UI ( version 1+ )
  
  There are no store management libraries like Redux or Mobix. In this project for creating and managing stores new React context API was used.
  
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
npm run start-dev
```

For running server with client in development environment run:

```bash
npm run start-dev-with-hackathon-client
```

## Usage

After running you can check 8080 (which was declared in config.json file) port in your browser.
Or for just client side testing check 3000 port.

For creating hackathon you should log in as an Admin, which name is 'admin' and the default password for admin was declared in config.json.

## License

MIT
