
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const db = require('./data/db');
const authRoutes = require("./routes/authentication");
const carRoutes = require("./routes/cars");
const reservationRoutes = require("./routes/RÉSERVATIONS"); // Corrected import
const contactRoutes = require("./routes/contact");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/reservations", reservationRoutes); // Mount reservations at /api/reservations
app.use("/api/contact", contactRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});