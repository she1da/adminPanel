import React, { useState } from 'react';
import PublicLayout from '../layout/PublicMain'
import {httpRequest} from '../../services/httpRequests'

const Register = () => {
    const [formInfo, setFormInfo] = useState({})
      const [error, setError] = useState(null);

    const handleFormChange = (fieldName, value) => {
setFormInfo((prevData)=>({...prevData,[fieldName]:value}))
}
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
console.log({formInfo})
    try {
      const response = await httpRequest('/users/signup',{
        method:'POST',
        data:
       formInfo
        
      })

      if (!response) {
        throw new Error('sign up failed');
      }
      if(response?.status === 201){
        localStorage.setItem('token',response.data.token)
      }
// redirect

    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };
    return (
        <PublicLayout>
            <section className=" flex bg-gray-50 m-5 items-center justify-center">
  
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleRegister}>
                  <div>
                      <label htmlFor="fName "  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> name</label>
                      <input onChange={(e)=>handleFormChange('fName',e.target.value)} type="text " name="fName " id="fName " className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  placeholder="" required/>
                                </div>
                                   <div>
                      <label htmlFor="lName  " className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> lastName</label>
                      <input onChange={(e)=>handleFormChange('lName',e.target.value)} type="text  " name="lName  " id="lName  " className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  placeholder="" required/>
                                </div>

                                                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> email</label>
                      <input onChange={(e)=>handleFormChange('email',e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  placeholder="" required/>
                                </div>
                                                          <div>
                      <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your mobile</label>
                      <input onChange={(e)=>handleFormChange('mobile',+e.target.value)} type="mobile" name="mobile" id="mobile" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  placeholder="" required/>
                                </div>
                                              <div>
                      <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your image</label>
                      <input onChange={(e)=>handleFormChange('image',e.target.value)} type="text" name="image" id="image" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  placeholder="" required/>
                                </div>
                                                        <div>
                      <label htmlFor="skills" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your skills</label>
                      <input onChange={(e)=>handleFormChange('skills',e.target.value)} type="text" name="skills" id="skills" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  placeholder="" required/>
                                </div>
                                                        <div>
                      <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your title</label>
                      <input onChange={(e)=>handleFormChange('title',e.target.value)} type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  placeholder="" required/>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input onChange={(e)=>handleFormChange('password',e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                  </div>
                  {/* <div>
                      <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                      <input onChange={(e)=>handleFormChange('confirmPassword',e.target.value)} type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                  </div> */}
                  <div className="flex items-start">
                      {/* <div className="flex items-center h-5">
                        <input checked={formInfo.terms} onChange={(e)=>handleFormChange('terms',e.checked)}  id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required/>
                      </div> */}
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                    </div>

                                </div>
                                {error && <span className='text-red-600'>{error}</span>}
                  <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#cddc39] dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                  </p>
              </form>
          </div>
      </div>

</section>
        </PublicLayout>
    );
}

export default Register;
