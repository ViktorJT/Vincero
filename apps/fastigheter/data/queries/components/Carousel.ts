export const CarouselQuery = `
  query GetCarouselByID($id: ID!) {
    carousel(where: { id: $id }) {
      __typename
      id

      title
      subtitle
      variant

      page(first: 15) {
        id
        title
        description
      }

      profile(first: 15) {
        id
        name
        role
        email
      }    
    }
  }
`;
