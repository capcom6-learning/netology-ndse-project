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

class SuccessResponse extends Response {
    constructor(data) {
        super(ResponseStatus.OK, data);
    }
}

class ErrorResponse extends Response {
    constructor(error) {
        super(ResponseStatus.ERROR, {
            error: error,
        });
    }
}

module.exports = {
    ResponseStatus,
    Response,
    SuccessResponse,
    ErrorResponse,
}