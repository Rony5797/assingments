const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const routes = require("./routes/api")

const app = express()
const port = 5000
// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/sales", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Database connection error"))

// Install middlewares
app.use(cors())
app.use(bodyParser.json())

// Create routes
app.use("/api/sales", routes)

app.listen(port, () => console.log(`API listening on port ${port}`))