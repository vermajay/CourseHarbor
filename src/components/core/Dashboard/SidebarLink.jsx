import React from 'react'
import * as Icons from 'react-icons/vsc'
import { useDispatch } from 'react-redux';
import { NavLink, matchPath, useLocation } from 'react-router-dom';

import {resetCourseState} from '../../../slices/courseSlice'

const SidebarLink = ({link, iconName}) => {

    const Icon = Icons[iconName];
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({path: route}, location.pathname);
    }

  return (
    <NavLink 
        to={link.path}
        onClick={() => dispatch(resetCourseState())}
        className={`${matchRoute(link.path) ? 'bg-[#20B486] border-l-2 border-[#2cffbc]': 'border-transparent'}
        text-white font-medium px-6 py-2 border-l-2 duration-200 transition-all`}
    >
        <div className='flex gap-3 items-center'>
            <Icon className="text-xl"/>
            <span>{link.name}</span>
        </div>
        
    </NavLink>
  )
}

export default SidebarLink