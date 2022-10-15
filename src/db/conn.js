const mongoosse = require("mongoose");
mongoosse
  .connect("mongodb://localhost:27017/youtubeRegisteration")
  .then(() => {
    console.log("connection Successful");
  })
  .catch((errr) => {
    console.log("connection not successful");
  });
