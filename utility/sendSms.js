const axios = require('axios');

const sendSms = async (to, text) => {
  await axios
    .get(
      `https://bulksmsbd.net/api/smsapi?api_key=FoQplkCZCruJJvsZAmFn&type=text&number=${to}&senderid=03590900025&message=${text}`
    )
    .then((res) => {
      console.log('send Successfully');
    })
    .catch((err) => {
      console.log('sendig failed');
    });
};

module.exports = {
  sendSms,
};
