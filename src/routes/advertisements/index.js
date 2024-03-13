const fs = require("fs");
const router = require("express").Router();

const config = require("../../config");
const { requireUser } = require("../../middlewares/passport");
const upload = require("../../middlewares/upload");
const { Advertisement } = require("../../advertisements");
const { AuthorizationError } = require("../../errors");

const { SuccessResponse } = require("../domain");

const { AdvertisementPayload } = require("./domain");

router.get("/", async (req, res) => {
    const data = await Advertisement.find(req.query);
    const response = new SuccessResponse(
        data.map(advertisement => new AdvertisementPayload(advertisement))
    );

    res.status(200).json(response).end();
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const data = await Advertisement.get(id);

    const response = new SuccessResponse(
        new AdvertisementPayload(data)
    );

    res.status(200).json(response).end();
});

router.post('/', requireUser, upload(config.UPLOAD_PATH).array("images"), async (req, res) => {
    const data = {
        ...req.body,
        images: req.files.map(file => '/' + file.path),
        userId: req.user.id,
    };
    const advertisement = await Advertisement.create(data);

    const response = new SuccessResponse(
        new AdvertisementPayload(advertisement)
    );

    res.status(201).json(response).end();
});

router.delete('/:id', requireUser, async (req, res) => {
    const id = req.params.id;
    const user = req.user;
    const advertisement = await Advertisement.get(id);

    if (advertisement.userId !== user.id) {
        throw new AuthorizationError('You are not allowed to delete this advertisement');
    }

    await Advertisement.remove(id);
    advertisement.images.forEach(image => {
        fs.unlinkSync(image.substring(1));
    });

    const response = new SuccessResponse();
    res.status(200).json(response).end();
});

module.exports = router;