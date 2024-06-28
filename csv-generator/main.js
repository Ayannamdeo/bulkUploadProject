const { faker } = require("@faker-js/faker");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// Generate fake data
const generateFakeData = (numRecords) => {
  const data = [];
  const currencies = [
    { symbol: "$", name: "US Dollar" },
    { symbol: "₹", name: "Indian Rupee" },
    { symbol: "¥", name: "Yen" },
    { symbol: "€", name: "Euro" },
  ];

  for (let i = 0; i < numRecords; i++) {
    const currency = faker.helpers.arrayElement(currencies);
    data.push({
      name: faker.person.fullName(),
      // image: faker.image.avatar(),
      age: faker.number.int({ min: 18, max: 75 }),
      sex: faker.person.sex(),
      country: faker.location.country(),
      city: faker.location.city(),
      accountNumber: faker.finance.accountNumber(8),
      accountName: faker.finance.accountName(),
      amount: faker.finance.amount({
        min: 5,
        max: 100000,
        dec: 2,
        symbol: currency.symbol,
      }),
      currencyName: currency.name,
      jobTitle: faker.person.jobTitle(),
      phoneNumber: faker.phone.number(),
      companyName: faker.company.name(),
      transactionDescription: faker.finance.transactionDescription(),
    });
  }

  return data;
};

// Write data to CSV file
const writeDataToCsv = (data) => {
  const csvWriter = createCsvWriter({
    path: "fake_financial_data_5.csv",
    header: [
      { id: "name", title: "name" },
      // { id: "image", title: "Image" },
      { id: "age", title: "age" },
      { id: "sex", title: "sex" },
      { id: "country", title: "country" },
      { id: "city", title: "city" },
      { id: "accountNumber", title: "accountNumber" },
      { id: "accountName", title: "accountName" },
      { id: "amount", title: "amount" },
      { id: "currencyName", title: "currencyName" },
      { id: "jobTitle", title: "jobTitle" },
      { id: "phoneNumber", title: "phoneNumber" },
      { id: "companyName", title: "companyName" },
      { id: "transactionDescription", title: "transactionDescription" },
    ],
  });

  csvWriter
    .writeRecords(data)
    .then(() => console.log("CSV file created successfully"))
    .catch((err) => console.error("Error writing CSV file:", err));
};

const numRecords = 500000; // Number of records to generate
const fakeData = generateFakeData(numRecords);
writeDataToCsv(fakeData);

// const { faker } = require("@faker-js/faker");
// // import { faker } from "@faker-js/faker";
// // import fs from "fs";
// // const N = 30
// const N = 1000;
// const fs = require("fs");
//
// const record = () => {
//   // faker.fake(
//   //   '{{name.lastName}},{{name.lastName}},{{address.city}},{{address.county}},{{address.zipCode}},{{hacker.adjective}}\n'
//   return [
//     faker.name.firstName(),
//     faker.name.lastName(),
//     faker.address.city(),
//     faker.address.state(),
//     faker.address.zipCode(),
//     faker.hacker.adjective(),
//   ];
// };
// const cluster = require("cluster");
// const numCPUs = require("os").cpus().length;
//
// let workers = [];
// let written = 0;
// if (cluster.isMaster) {
//   masterProcess();
// } else {
//   childProcess();
// }
//
// function masterProcess() {
//   console.log(`Master ${process.pid} is running`);
//
//   for (let i = 0; i < numCPUs; i++) {
//     console.log(`Forking process number ${i}...`);
//     const worker = cluster.fork();
//     worker.on("message", (msg) => {
//       if (msg === "done") {
//         written += 1;
//       }
//       if (written % 100000 === 0) {
//         console.log(`written=${written}`);
//       }
//       if (written >= N) {
//         console.log("all done");
//         process.exit();
//       }
//     });
//     workers.push(worker);
//   }
//   for (let i = 0; i < N; i++) {
//     const workerId = i % numCPUs;
//     const worker = workers[workerId];
//     worker.send(i);
//   }
// }
//
// function childProcess() {
//   const writer = fs.createWriteStream("out.csv", { flags: "a" });
//   console.log(`Worker ${process.pid} started`);
//   process.on("message", (message) => {
//     const msg = record().join(",") + "\n";
//     writer.write(msg, () => {
//       // signal writing is done for each entry
//       process.send("done");
//     });
//   });
// }
