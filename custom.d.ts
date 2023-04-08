declare namespace NodeJS {
  interface ProcessEnv {
    LOCAL_URL: string;
    OPENAI_API_KEY: string;
    GITHUB_ID: string;
    GITHUB_SECRET: string;
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
    DATABASE_URL: string;
  }
}

declare interface PageProps<P, S> {
  params: P;
  searchParams: S;
}
