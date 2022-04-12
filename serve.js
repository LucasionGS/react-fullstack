const npm = require("npm");

npm.load(() => {
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
})
