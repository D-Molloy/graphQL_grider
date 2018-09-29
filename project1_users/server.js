const express = require("express");
const _ = require("lodash");
const expressGraphQL = require("express-graphql");
//
// start json-server in another terminal with `npm run json:server`
//

//schema
const schema = require("./schema/schema");

const app = express();
const PORT = 4000;

app.use(
  "/graphql",
  expressGraphQL({
    graphiql: true,
    schema
  })
);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
