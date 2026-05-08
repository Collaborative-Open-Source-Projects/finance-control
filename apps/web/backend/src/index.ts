import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// A test route to make sure it's working
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Finance Control API is running locally!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});