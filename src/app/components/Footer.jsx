import React from 'react'
import style from "../css/Footer.module.css"
import Image from 'next/image'
import { f_one } from '@/utils/fonts'
import FacebookSvg from '../svg/FacebookSvg'
import YoutubeSvg from '../svg/YoutubeSvg'
import InstaSvg from '../svg/InstaSvg'
import VimeoSvg from '../svg/VimeoSvg'
const Footer = () => {
  return (
    <div className={`${style.Footer}`}>

     <div className={style.logo}>
                 <Image
                              src={`/images/logo.png`}
                              alt="product"
                              fill
                              style={{ objectFit: "contain" }}
                              quality={100}
                            />
     </div>
     <div className={style.contact}>
        <h2 className={`${style.hs} ${f_one.className}`}>Contact Us</h2>
        <span className={`${style.hss} ${f_one.className}`}>info@zainhaleem.com</span>
     </div>
     <div className={`${style.bottom} ${f_one.className}`}>
     Zain Haleem Cinematographer, All Rights Reserved. 
     <div className={style.social_media}>
     <a href="https://www.facebook.com/zain.haleem.7/">
        <FacebookSvg />
        </a>
        <a href="https://www.youtube.com/@dopzainshowreel ">
        <YoutubeSvg />
        </a>
        <a href="https://www.instagram.com/xainhaleem/">
        <InstaSvg />
        </a>
        <a href="https://vimeo.com/zainhaleem">
        <VimeoSvg />
        </a>
      </div>
     </div>
    </div>
  )
}

export default Footer
