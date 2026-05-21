import { auth } from "./index";

export async function getCurrentUser() {
  const session = await auth.getSession();
  return session.user;
}

export async function requireAuth() {
  const session = await auth.getSession();
  if (!session.user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      user: session.user,
    },
  };
}
