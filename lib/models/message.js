class Message {
    constructor(data) {
        this.to = data.to;
        this.from = data.from;
        this.body = data.body;

        if (data.mediaUrl) {
            this.mediaUrl = data.mediaUrl;
        }
    }
}

module.exports = Message;