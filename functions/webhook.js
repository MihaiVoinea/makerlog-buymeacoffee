const axios = require('axios');

exports.handler = (event, context, callback) => {
  if (event.httpMethod !== 'POST') {
    callback(null, {
      statusCode: 200,
      body: 'Hello people! :3 \nSay hello back on Twitter @mihaivoinea_ \n\nBTW, you\'re not supposted to be here.\nGo back and watch the video tutorial!',
    });
  }
  const secret = event.path.split('/')[4];
  const username = event.path.split('/')[5];
  if (secret !== null && username !== null) {
    const body = JSON.parse(event.body).response;
    const message = `${body.supporter_name || 'Somebody'} just send me ☕️ ${body.number_of_coffees} Coffees on BuyMeACoffee.com/${username} #makersdrink`;

    axios.post(`https://api.getmakerlog.com/apps/webhook/${secret}`, {
      content: message,
      done: false,
    }).then(() => callback(null, {
      statusCode: 200,
      body: message,
    })).catch(error => callback(error, null));
  }
};
