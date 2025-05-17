'use client'
import React, { useEffect, useState } from 'react'
import styles from "../css/Gallery.module.css"
import { f_one } from '@/utils/fonts'
import Image from 'next/image'
import Search from '../svg/Search'
import axios from 'axios'
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import Loading from './Loading'

const Gallery = () => {
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setloading] = useState(true)
  const [imgLoadStates, setImgLoadStates] = useState({});

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [skip, setSkip] = useState(0);
  const limit = 8;
  const fetchData = async (reset = false) => {
    if (reset) {
      setloading(true);
  } else {
      setIsLoadingMore(true);
  }
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/gallery?limit=${limit}&skip=${reset ? 0 : skip}`);
      setData((prev) => reset ? response?.data?.galleryImages : [...prev, ...response?.data?.galleryImages]);
      setSkip((prev) => reset ? limit : prev + limit);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }finally{
      setloading(false)
      setIsLoadingMore(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className={styles.Gallery}>
      <div className={`container`}>
        <h2 className={`${styles.hm} ${f_one.className}`}><span className='red_text'> 04 // </span> Gallery</h2>
        {loading ? <Loading /> : (
          <>
            {data.length > 0 && (
              <div className={styles.cards}>
                {
                  data?.map((curElem, index) => (
                    <div className={`${styles.card} ${imgLoadStates[index] ? styles.loaded : ''}`} key={index} onClick={() => {
                      setOpen(prev => !prev);
                      setCurrentIndex(index);
                    }}>
                    <Image
                      src={curElem?.images?.url}
                      alt="gallery Image"
                      fill
                      className={`${styles.img} ${!imgLoadStates[index] ? styles.loading : styles.loaded}`}
                      onLoadingComplete={() => {
                        setImgLoadStates((prev) => ({ ...prev, [index]: true }));
                      }}
                      style={{ objectFit: "contain" }}
                      quality={100}
                      unoptimized
                      sizes="(max-width: 600px) 100vw, 600px"
                    />
                    <div className={styles.bg}>
                      <Search />
                    </div>
                  </div>
                  
                  ))
                }
              </div>

            )}
          </>
        )}
        <Lightbox
          open={open}
          index={currentIndex}
          plugins={[Zoom]}
          close={() => setOpen(false)}
          slides={
            data?.map((curElem) => ({
              src: curElem?.scaledImages?.url
            }))
          }
        />
       <div className={styles.btn_box}>
       <button className={`btn ${styles.btn} ${f_one.className}`}  onClick={() => fetchData()}
        disabled={isLoadingMore}> {isLoadingMore ? "Loading..." : "Show More"}</button>
       </div>
      </div>
    </div>
  )
}

export default Gallery
