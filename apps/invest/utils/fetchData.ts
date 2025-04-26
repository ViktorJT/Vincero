import pThrottle from "p-throttle";

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

const fetchGraphQL = async <T>({
  query,
  variables = {},
  ...props
}: FetchOptions): Promise<T | null> => {
  if (!HYGRAPH_ENDPOINT) {
    throw new Error("HYGRAPH_ENDPOINT is not defined");
  }

  try {
    const response = await fetch(HYGRAPH_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
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

// Keep throttling for both development and production
const throttle = pThrottle({
  limit: 2,
  interval: 1000,
});

export const fetchData = fetchGraphQL;
export const throttledFetchData = throttle(fetchGraphQL);
