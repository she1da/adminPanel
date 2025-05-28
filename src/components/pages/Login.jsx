import React, { useState } from 'react';
import { httpRequest } from '../../services/httpRequests';
import PublicLayout from '../layout/PublicMain';
import { useAuth } from '../../context/AuthContext'; // adjust the path if needed
import { useNavigate } from 'react-router-dom';
function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await httpRequest('/users/login', {
        method: 'POST',
        data: {
          email: email,
          password: password,
        },
      });
      if (!response) {
        throw new Error('Login failed');
      }
      if (response?.status === 200) {
        console.log({ response });
        localStorage.setItem('token', response.data.token);
        // localStorage.setItem('currentUser', JSON.stringify({ currentUser: response.data }));

        login({ currentUser: response.data });
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <PublicLayout>
      <section className="bg-gray-50 m-10 ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight dark:text-white text-gray-900">
                  Sign in to your account
                </h2>
              </div>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST" onSubmit={handleLogin}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm/6 font-medium dark:text-white text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="email"
                        required
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm/6 font-medium dark:text-white text-gray-900"
                      >
                        Password
                      </label>
                      <div className="text-sm">
                        <a href="#" className="font-semibold text-[#cddc39] hover:text-[#9aa535]">
                          Forgot password?
                        </a>
                      </div>
                    </div>
                    <div className="mt-2">
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-[#cddc39] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Sign in
                    </button>

                    {error && <p style={{ color: 'red' }}>{error}</p>}
                  </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                  Not a member?
                  <a href="/register" className="font-semibold text-[#cddc39] hover:text-[#9aa535]">
                    Register
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

export default Login;
