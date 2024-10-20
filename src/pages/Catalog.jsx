import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiConnector';
import { categories } from '../services/apis';
import { getCatalogaPageData } from '../services/operations/pageAndComponentData';
import CourseCard from '../components/core/Catalog/CourseCard';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import { useSelector } from 'react-redux';

const Catalog = () => {

    const { loading } = useSelector((state) => state.profile)
    const {catalogName} = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");
  
    //Fetch all categories
    useEffect(()=> {
        const getCategories = async() => {
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            const category_id = 
            res?.data?.allCategories?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            setCategoryId(category_id);
        }
        getCategories();
    },[catalogName]);

    useEffect(() => {
        const getCategoryDetails = async() => {
            try{
                const res = await getCatalogaPageData(categoryId);
                console.log("Printing res: ", res);
                setCatalogPageData(res);
            }
            catch(error) {
                console.log(error)
            }
        }
        if(categoryId) {
            getCategoryDetails();
        }
        
    },[categoryId]);
  
  
    if (loading || !catalogPageData) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner"></div>
            </div>
        )
    }
    if (!catalogPageData) {
        return (
            <div className='flex items-center justify-center text-black text-3xl mt-[15%]'>
                Catalog data not found😞
            </div>
        ) 
    }
    
      return (
        <>
          {/* Hero Section */}
          <div className=" box-content bg-[#F0F8F7] px-4">
            <div className="mx-auto flex min-h-[200px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
              <p className="text-black">
                {`Home / Catalog / `}
                <span className="text-[#20B486]">
                  {catalogPageData?.data?.selectedCategory?.name}
                </span>
              </p>
              <p className="text-4xl text-[#20B486] font-semibold">
                {catalogPageData?.data?.selectedCategory?.name}
              </p>
              <p className="max-w-[870px] text-richBlack-900">
                {catalogPageData?.data?.selectedCategory?.description}
              </p>
            </div>
          </div>
    
          {/* Section 1 */}
          <div className='w-full bg-[#E2E8DF]'>
            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
              <div className="text-[#208486] text-4xl font-semibold mb-6">Courses to get you started</div>
              <div>
                <CourseSlider
                  Courses={catalogPageData?.data?.selectedCategory?.courses}
                />
              </div>
            </div>
            {/* Section 2 */}
            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 pb-12 lg:max-w-maxContent">
              <div className="text-[#208486] text-4xl font-semibold">
                Top courses in {catalogPageData?.data?.differentCategory?.name}
              </div>
              <div className="py-8">
                <CourseSlider
                  Courses={catalogPageData?.data?.differentCategory?.courses}
                />
              </div>
            </div>
            {/* Section 3 */}
            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 pb-12 lg:max-w-maxContent">
              <div className="text-[#208486] text-4xl font-semibold">Frequently Bought</div>
              <div className="py-8">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {catalogPageData?.data?.mostSellingCourses
                    ?.slice(0, 4)
                    .map((course, i) => (
                      <CourseCard course={course} key={i} Height={"h-[400px]"} />
                    ))}
                </div>
              </div>
            </div>
          </div>
    
          <Footer />
        </>
      )
    }
    
export default Catalog