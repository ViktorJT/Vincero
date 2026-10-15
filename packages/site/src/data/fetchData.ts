const HYGRAPH_ENDPOINT = process.env.HYGRAPH_ENDPOINT as string;

type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

type FetchOptions = {
  query: string;
  variables?: Record<string, unknown>;
  cache?: "force-cache" | "no-store" | "no-cache";
};

const MAX_RETRIES = 5;

// Retry when Hygraph rate limits us (429) instead of throttling every call,
// so cached requests are never delayed.
const fetchWithRetry = async (
  url: string,
  init: Parameters<typeof fetch>[1],
  attempt = 0,
): Promise<Response> => {
  const response = await fetch(url, init);

  if (response.status !== 429 || attempt >= MAX_RETRIES) {
    return response;
  }

  const retryAfter = Number(response.headers.get("retry-after"));
  const delay =
    retryAfter > 0
      ? retryAfter * 1000
      : 500 * 2 ** attempt + Math.random() * 250;

  await new Promise((resolve) => setTimeout(resolve, delay));

  return fetchWithRetry(url, init, attempt + 1);
};

const fetchGraphQL = async <T>({
  query,
  variables = {},
  ...props
}: FetchOptions): Promise<T | null> => {
  if (!HYGRAPH_ENDPOINT) {
    throw new Error("HYGRAPH_ENDPOINT is not defined");
  }

  try {
    const response = await fetchWithRetry(HYGRAPH_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
      // Hygraph queries are POST requests, which Next.js does not cache
      // unless opted in. Without this every page renders dynamically.
      cache: "force-cache",
      next: { revalidate: 300 },
      ...props,
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(
        `HTTP error! status: ${response.status}, body: ${errorBody}`,
      );
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data, errors }: GraphQLResponse<T> = await response.json();

    if (errors) {
      console.error("GraphQL errors:", errors);
      throw new Error(errors.map((e) => e.message).join(", "));
    }

    return data ?? null;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // Re-throw to handle in calling function
  }
};

export const fetchData = fetchGraphQL;
