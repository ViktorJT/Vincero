export const CarouselQuery = `
  query GetCarouselByID($id: ID!) {
    carousel(where: { id: $id }) {
      __typename
      id

      title
      subtitle
      variant

      pages(first: 15) {
        id
        title
        slug
        description
        image
      }

      profiles(first: 15) {
        id
        name
        role
        email
        image
      }    
    }
  }
`;
