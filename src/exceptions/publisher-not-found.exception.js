class PublisherNotFoundException extends Error{
    constructor(message){
        super(message || "Publisher not found");
        this.status = 404;
    }
}

module.exports = PublisherNotFoundException;