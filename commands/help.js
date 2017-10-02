exports.run = (client, message, args, content) => {
  try {
    client.say(
      message,
      "See everything I can do here: http://mtaggart.uk/mjattbot.html"
    );
  } catch (err) {
    console.log(err);
  }
};
