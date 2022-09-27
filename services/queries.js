import { gql, useQuery } from '@apollo/client';

export const GET_ALL_MENU_ITEMS = gql`
  query menus {
    menus {
      data{
        id
        attributes{
          title
          description
          price
          images{
            data{
              attributes{
                url
              }
            }
          }
          category{
            data{
              attributes{
                type
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_MENU_BY_SLUG = gql`
query menuBySlug ($eq: String!) {
  menus (filters: {slug: {eq: "$eq" }}) {
    data{
      id
      attributes{
        title
        description
        images {
        	data {
            attributes{
              url
            }
          }
        }
        price
        category{
          data {
            attributes {
              type
            }
          }
        }
        slug
      }
    }
  }
}
`

