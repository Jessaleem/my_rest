import { fetchUrl } from '../services/api';
import { useState } from 'react';
import { setToken } from '../services/auth';
import { useRouter } from 'next/router';
import Link from 'next/link';

const SignUp = () => {
  const [signUp, setSignUp] = useState();
  const router = useRouter();

  const handleChange = (e) => {
    setSignUp({ ...signUp, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const responseData = await fetchUrl(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local/register`, {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signUp)
      })
      setToken(responseData);
      router.redirect('/menu');
    } catch (error) {
      console.error(error);
    }
  }

  return (
      <div className="flex justify-center items-center">
        <div className="relative p-4 w-full max-w-md h-full md:h-auto" >
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <Link href="/">
                <button type="button" classNameName="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
                    <svg aria-hidden="true" className="w-5 h-5 ml-2 mt-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span className="sr-only">Close</span>
                </button>
              </Link>
                <div className="py-6 px-6 lg:px-8">
                    <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Register in The Taste Mamas </h3>
                    <form className="space-y-6" action="" onSubmit={handleSubmit}>
                      <div>
                          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Username</label>
                          <input type="username" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Username" required="" onChange={handleChange} />
                      </div>
                      <div>
                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                          <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@mail.com" required="" onChange={handleChange}/>
                      </div>
                      <div>
                          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
                          <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required="" onChange={handleChange}/>
                      </div>
                      <button type="submit" className="w-full text-white bg-amber-600 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800">Login to your account</button>
                    </form>
                </div>
            </div>
        </div>
      </div>
  )
}

export default SignUp;