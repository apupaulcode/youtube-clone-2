import React from 'react'
import './Navbar.css';
import menuIcon from '../../assets/menu.png';
import logo from '../../assets/logo.png';
import searchicon from '../../assets/search.png';
import uploadIcon from '../../assets/upload.png';
import moreIcon from '../../assets/more.png';
import notificationicon from '../../assets/notification.png';
import profileIcon from '../../assets/jack.png';
import { Link } from 'react-router-dom';

const Navbar = ({setSidebar}) => {
  return (
    <nav className='flex-div'>
      <div className='nav-left flex-div'>
        <img src={menuIcon} className='menu-icon' onClick={()=> setSidebar(prev => prev===false? true : false)} />
        <Link to='/'><img src={logo} className='logo' /></Link>
      </div>
      <div className='nav-middle flex-div'>
        <div className="search-box flex-div">
          <input type="text" placeholder='Search' />
          <img src={searchicon} alt="" />
        </div>
      </div>
      <div className="nav-right flex-div">
        <img src={uploadIcon} />
        <img src={moreIcon} />
        <img src={notificationicon} />
        <img src={profileIcon} className='user-icon' />
      </div>
    </nav>
  )
}

export default Navbar
