import Link from "next/link";
import { useState } from "react";
import { fetchUrl } from "../services/api";
import { setToken, unsetToken } from "../services/auth";
import { useUser } from "../services/authContext";

const Nav = () => {
  const [data, setData] = useState({
    identifier: '',
    password: '',
  });

  const { user, loading } = useUser();

  const handleSubmit = async (e) =>{
    e.preventDefault();

    const response = await fetchUrl(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        identifier: data.identifier,
        password: data.password
      }),
    });
    console.log(response);
    setToken(response);
    e.target.reset();
  }
  
  const logout = () => {
    unsetToken();
  }

  const handleChange =(evt) => {
    setData({...data, [evt.target.name]: evt.target.value});
  }
  return (
    <nav
      className="sticky top-0 z-50 flex flex-wrap items-center justify-between w-full py-4 md:py-0 px-4 text-lg text gray-700 bg-grayBack bg-opacity-25"
    >
      <div>
        <Link href="/" passHref>
          <a>
            <img
              className="m-3"
              src="https://res.cloudinary.com/jessaleem/image/upload/v1664060051/my_restaurant/Mi_proyecto_ymiapa.png"
              width={100}
              height={25}
              alt="Restaurant Logo"
            />
          </a>
        </Link>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="menu-button"
        className="h-6 w-6 cursor-pointer md:hidden block"
        fill="none"
        viewBox="0 0 24 24"
        stroke="white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 16h16"
        />
      </svg>

      <div
        className="hidden w-full md:flex md:items-center md:w-auto"
        id="menu"
      >
        <ul
          className="pt-4 text-base text gray-700 md:flex md: justify-between md: pt-0 space-x-2"
        >
          <li>
            <Link href="/">
              <a className="md:p-2 py-2 block text-white hover:font-bold">HOME</a>
            </Link>
          </li>
          <li>
            <Link href="/menu">
              <a className="md:p-2 py-2 block text-white hover:font-bold" href="#">
                MENU
              </a>
            </Link>
          </li>
          {!loading &&
            (user ? (
              <li>
                <Link href="/admin">
                  <a className="md:p-2 py-2 block text-white hover:font-bold">
                    SETTINGS
                  </a>
                </Link>
              </li>
            ) : (
              ''
            ))}
          {!loading &&
            (user ? (
              <li>
                <a className="md:p-2 py-2 block text-white hover:font-bold cursor-pointer" onClick={logout}>
                  LOGOUT
                </a>
              </li>
            ) : (
              ''
            ))}
          {!loading && !user ? (
            <>
              <li>
                <form id="form" onSubmit={handleSubmit} className="form-inline">
                  <input onChange={handleChange} className="md:p-2 form-input py-2 rounded mx-2"
                  type="text"
                  name="identifier"
                  placeholder="User"
                  required
                  />
                  <input onChange={handleChange} className="md:p-2 form-input py-2 rounded mx-2"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  />
                  <button className="md:p-2 rounded py-2 text-white bg-amber-600 p2 hover:font-bold" type="submit">
                    LOGIN
                  </button>
                </form>
              </li>
              <li>
                <Link href="/sign-up">
                  <a className="md:p-2 py-2 block text-white hover:text-amber-600 hover:font-bold">
                    SIGN UP
                  </a>
                </Link>
              </li>
            </>
          ) : (
            ''
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
