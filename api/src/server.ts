import app from "./app";
const PORT = process.env.PORT;

app.listen(PORT, err => {
  if(err) {
    return console.error(err);
  }
  return console.log(`Server is listening on ${PORT}`)
});
