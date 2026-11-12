const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const path = require('path');
const config = require('./config');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
app.disable('x-powered-by');
const PORT = config.PORT;

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.IO with CORS
const io = new Server(server, {
    cors: {
        origin: config.CLIENT_ORIGIN,
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const authRoute = require('./routes/auth');
const uploadRoute = require('./routes/upload');
const userRoute = require('./routes/users');
const projectRoute = require('./routes/projects');
const issueRoute = require('./routes/issues');
const performanceRoute = require('./routes/performance');
const adminRoute = require('./routes/admin');

app.use('/api/auth', authRoute);
app.use('/api/upload', uploadRoute);
app.use('/api/users', userRoute);
app.use('/api/projects', projectRoute);
app.use('/api/issues', issueRoute);
app.use('/api/performance', performanceRoute);
app.use('/api/admin', adminRoute);

mongoose.connect(config.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.get('/', (req, res) => {
    res.send('Issueflow API is running');
});

// Socket.IO Middleware for Authentication
io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (token) {
        const tokenString = token.startsWith('Bearer ') ? token.split(" ")[1] : token;
        jwt.verify(tokenString, config.JWT.SECRET, (err, user) => {
            if (!err) {
                socket.user = user;
            }
            next();
        });
    } else {
        next();
    }
});

// Real-time updates for Issueflow
io.on('connection', (socket) => {
    // Join a project room for real-time issue sync
    socket.on('join-project', (projectId) => {
        socket.join(`project-${projectId}`);
    });

    socket.on('leave-project', (projectId) => {
        socket.leave(`project-${projectId}`);
    });

    // Notify team members when an issue is updated or status changed
    socket.on('issue-updated', ({ projectId, issue }) => {
        socket.to(`project-${projectId}`).emit('issue-updated', issue);
    });

    socket.on('disconnect', () => {
        // Disconnected
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Socket.IO server is ready`);
});
