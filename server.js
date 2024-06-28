// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const db = new sqlite3.Database(':memory:');

app.use(bodyParser.json());

db.serialize(() => {
    db.run("CREATE TABLE users (username TEXT, password TEXT)");
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    
    const stmt = db.prepare("INSERT INTO users VALUES (?, ?)");
    stmt.run(username, password, function(err) {
        if (err) {
            res.json({ message: "خطأ في التسجيل" });
        } else {
            res.json({ message: "تم إنشاء الحساب بنجاح" });
        }
    });
    stmt.finalize();
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    db.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, row) => {
        if (row) {
            res.json({ message: "لقد سجلت الدخول بنجاح" });
        } else {
            res.json({ message: "اسم المستخدم أو كلمة المرور غير صحيحة" });
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
