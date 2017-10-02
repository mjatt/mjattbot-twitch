exports.run = (client, message, args, content) => {
  let command = content.slice(1);
  try {
    client.say(message, "Pong!");
  } catch (err) {
    console.log(err);
  }
};
