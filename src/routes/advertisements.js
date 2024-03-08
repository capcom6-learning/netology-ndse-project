const multer = require("multer");
const router = require("express").Router();

const { Response, ResponseStatus, ErrorResponse, SuccessResponse } = require("./domain");
const { authBySession, requireUser } = require("../middlewares/passport");

router.get("/", (req, res) => {
    const data = [
        {
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
                name: "Alex Kulagin"
            },
            createdAt: "2020-12-12T10:00:00.000Z"
        }
    ];
    const response = new SuccessResponse(data);

    res.status(200).json(response).end();
});

router.get('/:id', (req, res) => {
    if (req.params.id !== "507f1f77bcf86cd799439012") {
        const response = new ErrorResponse(
            "Объявление не найдено"
        );
        res.status(404).json(response).end();
        return;
    }

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

    res.status(200).json(response).end();
});

router.post('/', requireUser, multer().any(), (req, res) => {
    // console.log(req.isAuthenticated());
    // console.log(req.user);
    // console.log(req.files);
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