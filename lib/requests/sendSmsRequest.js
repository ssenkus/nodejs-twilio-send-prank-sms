const twilio = require('twilio');

class sendSmsRequest {
    constructor(config, message) {
        this.client = new twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);
        this.message = message;
    }

    send(done) {
        this.client.messages.create(this.message, function(err, message) {
            if (err) return done(err);

            return done(null, message);
        });
    }
}

module.exports = sendSmsRequest;