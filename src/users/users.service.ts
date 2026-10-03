import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByGoogleId(googleId: string) {
    return this.prisma.user.findUnique({
      where: { googleId },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async createGoogleUser(data: {
    googleId: string;
    email: string;
    firstName?: string;
    lastName?: string;
    picture?: string;
  }) {
    return this.prisma.user.create({
      data,
    });
  }

  async linkGoogleAccount(
    userId: number,
    googleData: {
      googleId: string;
      firstName?: string;
      lastName?: string;
      picture?: string;
    },
  ) {
    return this.prisma.user.update({
      where: { id: userId },
      data: googleData,
    });
  }
}