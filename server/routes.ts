import type { Express } from "express";
import { createServer, type Server } from "http";
// import { db } from "./db";
import { users } from "../shared/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authenticateToken, AuthRequest } from "./middleware/auth";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";
const JWT_EXPIRY = "24h";
const BASE_PATH = "/sage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Login endpoint
  app.post(`${BASE_PATH}/api/login`, async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
      }

      // Find user in database
      let user;
      // try {
      //   user = await db.query.users.findFirst({
      //     where: eq(users.username, email),
      //   });
      // } catch (dbError) {
      //   console.error("Database connection error:", dbError);
      //   return res.status(500).json({
      //     success: false,
      //     message:
      //       "Database connection failed. Please check your DATABASE_URL environment variable.",
      //   });
      // }

      // if (!user) {
      //   return res.status(401).json({
      //     success: false,
      //     message: "Invalid credentials",
      //   });
      // }

      // // Verify password
      // const isPasswordValid = await bcrypt.compare(password, user.password);

      // if (!isPasswordValid) {
      //   return res.status(401).json({
      //     success: false,
      //     message: "Invalid credentials",
      //   });
      // }

      // // Generate JWT token
      // const token = jwt.sign(
      //   {
      //     id: user.id,
      //     email: user.username,
      //     name: "Admin User",
      //   },
      //   JWT_SECRET,
      //   { expiresIn: JWT_EXPIRY },
      // );

      // res.json({
      //   success: true,
      //   message: "Login successful",
      //   token,
      //   user: {
      //     id: user.id,
      //     email: user.username,
      //     name: "Admin User",
      //   },
      // });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        success: false,
        message: "Server error during login",
      });
    }
  });

  // Forgot password endpoint
  app.post(`${BASE_PATH}/api/forgot-password`, async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email is required",
        });
      }

      // TODO: Implement email sending logic
      // For now, just return success
      res.json({
        success: true,
        message: "Password reset link sent to your email",
      });
    } catch (error) {
      console.error("Forgot password error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  });

  // Reset password endpoint
  app.post(`${BASE_PATH}/api/reset-password`, async (req, res) => {
    try {
      const { token, newPassword } = req.body;

      if (!token || !newPassword) {
        return res.status(400).json({
          success: false,
          message: "Token and new password are required",
        });
      }

      // TODO: Implement password reset logic with token verification
      res.json({
        success: true,
        message: "Password reset successful",
      });
    } catch (error) {
      console.error("Reset password error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  });

  // Check session endpoint
  app.get(`${BASE_PATH}/api/check-session`, async (req, res) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          message: "No token provided",
        });
      }

      const token = authHeader.substring(7);
      const decoded = jwt.verify(token, JWT_SECRET);

      res.json({
        success: true,
        user: decoded,
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  });

  // Dashboard data endpoint (protected)
  app.get(
    `${BASE_PATH}/api/dashboard`,
    authenticateToken,
    async (req: AuthRequest, res) => {
      try {
        // TODO: Fetch real dashboard data from database
        res.json({
          success: true,
          data: {
            totalApiCalls: "1.2M",
            activeUsers: "45.2K",
            revenue: "$128.5K",
            avgResponseTime: "124ms",
          },
        });
      } catch (error) {
        console.error("Dashboard error:", error);
        res.status(500).json({
          success: false,
          message: "Server error",
        });
      }
    },
  );

  const httpServer = createServer(app);
  return httpServer;
}
