import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import User from '../../../models/User';
import connectDb from '../../../middleware/mongoose';

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials) {
                await connectDb();
                const user = await User.findOne({ email: credentials.email });
                if (user && bcrypt.compareSync(credentials.password, user.password)) {
                    return { id: user._id, name: user.name, email: user.email };
                } else {
                    throw new Error('Invalid credentials');
                }
            }
        })
    ],
    secret: process.env.JWT_SECRET,
    callbacks: {
        async session({ session, token }) {
            session.userId = token.sub;
            return session;
        },
    },
});
