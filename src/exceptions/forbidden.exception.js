class ForbiddenException extends Error {
    constructor(message) {
        super(message || "Forbidden");
        this.status = 403
    }
}

module.exports = ForbiddenException;