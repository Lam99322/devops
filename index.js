const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));

// Trang login mới (theme glassmorphism neon)
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Đăng Nhập - Neon Style</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          font-family: 'Poppins', sans-serif;
          background: radial-gradient(circle at top left, #0f0c29, #302b63, #24243e);
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          overflow: hidden;
        }

        .login-box {
          position: relative;
          background: rgba(255, 255, 255, 0.08);
          padding: 40px;
          width: 350px;
          border-radius: 20px;
          box-shadow: 0 0 25px rgba(0, 255, 255, 0.2);
          backdrop-filter: blur(12px);
          animation: fadeIn 1s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }

        h2 {
          text-align: center;
          margin-bottom: 20px;
          color: cyan;
          letter-spacing: 2px;
          font-weight: 700;
          text-shadow: 0 0 10px cyan;
        }

        .input-field {
          margin-bottom: 20px;
          position: relative;
        }

        .input-field input {
          width: 100%;
          padding: 12px 15px;
          border: none;
          outline: none;
          border-radius: 10px;
          background: rgba(0,0,0,0.3);
          color: #fff;
          font-size: 15px;
          box-shadow: inset 0 0 5px rgba(0,255,255,0.3);
          transition: 0.3s;
        }

        .input-field input:focus {
          box-shadow: 0 0 10px cyan;
        }

        .btn {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          background: linear-gradient(90deg, #00f2fe, #4facfe);
          color: #111;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: 0.3s;
          position: relative;
          overflow: hidden;
        }

        .btn:hover {
          background: linear-gradient(90deg, #43e97b, #38f9d7);
          box-shadow: 0 0 15px #00ffe7;
        }

        .btn:active {
          transform: scale(0.97);
        }

        .links {
          margin-top: 15px;
          text-align: center;
          font-size: 14px;
        }

        .links a {
          color: #4facfe;
          text-decoration: none;
          transition: 0.3s;
        }

        .links a:hover {
          color: cyan;
          text-shadow: 0 0 10px cyan;
        }

        /* background glowing dots */
        .dot {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: cyan;
          box-shadow: 0 0 10px cyan, 0 0 20px cyan;
          animation: move 10s linear infinite;
        }

        @keyframes move {
          0% { transform: translateY(100vh) translateX(0); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(-20vh) translateX(50px); opacity: 0; }
        }
      </style>
    </head>
    <body>
      <div class="login-box">
        <h2>Đăng Nhập</h2>
        <form method="POST" action="/login">
          <div class="input-field">
            <input type="text" name="username" placeholder="Tên đăng nhập" required />
          </div>
          <div class="input-field">
            <input type="password" name="password" placeholder="Mật khẩu" required />
          </div>
          <button class="btn" type="submit">Đăng nhập</button>
        </form>
        <div class="links">
          <p><a href="#">Quên mật khẩu?</a></p>
          <p>Chưa có tài khoản? <a href="#">Đăng ký</a></p>
        </div>
      </div>

      <script>
        // tạo các đốm sáng động
        for (let i = 0; i < 20; i++) {
          let dot = document.createElement('div');
          dot.classList.add('dot');
          dot.style.left = Math.random() * 100 + 'vw';
          dot.style.animationDuration = (Math.random() * 10 + 5) + 's';
          dot.style.animationDelay = Math.random() * 5 + 's';
          document.body.appendChild(dot);
        }
      </script>
    </body>
    </html>
  `);
});

// Trang thành công
const successPage = (username) => `
  <html>
  <head><title>Thành công</title></head>
  <body style="background:#0f0c29;color:white;display:flex;align-items:center;justify-content:center;height:100vh;flex-direction:column;">
    <h1>✅ Xin chào, ${username}</h1>
    <p>Bạn đã đăng nhập thành công!</p>
    <a href="/" style="color:cyan;text-decoration:none;margin-top:20px;">⬅ Quay lại</a>
  </body>
  </html>
`;

// Trang thất bại
const errorPage = `
  <html>
  <head><title>Thất bại</title></head>
  <body style="background:#ff0844;background:linear-gradient(to right, #ff0844, #ffb199);color:white;display:flex;align-items:center;justify-content:center;height:100vh;flex-direction:column;">
    <h1>❌ Đăng nhập thất bại</h1>
    <p>Sai tài khoản hoặc mật khẩu!</p>
    <a href="/" style="color:white;text-decoration:none;margin-top:20px;">Thử lại</a>
  </body>
  </html>
`;

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "123") {
    res.send(successPage(username));
  } else {
    res.send(errorPage);
  }
});

app.listen(port, () => {
  console.log(`🚀 Server chạy tại http://localhost:${port}`);
  console.log(`📝 Đăng nhập thử: admin / 123`);
});
