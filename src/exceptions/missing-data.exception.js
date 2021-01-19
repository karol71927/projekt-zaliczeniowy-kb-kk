class MissingDataException extends Error{
    constructor(message){
        super(message || "Missing data");
        this.status = 422;
    }
}

module.exports = MissingDataException;