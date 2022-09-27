/* eslint-disable @next/next/no-img-element */
import { fetchUrl } from '../../services/api';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { 
  getTokenCookie,
  getTokenFromServerCookie,
  getUserFromLocalCookie,
} from '../../services/auth';
import { useFetchUser } from '../../services/authContext';
import Layout from '../../components/Layout';

const MenuItem = ({ menuIt, jwt, error }) => {  
  const { user, loading } = useFetchUser();
  const router = useRouter()
  const [review, setReview] = useState({
    value: '',
  });
  const image = menuIt.attributes.images.data[0].attributes.url;
  const imageUrl =`${process.env.NEXT_PUBLIC_STRAPI_URL}${image}`

  const handleChange = (e) => {
    setReview({ value: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const reviewer = await getUserFromLocalCookie();
      await fetchUrl(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          data: {
            review: review.value,
            reviewer,
            menu: menuIt.id,
          },
        }),
      });
      router.reload();
    } catch (error) {
      console.error(error);
    }
  };
  if (error) {
    return (
      <Layout>
        <p>{error}</p>
      </Layout>
    );
  } else {
    return (
      <Layout user={user}>
        <div className="bg-gray-200 hover:bg-gray-250 shadow-xl hover:shadow-none cursor-pointer w-80 rounded-3xl flex flex-col items-center justify-center transition-all duration-500 ease-in-out;
          "
        >
          <div className="
            relative mt-2 mx-2"
          >
            <div className="
              h-56 rounded-2xl overflow-hidden"
            >
              <img src={imageUrl} className="object-cover w-full h-full" alt=""
              />
            </div>
          </div>
          <div className="pt-10 pb-6 w-full px-4">
            <h1 className="font-medium leading-none text-base tracking-wider text-gray-500">
              {menuIt.attributes.title}
            </h1>
            <p className="my-3 leading-none text-base tracking-wider text-gray-400">
              {menuIt.attributes.description}
            </p>
          </div>
        </div>
        {user && (
          <>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tighter mb-4 mt-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-goldBorder to-white py-2">
                Reviews
              </span> 
              <form onSubmit={handleSubmit}>
                <textarea
                  className="w-full text-sm px-3 py-2 text-gray-700 border border-2 border-goldBorder rounded-lg focus:outline-none"
                  rows="4"
                  cols="40"
                  value={review.value}
                  onChange={handleChange}
                  placeholder="Add your review"
                />
                <button
                  className="md:p-2 rounded py-2 text-black bg-goldBorder p-2"
                  type="submit"
                >
                  Add Review
                </button>
              </form>
            </h2>
            <ul>
                {menuIt.attributes.reviews.data.length === 0 && (
                  <span className="text-white">No reviews yet</span>
                )} 
                {menuIt.attributes.reviews.data &&
                  menuIt.attributes.reviews.data.map((review) => {
                    return (
                      <li key={review.id}>
                        <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-white">
                          {review.attributes.reviewer}
                        </span>{' '}
                        <span className="text-white">said</span> <span className="text-white"> &quot;{review.attributes.review}&quot; </span>
                      </li>
                    );
                  })}
              </ul>
            </>
          )
        }

      </Layout>
    );
  };
}

export async function getServerSideProps({ req, params }) {
  const { slug } = params;
  const jwt =
    typeof window !== 'undefined'
      ? getTokenCookie
      : getTokenFromServerCookie(req);
  const menuResponse = await fetchUrl(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/menu/find-by-slug/${slug}?populate=*`, jwt
    ? {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    : ''
  );

  if (menuResponse.data) {
    return {
      props: {
        menuIt: menuResponse.data,
        jwt: jwt ? jwt : '',
      }
    };
  } else {
    return {
      props: {
        error: menuResponse.error.message,
      },
    };
  }
}


export default MenuItem;