const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname + '/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});

const upload = multer({ storage: storage });




const home = require("./src/app/Routes/home");

app.post("/api", upload.array("files"), home);




/// route 
/// Admin 
// User
const userRoute = require('./src/app/Routes/Admin/UserRoute')
app.use("/Admin/User", userRoute);





app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
