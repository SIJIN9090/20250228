// server.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { User } = require("./models/User"); // User 모델 임포트

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// 로그인 라우트
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 사용자 찾기
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(400)
        .json({ message: "아이디나 비밀번호가 틀렸습니다." });
    }

    // 비밀번호 비교
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res
        .status(400)
        .json({ message: "아이디나 비밀번호가 틀렸습니다." });
    }

    // JWT 토큰 생성
    const token = jwt.sign({ email: user.email }, "secretkey", {
      expiresIn: "1h",
    });

    return res.status(200).json({
      email: user.email,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
