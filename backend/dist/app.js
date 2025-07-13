"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const catch_all_1 = require("./middleware/catch-all");
const log_request_1 = require("./middleware/log-request");
const passportInit_1 = __importDefault(require("./middleware/passportInit"));
const auth_1 = __importDefault(require("./routes/auth"));
const photoController_1 = __importDefault(require("./controllers/photoController"));
const photoRoutes_1 = __importDefault(require("./routes/photoRoutes"));
const port = process.env.PORT || 3001;
const server = (0, express_1.default)();
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: true }));
server.use((0, express_fileupload_1.default)({ parseNested: true }));
server.use(log_request_1.loggedRequest);
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost",
    "http://192.168.1.13",
    "https://wedding-frontend-f6rv.onrender.com",
];
server.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: "*",
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposedHeaders: ["Content-Disposition"],
}));
server.use(passportInit_1.default.initialize());
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB error:", err));
server.use("/auth", auth_1.default);
server.use("/api", photoController_1.default);
server.use("/api", photoRoutes_1.default);
server.use(catch_all_1.catchAll);
server.listen(Number(port), () => {
    console.log(`server running on port ${port}`);
});
