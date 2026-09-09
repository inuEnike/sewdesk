type Env = {
  BACKEND_URI: string;
};

const checkEnv = (value: string | undefined, name: string): string => {
  if (!value) {
    throw new Error(`Environment variable ${name} is missing.`);
  }
  return value;
};

export const env = {
  BACKEND_URI: checkEnv(
    process.env.NEXT_PUBLIC_BACKEND_URI,
    "NEXT_PUBLIC_BACKEND_URI",
  ),
} satisfies Env;
