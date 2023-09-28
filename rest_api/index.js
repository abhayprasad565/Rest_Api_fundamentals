const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
app.use(methodOverride('_method'));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "views")));
app.use(express.urlencoded({ extended: true }));

// sample data used in replacement of a data base
let posts = [
    {
        id: uuidv4(),
        username: "Abhay",
        content: "i love coding"
    },
    {
        id: uuidv4(),
        username: "Aman",
        content: "i lovahgvbmne coding"
    },
    {
        id: uuidv4(),
        username: "Azad",
        content: "i lovbjbhne coding"
    },
    {
        id: uuidv4(),
        username: "Sohan",
        content: "i gjhbmn love coding"
    },
    {
        id: uuidv4(),
        username: "sanny",
        content: "i logjhbmnve coding"
    },
    {
        id: uuidv4(),
        username: "rima",
        content: "i ltuygjhatgjhove coding"
    },


]

app.get("/posts", (req, res) => {
    res.render("index", { posts });
})

app.get("/posts/new", (req, res) => {
    res.render("new", { posts });
})

app.post("/posts", (req, res) => {
    //console.log(req.body);
    req.body.id = uuidv4();
    // console.log(req.body.id);
    posts.push(req.body);
    res.redirect("/posts");
})

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    if (post == undefined) res.send("wrong id");
    else {
        console.log(post);
        res.render("show.ejs", { post });
    }
})

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    console.log("mewcontent = ", newContent);
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    res.redirect("/posts");
})

app.delete("/posts/:id", (req, res) => {
    console.log("post deleted");
    let { id } = req.params;
    let post = posts.filter((p) => id == p.id);
    posts.
        res.redirect("/posts");
})



app.listen(port, () => {
    console.log("listening to port 8080");
})