const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;

  try {
    const r = await axios.put(
        "https://api.chatengine.io/users/",
        {username: username, secret: username, first_name: username},
        {headers: {"private-key": "ccb5b5ed-3deb-4870-8fd8-119557e5a6ce"}}
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    if(e.response) {
    return res.status(e.response.status).json(e.response.data);
    } else {
        console.error(e);
        return res.status(500).send("An error occurred");
    }
  }

});

app.listen(3001);