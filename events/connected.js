var log = require(`log-to-file`);

exports.run = client => {
  console.log(`Connected!`);
  client.say("itsmjatt", "Launched succesfully");
};
