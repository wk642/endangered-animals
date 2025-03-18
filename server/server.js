import express from 'express';
import cors from 'cors';
const app = express();
const port = 5000; 

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json("Welcome! Let's record some endangered animals");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});