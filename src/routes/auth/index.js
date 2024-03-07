const { SuccessResponse } = require("../domain");
const { UserModule } = require("../../users");
const { authByCredentials } = require("../../middlewares/passport");
const { UserPayload } = require("./domain");

const router = require("express").Router();

router.post('/signup', async (req, res) => {
    const user = await UserModule.create(req.body);
    const response = new SuccessResponse(
        new UserPayload(user.id, user.email, user.name, user.contactPhone)
    );

    res.status(201).json(response).end();
});

router.post('/signin', authByCredentials, (req, res) => {
    const response = new SuccessResponse(
        new UserPayload(req.user.id, req.user.email, req.user.name, req.user.contactPhone)
    );

    res.status(200).json(response).end();
});

module.exports = router;