import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from '../generated/prisma'
import { nextCookies } from "better-auth/next-js";
import { sendError } from "next/dist/server/api-utils";

const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "mongodb", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: { 
    enabled: true, 
    requireEmailVerification: true
  }, 
  emailVerification: {
  sendOnSignUp: true,
  autoSignInAfterVerification: true,
  sendVerificationEmail: async ({ user,token}) => {
    const verificationUrl='${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackUrl=${process.env.BETTER_AUTH_EMAIL_VERIFICATION_REDIRECT_URL}';
    await sendEmail({
      to.user.email,
      subject:"Verify your email",
    }) 
  },
  plugins: [nextCookies()]
  
});