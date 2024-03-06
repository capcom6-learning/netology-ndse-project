const { Response, ResponseStatus } = require("./domain");

const router = require("express").Router();

router.post('/signup', (req, res) => {
    console.log(req.body);

    const response = new Response(
        ResponseStatus.OK,
        {
            id: "507f1f77bcf86cd799439011",
            email: "kulagin@netology.ru",
            name: "Alex Kulagin",
            contactPhone: "+7 123 456 78 90"
        }
    );

    res.status(201).json(response).end();
});

router.post('/signin', (req, res) => {
    console.log(req.body);

    const response = new Response(
        ResponseStatus.OK,
        {
            id: "507f1f77bcf86cd799439011",
            email: "kulagin@netology.ru",
            name: "Alex Kulagin",
            contactPhone: "+7 123 456 78 90"
        }
    );

    res.status(200).json(response).end();
});

module.exports = router;