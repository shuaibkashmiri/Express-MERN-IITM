import jwt from "jsonwebtoken"
const secretCode= process.env.JWT_SECRET

export const protect = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization) {
            const authHeader = req.headers.authorization.trim();

            // Check if it starts with "Bearer "
            if (authHeader.startsWith("Bearer ")) {
                token = authHeader.split(" ")[1];
            } else {
                token = authHeader; // direct token
            }
        }

        if (!token) {
            return res.json({ message: "UnAuthorized Access" });
        }

        const decoded = jwt.verify(token, secretCode);

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        req.user = decoded.payload || decoded; // support both payload structure or direct
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Invalid token" });
    }
};