const express = require('express');
const mongoose = require('mongoose'); // Mongoose 추가
const cors = require('cors'); // CORS 미들웨어 추가

const app = express();
const PORT = 5000;

// MongoDB 연결
const mongoURI = 'mongodb://localhost:27017/mydatabase'; // 로컬 MongoDB URI (또는 MongoDB Atlas URI 사용 가능)
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// 게시글 스키마 및 모델 정의
const postSchema = new mongoose.Schema({
  nickname: String,
  content: String,
});

const Post = mongoose.model('Post', postSchema);

// CORS 미들웨어 사용
app.use(cors());
app.use(express.json()); // JSON 데이터 처리

// 모든 게시글 삭제 (GET 요청)
app.get('/api/clear-all-posts', async (req, res) => {
  try {
    await Post.deleteMany({}); // 모든 게시글 삭제
    res.status(200).json({ message: 'All posts deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting posts' });
  }
});

// 게시글 목록 가져오기 (GET)
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find(); // MongoDB에서 모든 게시글 가져오기
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 게시글 추가 (POST)
app.post('/api/posts', async (req, res) => {
  console.log(req.body); // 요청 바디 확인
  const { nickname, content } = req.body;
  try {
    const newPost = new Post({ nickname, content });
    await newPost.save(); // MongoDB에 새 게시글 저장
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: 'Error saving post' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
