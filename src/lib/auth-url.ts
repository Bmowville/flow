const FALLBACK_PRODUCTION_URL = "https://flow-azure-beta.vercel.app";

type AuthUrlEnvironment = {
  NEXTAUTH_URL?: string;
  VERCEL_ENV?: string;
  VERCEL_PROJECT_PRODUCTION_URL?: string;
};

function asHttpsUrl(hostOrUrl: string): string {
  const normalized = hostOrUrl.trim().replace(/\/$/, "");

  if (/^https?:\/\//i.test(normalized)) {
    return normalized;
  }

  return `https://${normalized}`;
}

export function resolveAuthUrl(env: AuthUrlEnvironment): string | undefined {
  if (env.VERCEL_ENV !== "production") {
    return env.NEXTAUTH_URL;
  }

  const productionHost = env.VERCEL_PROJECT_PRODUCTION_URL?.trim();

  return productionHost
    ? asHttpsUrl(productionHost)
    : FALLBACK_PRODUCTION_URL;
}
