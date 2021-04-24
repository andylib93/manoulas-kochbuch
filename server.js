const express = require("express");
const path = require("path");

const app = express();

app.use("/js", express.static(path.resolve(__dirname, "js")));
app.use("/css", express.static(path.resolve(__dirname, "css")));
app.use("/assets", express.static(path.resolve(__dirname, "assets")));
app.use("/dist", express.static(path.resolve(__dirname, "dist")));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "index.html"));
});

const PORT = 5000
app.listen(process.env.PORT || PORT, () => console.log(`Server running on ${PORT}`));
