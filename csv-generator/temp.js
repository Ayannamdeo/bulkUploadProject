function speedTest() {
  console.time("loop");
  for (let i = 0; i < 1000000; i += 1) {
    // Do nothing
  }
  console.timeEnd("loop");
}

console.log("let used");
speedTest();
