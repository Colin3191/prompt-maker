import { getServerSession } from "next-auth"
import type { NextAuthOptions, Session } from "next-auth"
import GitHubProvider from "next-auth/providers/github"

const githubClientId = process.env.GITHUB_ID
const githubClientSecret = process.env.GITHUB_SECRET

if (!githubClientId || !githubClientSecret) {
  throw new Error("GitHub OAuth environment variables are not set")
}

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: githubClientId,
      clientSecret: githubClientSecret,
      authorization: { params: { scope: "read:user user:email" } },
      profile(profile) {
        return {
          id: String(profile.id),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account?.providerAccountId) {
        token.githubId = account.providerAccountId
      }

      if (user) {
        token.name = user.name
        token.email = user.email
        token.picture = user.image
      }

      return token
    },
    async session({ session, token }) {
      if (!session.user) {
        session.user = {} as Session["user"]
      }

      session.user.id = token.sub ?? ""
      session.user.name = token.name
      session.user.email = token.email
      session.user.image = token.picture as string | undefined
      session.user.githubId = token.githubId as string | undefined

      return session
    },
  },
  pages: {
    signIn: "/login",
  },
}

export const getServerAuthSession = () => getServerSession(authOptions)
