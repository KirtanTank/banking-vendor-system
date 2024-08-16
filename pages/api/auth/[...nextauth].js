import NextAuth from 'next-auth';
import connectDb from '../../../middleware/mongoose';
import GoogleProvider from 'next-auth/providers/google';
import User from '../../../models/User';

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    secret: process.env.JWT_SECRET,
    callbacks: {
        async jwt({ token, account, profile }) {
            await connectDb();
    
            if (account && profile) {
                let existingUser = await User.findOne({ email: profile.email });
    
                if (!existingUser) {
                    existingUser = new User({
                        name: profile.name,
                        email: profile.email,
                    });
                    await existingUser.save();
                }
    
                token.userId = existingUser._id;
            }
    
            return token;
        },
        async session({ session, token }) {
            session.userId = token.userId;
            return session;
        },
    },
    
});