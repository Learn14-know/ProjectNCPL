const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Root endpoint
app.get('/', (req, res) => {
    res.send('Hello from AppAzure!');
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.listen(port, () => {
    console.log(`AppAzure listening at http://localhost:${port}`);
});
