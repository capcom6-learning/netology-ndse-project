const router = require("express").Router();

const config = require("../config");
const { ErrorResponse, SuccessResponse } = require("./domain");
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
    // if (req.params.id !== "507f1f77bcf86cd799439012") {
    //     const response = new ErrorResponse(
    //         "Объявление не найдено"
    //     );
    //     res.status(404).json(response).end();
    //     return;
    // }

    // const data = {
    //     id: "507f1f77bcf86cd799439012",
    //     shortTitle: "Продам слона",
    //     description: "kulagin@netology.ru",
    //     images: [
    //         "/uploads/507f1f77bcf86cd799439011/slon_v_profil.jpg",
    //         "/uploads/507f1f77bcf86cd799439011/slon_v_fas.jpg",
    //         "/uploads/507f1f77bcf86cd799439011/slon_hobot.jpg"
    //     ],
    //     user: {
    //         id: "507f1f77bcf86cd799439011",
    //         name: "Alex Culagin"
    //     },
    //     createdAt: "2020-12-12T10:00:00.000Z"
    // };
    const id = req.params.id;
    const items = await Advertisement.find({ id });
    if (items.length === 0) {
        throw new NotFoundError("Advertisement not found");
        return;
    }
    const data = items[0];

    const response = new SuccessResponse(data);

    res.status(200).json(response).end();
});

router.post('/', requireUser, upload(config.UPLOAD_PATH).array("images"), (req, res) => {
    // console.log(req.isAuthenticated());
    // console.log(req.user);
    // console.log(req.files.length);
    // console.log(req.body);

    const data = {
        id: "507f1f77bcf86cd799439012",
        shortTitle: "Продам слона",
        description: "kulagin@netology.ru",
        images: [
            "/uploads/507f1f77bcf86cd799439011/slon_v_profil.jpg",
            "/uploads/507f1f77bcf86cd799439011/slon_v_fas.jpg",
            "/uploads/507f1f77bcf86cd799439011/slon_hobot.jpg"
        ],
        user: {
            id: "507f1f77bcf86cd799439011",
            name: "Alex Culagin"
        },
        createdAt: "2020-12-12T10:00:00.000Z"
    };
    const response = new SuccessResponse(data);

    res.status(201).json(response).end();
});

router.delete('/:id', requireUser, (req, res) => {
    res.status(204).end();
});

module.exports = router;