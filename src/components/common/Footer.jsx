import React, { useEffect, useState } from 'react'
import { FaExternalLinkAlt, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import Logo from '../../assets/Logo/Logo-Full-Dark.png'
import { Link } from 'react-router-dom'
import { apiConnector } from '../../services/apiConnector'
import { categories } from '../../services/apis'

const Footer = () => {

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSubLinks = async () => {
    setLoading(true);
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setSubLinks(result.data.allCategories);
    } catch (error) {
      console.log("Navbar, Could not fetch the category list");
      console.log("Error -> ", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSubLinks();
  }, []);

  return (
    <section className='w-full bg-white py-24 p-4'>
        <img src={Logo} height={300} width={300} alt='logo-footer' className='ml-[190px]'/>
        <div className='md:max-w-[1100px] m-auto grid md:grid-cols-5 max-[768px]:md:grid-cols-6 gap-8 max-w-[400px]'>
            <div className='col-span-1'>
                <h3 className="font-bold text-2xl mt-10">Contact me</h3>
                <h3 className="py-2 text-[#60737a]">Reach me through my mail and I'll definitely get back to you</h3>
                <h3 className="py-2 text-[#363a3d]">Email: vermajay6604@gmail.com</h3>

                <div className="flex gap-4 py-4">
                    <a href='https://github.com/vermajay' target='_blank' className="p-4 rounded-xl bg-[#e9f8f3] cursor-pointer"><FaGithub size={25}/></a>
                    <a href='https://www.linkedin.com/in/verma-jay/' target='_blank' className="p-4 rounded-xl bg-[#e9f8f3] cursor-pointer"><FaLinkedin size={25}/></a>
                    <a href='https://x.com/j_ayverma' target='_blank' className="p-4 rounded-xl bg-[#e9f8f3] cursor-pointer"><FaTwitter size={25}/></a>
                </div>
            </div>    

                <div className='col-span-1'>
                    <h3 className="font-bold text-2xl mt-10">Explore</h3>
                    <ul className="py-3 text-[#60737a]">
                        <Link to={"/"}><li className="py-2">Home</li></Link>
                        <Link to={"/about"}><li className="py-2">About us</li></Link>
                        <Link to={"/contact"}><li className="py-2">Contact us</li></Link>
                    </ul>
                </div>

                <div className='col-span-1'>
                    <h3 className="font-bold text-2xl mt-10">Categories</h3>

                    <ul className="py-3 text-[#60737a]">
                      {loading ? (
                        <li className="py-2 spinner"></li>
                        ) : subLinks.length ? (
                          <>
                            {subLinks
                              ?.filter((subLink) => subLink?.courses?.length > 0)
                              ?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  key={i}
                                >
                                  <li className="py-2">{subLink.name}</li>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <li className="py-2">No categories found</li>
                        )}
                      </ul>

                </div>

                <div className='col-span-2'>
                    <h3 className="font-bold text-2xl mt-10">Made with <span className='text-[#FF0000]'>❤️</span> by Jay Verma</h3>
                    <h3 className="py-2 text-lg font-semibold text-[#60737a]">Visit my <a href='https://jayverma.netlify.app' target='_blank' className='text-blue-200'>portfolio! <FaExternalLinkAlt className='inline-block'/></a></h3>
                </div>
            </div>
    </section>
  )
}

export default Footer