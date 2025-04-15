const express = require('express');
const logger = require('morgan');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/ITC505/lab-7/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'ITC505', 'lab-7', 'index.html'));
});

app.post('/ITC505/lab-7/index.html', (req, res) => {
    const { hero, action, emotion, location, creature } = req.body;

    if (!hero || !action || !emotion || !location || !creature) {
        return res.status(400).send(`
            <h1>Error</h1>
            <p>All fields are required!</p>
            <a href="/ITC505/lab-7/index.html">← Go Back</a>
        `);
    }

    const story = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Your Story</title>
            <link rel="stylesheet" href="/ITC505/lab-7/styles.css">
        </head>
        <body>
            <div class="container">
                <h1>Your Cosmic Adventure</h1>
                <div class="result">
                    <p>In the year ${Math.floor(Math.random() * 3000) + 2023}, ${hero} discovered the secret of ${action} 
                    while visiting ${location}. The experience left them feeling ${emotion}, especially when they 
                    encountered a ${creature}. Using ${['quantum technology', 'ancient wisdom', 'pure luck'][Math.floor(Math.random() * 3)]}, 
                    they ${['saved the galaxy', 'invented a new dessert', 'started an intergalactic dance party'][Math.floor(Math.random() * 3)]}!</p>
                    <a href="/ITC505/lab-7/index.html">← Create Another</a>
                </div>
            </div>
        </body>
        </html>
    `;

    res.send(story);
});

const port = process.argv[2] === 'local' ? 3000 : 80;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});