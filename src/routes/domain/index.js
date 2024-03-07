const ResponseStatus = {
    OK: 'ok',
    ERROR: 'error',
}

class Response {
    constructor(status) {
        this.status = status;
    }
}

class SuccessResponse extends Response {
    constructor(data) {
        super(ResponseStatus.OK);
        this.data = data;
    }
}

class ErrorResponse extends Response {
    constructor(error) {
        super(ResponseStatus.ERROR);
        this.error = error.toString();
    }
}

module.exports = {
    ResponseStatus,
    Response,
    SuccessResponse,
    ErrorResponse,
}