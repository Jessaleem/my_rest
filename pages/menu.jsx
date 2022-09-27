import { useEffect } from 'react';
import Layout from '../components/Layout';
import MenuCard from '../components/MenuCard';
import { fetchUrl } from '../services/api';
import { useFetchUser } from '../services/authContext';

const MenuList = ({ menuList }) => {
  const { user, loading } = useFetchUser();
  console.log(user);

  return(
  <Layout user={user}>
    <main className="bg-transparent">
      <section className="bg-transparent bg-opacity:0">
        <div className="flex flex-wrap items-center justify-between w-full py-4 md:py-0 px-4 text-lg space-y-4">
          {menuList?.data?.map((menu) => (
            <MenuCard menu={menu} key={menu.id} />
          ))}
        </div>
      </section>
    </main>
  </Layout>
  );
};

export default MenuList;

export async function getStaticProps(){
  const menuResponse = await fetchUrl(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/menus?populate=*`);
  console.log(menuResponse.attributes);
  return {
    props: {
      menuList: menuResponse
    }
  }
}