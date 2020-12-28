class ReviewNotFoundException extends Error{
    constructor(message){
        super(message || "Review not found");
        this.status = 404;
    }
}

module.exports = ReviewNotFoundException;