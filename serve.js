const npm = require("npm");

npm.load(() => {
  console.log("Building...");
  npm.commands["run-script"](["build-dev"], (err, data) => {
    console.clear();
    if (err) {
      console.error(err);
      process.exit(1);
    }
    
    npm.commands["run-script"](["watch"], (err, data) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(data);
    });
    
    npm.commands["run-script"](["dev"], (err, data) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(data);
    });
  });
})
