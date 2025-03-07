import { CreateUserProps } from "@/types/Service";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

class Service {
  async createUser({ name, email, password }: CreateUserProps) {
    return await db.user.create({
      data: {
        email,
        name,
        password,
      },
    });
  }

  async findUserByEmail({ email }: { email: string }) {
    return await db.user.findUnique({
      where: {
        email,
      },
    });
  }
}

const service = new Service();
export default service;
