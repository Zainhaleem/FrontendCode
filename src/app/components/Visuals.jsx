'use client'
import React from 'react'
import style from "../css/Visual.module.css"
import { f_one } from '@/utils/fonts'
import Image from 'next/image'
import { useEffect, useRef, useState } from "react";
import CrossIcon from '../svg/CrossIcon'
const Visuals = () => {
  const scrollRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [modal, setmodal] = useState(false)
  const texts = [
    "For over two decades, I've been weaving light and shadow into stories that move, inspire, and endure. From the bustling streets of visual presentations, to collaborations with global brands, my journey as a Cinematographer and Director of Photography has been a relentless pursuit of visual magic.",
    "My insatiable curiosity has led me to collaborate with visionary artists worldwide, pushing creative boundaries and embracing the power of visual storytelling. My work with director Ahsan Rahim and the multi-talented Ali Zafar on a feature film, alongside numerous other renowned directors and celebrities, exemplifies this collaborative spirit.",
    "My lens has framed the sleek lines of iconic automobiles – Honda Civic, Peugeot, Toyota Corolla X, and more – bringing their stories to life. I've traversed genres, from the controlled environment of multi-camera studios to the raw authenticity of documentaries, the pulsating rhythm of music videos to the grand canvas of feature films.",
    "It began with a humble 35mm camera, a gift from my father, and ignited a lifelong passion for the art of moving images. Since 2000, I've been immersed in the vibrant world of advertising, capturing the essence of countless brands, from the launch of Visa Card in Pakistan to the electrifying energy of Coke Studio."
  ];
  const scrollingTexts = [...texts, ...texts];

  useEffect(() => {
    if (scrollRef.current) {
      const boxWidth = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: index * boxWidth,
        behavior: "smooth",
      });
    }
  }, [index]);
  return (
    <div className={style.Visual}>
      <div className={`container ${style.top}`}>
        <h2 className={`${style.hm} ${f_one.className}`}>
          <span className='red_text'>02 //</span> Visual World Of Zain Haleem
        </h2>
        <a href="/Appoinment" className={`${style.btn_red} ${f_one.className} collision`}>
  <span className="btn_col_text">Appoinment</span>
</a>
      </div>
      <div className={`${style.main} container`}>
        <div className={style.left}>
          <div className={style.left_img}>
          <Image
        src="/images/visionImage.jfif"
        alt="Vision Image"
        fill
        priority
        style={{ objectFit: 'contain' }}
          sizes="(max-width: 638px) 100vw, 638px"
        quality={100}      
      />
          </div>
        </div>
        <div className={`${style.right}`}>
          <h2 className={`${style.hm_two} ${f_one.className}`}>Zain Haleem <div className={style.line}></div></h2>
           <div className={style.text_wrapper}>
           <div className={style.text_box} ref={scrollRef}>
      {scrollingTexts.map((text, i) => (
        <div className={style.text_parent} key={i}>
          <p className={`${style.text} ${f_one.className} ${style.active}`}>
            {text}
          </p>
        </div>
      ))}
    </div>
           </div>
          <span className={`${f_one.className} ${style.read_more}`} onClick={()=>{setmodal((true))}}>Read More</span>
        </div>
      </div>
      <div className={` ${style.backdrop} ${modal ? style.open : ""}`}>
      <div className={`${style.modal} ${modal ? style.open : ""}`}>
       <div className={style.modal_main}>
       <div className={style.about_img}>
        <Image
              src={`/images/About.jfif`}
              alt="product"
              fill
              style={{ objectFit: "cover" }}
              sizes="456px"
              unoptimized
              quality={100}
            />
        </div>
        <div className={style.content}>
           <span className={`${style.sm_head} ${f_one.className}`}>ABOUT US</span>
           <h2 className={`${style.hm} ${f_one.className}`}>Zain Haleem</h2>
           <p className={`${f_one.className} ${style.tx}`}>
           For over two decades, I’ve been weaving light and shadow into stories that move, inspire, and endure. From the bustling streets of visual presentations, to collaborations with global brands, my journey as a Cinematographer and Director of Photography has been a relentless pursuit of visual magic. It began with a humble 35mm camera, a gift from my father, and ignited a lifelong passion for the art of moving images. Since 2000, I’ve been immersed in the vibrant world of advertising, capturing the essence of countless brands, from the launch of Visa Card in Pakistan to the electrifying energy of Coke Studio My lens has framed the sleek lines of iconic automobiles – Honda Civic, Peugeot, Toyota Corolla X, and more – bringing their stories to life. I’ve traversed genres, from the controlled environment of multi-camera studios to the raw authenticity of documentaries, the pulsating rhythm of music videos to the grand canvas of feature films My insatiable curiosity has led me to collaborate with visionary artists worldwide, pushing creative boundaries and embracing the power of visual storytelling. My work with director Ahsan Rahim and the multi-talented Ali Zafar on a feature film, alongside numerous other renowned directors and celebrities, exemplifies this collaborative spirit. Furthermore, my passion for music has fueled the creation of award-winning music videos, including the MTV award for “Haroon.” Every frame I capture is a testament to the transformative power of light, a language I’ve dedicated my life to mastering.
           </p>
        </div>
        <label className={`${style.crossIcon} cr_icon`} onClick={()=>{setmodal((false))}}>
          <CrossIcon/>
        </label>
       </div>
      </div>
      </div>
    </div>
  )
}

export default Visuals
