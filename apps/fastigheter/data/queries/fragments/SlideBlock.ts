export const SlideBlockFragment = `
  fragment SlideBlock on SlideBlock {
    __typename
    id
    
    title
    heading
    body

    links(first: 2) {
      ...Link
    }

    media  
  }
`;
