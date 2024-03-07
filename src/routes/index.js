const { NotFoundError, ConflictError, ValidationError, AuthorizationError, AuthenticationError } = require("../errors");
const { ErrorResponse } = require("./domain");

const router = require("express").Router();

router.use("/", require("./auth"));
router.use("/advertisements", require("./advertisements"));

router.use((error, req, res, next) => {
    const response = new ErrorResponse(error);
    if (error instanceof NotFoundError) {
        res.status(404);
    } else if (error instanceof ValidationError) {
        res.status(400);
    } else if (error instanceof ConflictError) {
        res.status(409);
    } else if (error instanceof AuthorizationError) {
        res.status(403);
    } else if (error instanceof AuthenticationError) {
        res.status(401);
    } else {
        console.error(error);
        res.status(500);
    }

    res.json(response).end();
});

module.exports = router;