/**
 * Role-based authorization middleware
 * Allows access only to Admin users
 */
const adminOnly = (req, res, next) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin privileges required.",
      });
    }

    next();
  } catch (error) {
    console.error("Role Middleware Error:", error);
    return res.status(500).json({
      message: "Authorization error",
    });
  }
};

export default adminOnly;
