const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
const allowedOrigins = [
  'https://nha-tro-two.vercel.app', // domain FE trên Vercel
  'http://localhost:5173',     // để test local
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/branches', require('./routes/branches'));
app.use('/api/rooms', require('./routes/rooms'));
app.use('/api/tenants', require('./routes/tenants'));
app.use('/api/contracts', require('./routes/contracts'));
app.use('/api/accounts', require('./routes/accounts'));
app.use('/api/assets', require('./routes/assets'));
app.use('/api/images', require('./routes/images'));
app.use('/api/services', require('./routes/services'));
app.use('/api/vehicles', require('./routes/vehicles'));
app.use('/api/invoices', require('./routes/invoices'));
app.use('/api/financial-categories', require('./routes/financial-categories'));
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/roles', require('./routes/roles'));
app.use('/api/permissions', require('./routes/permissions'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/meter-readings', require('./routes/meter-readings'));
app.use('/api/invoice-services', require('./routes/invoice-services'));

// Serve static files from React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

// Initialize database
const db = require('./database/db');
db.init().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🌐 Backend API: http://localhost:${PORT}`);
    console.log(`📱 Frontend: http://localhost:5173`);
    console.log(`📝 Ready to accept requests`);
  });
}).catch((err) => {
  console.error('❌ Failed to initialize database:', err);
  console.error('Error stack:', err.stack);
  process.exit(1);
});

