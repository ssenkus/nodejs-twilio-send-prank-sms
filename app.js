const prompt = require('prompt');

const config = require('./config/config.js');
const Message = require('./lib/models/message.js');
const SendSmsRequest = require('./lib/requests/sendSmsRequest.js');

let smsSchema = {
    properties: {
        toPhoneNumber: {
            description: 'To',
            pattern: /(\+1[0-9]{10})/,
            message: 'Target phone number must U.S.-based phone number\n\t ex: +15551112222 ',
            required: true
        },
        body: {
            description: 'Message Body',
            pattern: /^(?!\s*$).+/,
            message: 'Please enter a message body!',
            required: true
        },
        mediaUrl: {
            description: 'Media URL (optional)\nHit enter to skip',
            required: false
        }
    }
};

prompt.message = '';

prompt.start();

prompt.get(smsSchema, function (err, result) {
    if (err) return console.log(`\nThere was an error while inputting data, or the process was terminated\n${err}`);

    let message = new Message({
        to: result.toPhoneNumber,
        from: config.FROM_PHONE_NUMBER,
        body: result.body,
        mediaUrl: result.mediaUrl
    });

    const sendSmsRequest = new SendSmsRequest(config, message);
    sendSmsRequest.send((err, message) => {
        if (err) {
            return console.log(`There was an error while sending text message!`);
        }

        console.log(`Message to ${message.to} from ${message.from} was successfully sent!`);
    });
});