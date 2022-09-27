import Head from 'next/head';
import Nav from './Nav';
import { UserProvider } from '../services/authContext';

const Layout = ({ user, loading= false, children }) => (
  <UserProvider value={{ user, loading }}>
    <Head>
      <title>The Taste Mamas</title>
    </Head>

    <Nav />

    <main className="px-2">
      <div
        className="
          justify-center
          items-center
          mx-auto
          rounded-lg
          my-12
          p16
        "
      >
        <div className="text-2xl font-medium">{children}</div>
      </div>
    </main>
  </UserProvider>
);

export default Layout;
