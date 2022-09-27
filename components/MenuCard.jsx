import Link from 'next/link';
import { GiShoppingCart } from 'react-icons/gi';
import { BsChatSquareFill } from "react-icons/bs";

const MenuCard = ({ menu }) => {
  const image = menu?.attributes?.images?.data[0]?.attributes?.url;
  console.log(image)

  const imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}${image}`
  console.log(imageUrl);
  return(
    <Link href={`/menu/${menu?.attributes?.slug}`}>
      <a>
        <div className="
          bg-gray-200 hover:bg-slate-300 shadow-xl hover:shadow cursor-pointer w-80 rounded-3xl flex flex-col items-center justify-center transition-all duration-500 ease-in-out"
        >
          <div className="
            relative mt-2 mx-2"
          >
            <div className="
              h-56 rounded-2xl overflow-hidden"
            >
              <img src={imageUrl} className="object-cover w-full h-full" alt=""/>
            </div>
            <div className="
              absolute bottom-0 left-0 -mb-4 ml-3 flex flex-row"
            >
              <div className="
                h-10 w-10 flex items-center justify-center text-xl bg-white hover:bg-green-500 text-green-500 hover:text-white rounded-2xl shadow-xl transform-gpu translate-y-0 hover:-translate-y-1 transition-all duration-300 ease-in-out"
              >
                <GiShoppingCart />
              </div>
              <div className="
                h-10 w-16 ml-2 bg-white hover:bg-blue-600 flex items-center justify-center font-medium text-blue-600 hover:text-white rounded-2xl shadow-xl transform-gpu translate-y-0 hover:-translate-y-1 transition-all duration-300 ease-in-out group"
              >
                <BsChatSquareFill />
                {menu.attributes.reviews.data.length !== 0 && (
                <span className="text-gray-700 ml-2 group-hover:text-white">
                  {menu.attributes.reviews.data.length}
                </span>
                )}
              </div>
            </div>
          </div>
          <div className="pt-10 pb-6 w-full px-4">
            <h1 className="font-medium leading-none text-base tracking-wider text-gray-500">
              {menu?.attributes?.title}
            </h1>
            <p className="my-3 leading-none text-base tracking-wider text-gray-400">
              {menu?.attributes?.description}
            </p>
            <p className="my-3 leading-none text-base tracking-wider text-gray-400">
              usd {menu?.attributes?.price}
            </p>
          </div>
        </div>
      </a>
    </Link>
  )
};

export default MenuCard;
