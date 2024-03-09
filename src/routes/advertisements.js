const router = require("express").Router();

const config = require("../config");
const { SuccessResponse } = require("./domain");
const { requireUser } = require("../middlewares/passport");
const upload = require("../middlewares/upload");

const { Advertisement } = require("../advertisements");
const { NotFoundError } = require("../errors");

router.get("/", async (req, res) => {
    const data = await Advertisement.find({ isDeleted: false });
    const response = new SuccessResponse(data);

    res.status(200).json(response).end();
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const items = await Advertisement.find({ id });
    if (items.length === 0) {
        throw new NotFoundError("Advertisement not found");
    }
    const data = items[0];

    const response = new SuccessResponse(data);

    res.status(200).json(response).end();
});

router.post('/', requireUser, upload(config.UPLOAD_PATH).array("images"), async (req, res) => {
    const data = {
        ...req.body,
        images: req.files.map(file => '/' + file.path),
        userId: req.user.id,
    };
    const advertisement = await Advertisement.create(data);

    const response = new SuccessResponse(advertisement);

    res.status(201).json(response).end();
});

router.delete('/:id', requireUser, (req, res) => {
    res.status(204).end();
});

module.exports = router;