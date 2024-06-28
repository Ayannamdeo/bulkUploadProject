require("dotenv").config();
const scanner = require('sonarqube-scanner');
scanner(
  {
    serverUrl: "http://localhost:9000",
    // login: "admin",
    token: 'squ_678bf266f68e0976a0aae7fada5aaea7e32c2043',
    options: {
      "sonar.sources": "./src",
    },
  },
  () => process.exit()
);