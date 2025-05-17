'use client'
import React, { useState } from 'react'
import style from "../css/Sidenav.module.css"
import { f_two } from '@/utils/fonts'
import MenuIcon from '../svg/MenuIcon'
import CrossIcon from '../svg/CrossIcon'
const Sidenav = () => {
    const [menu, setMenu] = useState(false)
    const openMenu = () =>{
        setMenu(true)
    }
    return (
       <>
       <div className={`${style.res_menu} container`} onClick={()=>{setMenu((prev) => !prev)}}>
        <div className={style.res_menu_icon}>
            <MenuIcon/>
        </div>
       </div>
        <div className={`${style.SideNav} ${menu ? style.active : ""}`}>
            <label className={style.cr_icon}  onClick={()=>{setMenu((prev) => !prev)}}>
            <CrossIcon/>
            </label>
            <div className={`${style.Links} ${f_two.className}`}>
                <a href="DashHome" className={style.Link}>
                    Dashboard
                </a>
                <a href="/CreateHero" className={style.Link}>
                    Create HeroBanner
                </a>
                <a href="/HeroList" className={style.Link}>
                    HeroBanner List
                </a>
                <a href="/CreatePortfolio" className={style.Link}>
                    Create Portfolio
                </a>
                <a href="/PortfolioList" className={style.Link}>
                    Portfolio List
                </a>
                <a href="/CreateGallery" className={style.Link}>
                    Create Gallery
                </a>
                <a href="/GalleryList" className={style.Link}>
                    Gallery List
                </a>
                <a href="/AppoinmentList" className={style.Link}>
                    Appoinment List
                </a>
                <a href="/CreateCategory" className={style.Link}>
                    Create Category
                </a>
                <a href="/CategoryList" className={style.Link}>
                  Category List
                </a>
            </div>
        </div>
        <div className={`bg_black  ${menu ? style.active : ""}`}></div>
       </>
    )
}

export default Sidenav