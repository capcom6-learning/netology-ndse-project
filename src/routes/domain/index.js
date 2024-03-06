const ResponseStatus = {
    OK: 'ok',
    ERROR: 'error',
}

class Response {
    constructor(status, data) {
        this.status = status;
        this.data = data;
    }
}

module.exports = {
    ResponseStatus,
    Response,
}