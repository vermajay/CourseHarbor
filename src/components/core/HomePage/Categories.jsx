import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'
import { apiConnector } from '../../../services/apiConnector'
import { categories } from '../../../services/apis'
import { Link } from 'react-router-dom'

const Categories = () => {

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
    <section className='w-full bg-[#F0F8F7] p-5'>
        <div className='md:max-w-[1100px] m-auto max-w-[400px]'>
            <p className='md:leading-[72px] text-3xl font-bold'>Our <span className='text-[#208486]'>Popular Categories</span></p>
            <p className="text-lg text-gray-600">Explore courses across different domains</p>
            <div className='grid md:grid-cols-3 py-12 gap-4'>
              {loading ? (
                <div className="spinner"></div>
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
                          <CategoryCard title={subLink.name}/>
                        </Link>
                      ))}
                  </>
                ) : (
                  <div className="flex text-lg font-semibold">
                    No categories found😞
                  </div>
                )}
            </div>
        </div>
    </section>
  )
}

export default Categories