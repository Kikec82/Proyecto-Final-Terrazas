const Experience = require("../models/Experience.model")

module.exports = app => {
    app.use("/api", require("./base.routes"))
    app.use("/api", require("./auth.routes"))
    app.use("/api/terraces", require("./terraces.routes"))
    app.use("/api/experience", require("./experience.routes"))
    app.use("/api/profile", require ("./profile.routes"))
    app.use("/api/editProfile", require("./auth.routes"))
    
} 