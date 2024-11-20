export const contactQuery = `
  query GetContact {
    contacts(first: 1) {
      __typename
      id

      phone
      email
      name
      address
      postalCode
      city
    }
  }
`;
