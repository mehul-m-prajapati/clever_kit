import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./db";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "passsword" },
            },
            async authorize(credentials) {

                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Missing email or passsword');
                }

                try {
                    await connectToDatabase();
                    const user = await UserModel.findOne({email: credentials.email});

                    if (!user) {
                        throw new Error("No user found with given email");
                    }

                    const isPassValid = bcrypt.compare(credentials.password, user.password);
                    if (!isPassValid)
                        throw new Error("invalid password");

                    //This object is the user object that will be passed to the JWT callback
                    // in your authOptions.callbacks.jwt() — and then subsequently to the session callback.
                    return {
                        id: user._id.toString(),
                        email: user.email
                    }
                }
                catch (error) {
                    console.error("Auth error: ", error);
                    throw error;
                }
            }
        }),
    ],
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
                //token.email = user.email;
            }
            return token;
        },
        //NextAuth automatically sets session.user.email (and name, if available) from the JWT token.
        //It internally copies token.email and token.name into session.user.
        async session({session, token}) {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        }
    },
    pages: {
        signIn: '/login',
        error: '/login',
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
}
