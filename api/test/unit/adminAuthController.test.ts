import { Request, Response, NextFunction } from "express";
import { AdminAuthController } from "../../src/api/admin-auth/controller";
import {
  generateAdminTokens,
  getEmployeeCredential,
} from "../../src/api/admin-auth/services";
import { matchCryptedPassword } from "../../src/utils/password_config";
jest.mock("../../src/api/admin-auth/services");
jest.mock("../../src/utils/password_config");

describe("adminAuthController", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    // Initialize mocks before each test
    req = { body: { username: "admin", newPassword: "password" } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      cookie: jest.fn().mockReturnThis(),
    };
    next = jest.fn(); // Mock next function
    jest.clearAllMocks(); // Reset mock state
  });

  test("POST /auth/login should return 200 and set cookies for valid credentials", async () => {
    //arrange
    (getEmployeeCredential as jest.Mock).mockResolvedValue({
      employee_id: "id-x",
      employee_role: "admin",
      account_status: "active",
      account_password: "password",
      account_username: "admin",
    });
    (matchCryptedPassword as jest.Mock).mockResolvedValue(true);
    (generateAdminTokens as jest.Mock).mockResolvedValue({
      accessToken: "accessToken",
      refreshToken: "refreshToken",
    });
    //act
    await AdminAuthController.adminLogin(req as any, res as any, next);

    //assert
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
