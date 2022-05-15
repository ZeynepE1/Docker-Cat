const express = require('express');
const helmet = require('helmet');
const path = require('path');
const app = express();

app.use(express.json());
app.use(helmet());



app.use(express.static('build'));
app.get('*', (req, res) => {
    res.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});