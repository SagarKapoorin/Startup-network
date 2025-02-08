import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      _id?: string;
        credits?: number;
    } & DefaultSession['user'];
  }

  interface User {
    _id?: string;
    credits?: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    _id?: string;
    credits?: number;
  }
}