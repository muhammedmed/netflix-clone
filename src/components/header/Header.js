import React,{useState, useEffect} from 'react'
import './header.scss'
import {Notifications, Menu,Close} from '@material-ui/icons'
const Header = () => {
  const [show, setShow] = useState(true);
  const[mobile, setMobile] = useState(false);
 

  const controlNavbar = () =>{
    if(window.scrollY > 100){
      setShow(true);
    }else{
      setShow(false);
    }
  }

  useEffect(()=>{ 
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll",controlNavbar);

    
  },[]);


  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="content">
      <img className="logo" src="/images/logo.png"/>
      <ul className={mobile ? "nav-link-mobile" : "nav-link"} onClick={()=>setMobile(false)}>
      <li>
        <a>
          Home
        </a>
      </li>
      <li>
        <a > 
          TV Shows
        </a>
      </li>
      <li>
        <a >
          Movies
        </a>
      </li>
      <li>
        <a>
          Latest
        </a>
      </li>
      <li>
        <a>
         My List
        </a>
        
      </li>
      </ul>
       
    <img className="avatar" src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/bf6e4a33850498.56ba69ac3064f.png" alt="" />
    <Notifications className="not"fontSize="large"/>  
 
    <button onClick={()=>setMobile(!mobile)} >
   {mobile ? <Close className="close" fontSize="large"/> : <Menu className="menu" fontSize="large" />}
    </button>
    </div>
    </div>
  )
}

export default Header