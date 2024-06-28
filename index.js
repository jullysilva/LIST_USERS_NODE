const express = require("express");
const axios = require("axios");
const { readFileSync, writeFileSync } = require("fs");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let usersList = [];

const PATH = "https://random-data-api.com/api/v2/users?size=50";

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(PATH);
    usersList = response.data;

    const csvData = usersList
      .map((user) => {
        return `${user.id},${user.first_name},${user.last_name},${user.username},${user.email},${user.avatar},${user.gender},${user.phone_number},${user.social_insurance_number},${user.date_of_birth}`;
      })
      .join("\n");
    writeFileSync("users.csv", csvData);

    const page = parseInt(req.query.page, 10) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const paginatedUsers = usersList.slice(offset, offset + limit);
    const totalPages = Math.ceil(usersList.length / limit);

    res.render("index", {
      users: paginatedUsers,
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (err) {
    console.error("Erro ao buscar dados da API:", err);

    res.status(500).send("Erro ao buscar dados.");
  }
});

app.get("/download-csv", async (req, res) => {
  res.redirect("/crud?page=1");
});

app.get("/crud", (req, res) => {
  try {
    const filePath = "users.csv";
    const csvData = readFileSync(filePath, "utf-8");
    const users = csvData
      .trim()
      .split("\n")
      .map((line) => line.split(","));
    const searchQuery = req.query.search || "";
    const page = parseInt(req.query.page, 10) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const filteredUsers = users.filter(
      (user) =>
        user[0].includes(searchQuery) ||
        user[1].toLowerCase().includes(searchQuery.toLowerCase())
    );

    const paginatedUsers = filteredUsers.slice(offset, offset + limit);
    const totalPages = Math.ceil(filteredUsers.length / limit);

    res.render("crud", {
      users: paginatedUsers,
      currentPage: page,
      totalPages: totalPages,
      searchQuery: searchQuery,
    });
  } catch (err) {
    console.log("Erro ao ler arquivo.", err);
    res.status(500).send("Erro ao ler arquivo CSV.");
  }
});

app.post("/add-user", (req, res) => {
  try {
    const {
      id,
      first_name,
      last_name,
      username,
      email,
      avatar,
      gender,
      phone_number,
      social_insurance_number,
      date_of_birth,
    } = req.body;
    const newUser = {
      id,
      first_name,
      last_name,
      username,
      email,
      avatar,
      gender,
      phone_number,
      social_insurance_number,
      date_of_birth,
    };

    const filePath = "users.csv";
    let csvData = readFileSync(filePath, "utf8");
    csvData += `\n${id},${first_name},${last_name},${username},${email},${avatar},${gender},${phone_number},${social_insurance_number},${date_of_birth}`;
    writeFileSync(filePath, csvData);

    res.redirect("/crud?page=1");
  } catch (error) {
    console.error("Erro ao adicionar usuário:", error);
    res.status(500).send("Erro ao adicionar usuário");
  }
});

app.post("/delete-user/:index", (req, res) => {
  try {
    const index = parseInt(req.params.index, 10);
    const filePath = "users.csv";
    let csvData = readFileSync(filePath, "utf8").trim().split("\n");
    csvData.splice(index, 1);
    writeFileSync(filePath, csvData.join("\n"));

    res.redirect("/crud?page=1");
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    res.status(500).send("Erro ao excluir usuário");
  }
});

app.post("/edit-user", (req, res) => {
  console.log(req.body);
  try {
    const {
      index,
      id,
      first_name,
      last_name,
      username,
      email,
      avatar,
      gender,
      phone_number,
      social_insurance_number,
      date_of_birth,
    } = req.body;
    const filePath = "users.csv";
    let csvData = readFileSync(filePath, "utf8").trim().split("\n");
    csvData[
      index
    ] = `${id},${first_name},${last_name},${username},${email},${avatar},${gender},${phone_number},${social_insurance_number},${date_of_birth}`;
    writeFileSync(filePath, csvData.join("\n"));

    res.redirect("/crud?page=1");
  } catch (error) {
    console.error("Erro ao editar usuário:", error);
    res.status(500).send("Erro ao editar usuário");
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
