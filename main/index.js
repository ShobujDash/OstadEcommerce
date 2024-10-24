const app = require("./app")
const PORT = process.env.PORT || 5010;
app.listen(PORT, () => {
  console.log("App Run @5010")
})