import pThrottle from "p-throttle";

const HYGRAPH_ENDPOINT = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;

type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

type FetchOptions = {
  query: string;
  variables?: Record<string, unknown>;
};

const fetchGraphQL = async <T>({
  query,
  variables = {},
}: FetchOptions): Promise<T | null> => {
  try {
    const response = await fetch(HYGRAPH_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
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
      return null;
    }

    return data ?? null;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};

const throttle = pThrottle({
  limit: 1,
  interval: 1000,
});

export const fetchData = fetchGraphQL;

export const throttledFetchData = throttle(fetchGraphQL);
