const upload = multer({ dest: './public/uploads/' });

router.post('/upload', upload.single('image'), (req, res) => {

    res.json("url_de_img_cloudinary")

    const pic = new Picture({
        name: req.body.name,
        path: `/uploads/${req.file.filename}`,
        originalName: req.file.originalname
    });

    pic.save((err) => {
        res.redirect('/');
    });
});

