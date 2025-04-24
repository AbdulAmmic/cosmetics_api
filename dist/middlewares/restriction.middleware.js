"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictTo = void 0;
const restrictTo = (...args) => {
    return (req, res, next) => {
        try {
            const user = req.user;
            if (args.includes(user === null || user === void 0 ? void 0 : user.role)) {
                return next();
            }
            else {
                return res.status(401).json({ error: "Access Denied" });
            }
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
        }
    };
};
exports.restrictTo = restrictTo;
//# sourceMappingURL=restriction.middleware.js.map