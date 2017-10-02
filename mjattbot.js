var tmi = require("tmi.js");
var config = require("./config/config.json");
var log = require("log-to-file");
const fs = require("fs");

var command = "";
var options = {
  options: {
    debug: true
  },
  connection: {
    reconnect: true
  },
  identity: {
    username: "mjattbot",
    password: config.pass
  },
  channels: ["itsmjatt"]
};

var client = new tmi.client(options);

fs.readdir("./events/", (err, files) => {
  if (err) return log(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

client.connect();

client.on("message", (channel, message, userstate, self) => {
  if (self) return;
  command = userstate.split(" ")[0];

  try {
    if (!userstate.startsWith(config.prefix)) return;
    command = command.slice(config.prefix.length);
    let cmd = require(`./commands/${command}.js`);
    cmd.run(client, channel, message, userstate);
  } catch (err) {
    console.log(err);
  }
});

process.on("unhandledRejection", err => {
  console.log("Unhandled Exception: " + err);
});
