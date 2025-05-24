'use client'
import React, { useEffect, useState } from 'react'
import styles from "../css/Portfolio.module.css"
import { f_one, f_two } from '@/utils/fonts'
import axios from 'axios'
import Loading from './Loading'
import ArrowdownIcon from '../svg/ArrowdownIcon'
import { useRef, useEffect } from 'react';
const Portfolio = () => {
  const [activeButton, setActiveButton] = useState('TVC'); // default active
  const [dp, setDropdown] = useState(false)
  const [resDp, setResDp] = useState(false)
  const [data, setData] = useState([])
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [Catdata, setCatData] = useState([])
  const limit = 6;
  const handelToggeling = () => {
    setActiveButton("TVC")
    setDropdown((prev) => !prev)
  }
  const handelToggelingres = () =>{
    setActiveButton("TVC")
    setResDp((prev) => !prev)
  }
  const bottomRef = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      // decide which loader to flip
      if (page === 0) setInitialLoading(true);
      else setLoadingMore(true);

      try {
        const { data: res } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/portfolio`,
          { params: { category: activeButton, page, limit } }
        );

        setData(prev =>
          page === 0
            ? res.portfolios    // replace on the very first load
            : [...prev, ...res.portfolios]  // append on “load more”
        );
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      } finally {
        // flip off the correct loader
        if (page === 0) setInitialLoading(false);
        else setLoadingMore(false);
      }
    };

    fetchData();
  }, [activeButton, page]);
  useEffect(() => {
    setPage(0);
    setData([]);
     if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
  }, [activeButton]);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/category`;
        const res = await fetch(url);
        const data = await res.json();
        if (res.ok) {
          setCatData(data?.data);
        } else {
          alert(`Error: ${data.message}`);
        }
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };

    fetchCategory();
  }, []);
  return (
    <div className={styles.Portfolio_parent}>
      <div className={`${styles.Portfolio} container`}>
        <h2 className={`${styles.hm} ${f_one.className}`}><span className='red_text'> 03 // </span> PORTFOLIO</h2>
        <div className={`${styles.btns} ${styles.all_btns}`}>
          {
            Catdata?.map((curElem, i) => (
              <button
                className={`${styles.btn} btn ${f_one.className} ${activeButton === curElem?.category ? styles.active : ""}`}
                key={i}
                onClick={() => {
                  if (activeButton !== curElem?.category) {
                    setActiveButton(curElem?.category);
                  } else {
                    setActiveButton(null); 
                  }
                  if (curElem?.category === "TVC") {
                    setDropdown(prev => !prev); 
                  } else {
                    setDropdown(false); 
                  }
                }}
              >
                {curElem?.category}
                {curElem?.category === "TVC" && (
      <span className={`${styles.arrow} ${dp ? styles.open : ""}`}>
        <ArrowdownIcon />
      </span>
    )}
              </button>

            ))
          }
        </div>
        <div className={`${styles.res_tab} ${styles.btns}`}>
          <button className={`${styles.btn} btn ${f_one.className} ${activeButton == "TVC" ? styles.active : ""}`} onClick={() => { handelToggelingres() }}>
            TVC
            <span className={`${styles.arrow} ${dp ? styles.open : ""}`}>
            <ArrowdownIcon/>
            </span>
          </button>
        </div>
        <div className={`${styles.btns} ${styles.sub_tab} ${dp ? styles.open : ""} ${resDp ? styles.open_res : ""}`}>
          {
            Catdata.find(cat => cat.category === "TVC")?.subCategories.map((subCat, i)=>(
              <button className={`${styles.btn} ${f_one.className} ${activeButton == subCat.point ? styles.active : ""}`} key={i}    onClick={() => {
                if (activeButton !== subCat.point) {
                  setActiveButton(subCat.point); 
                  setResDp((prev) => !prev)
                } else {
                  setActiveButton(null); 
                }
              }}>
              {subCat?.point}
            </button>
            ))
          }
        </div>
        {activeButton && activeButton !== "TVC" && (
  <div className={`${styles.btn_activated} btn ${styles.btns}`}>
    <button className={`${styles.btn} btn ${f_one.className} ${styles.active}`}>
      {activeButton}
    </button>
  </div>
)}
        {initialLoading ? (
          <div className={styles.load}>
            <Loading />
          </div>
        ) : (
          <div className={styles.videos}>
            {data.map((curElem, i) => {
              const videoUrl = curElem?.video;

              let embedUrl = "";
              if (videoUrl.includes("youtu.be")) {
                embedUrl = videoUrl.replace("youtu.be/", "www.youtube.com/embed/").split("?")[0];
              } else if (videoUrl.includes("youtube.com/watch?v=")) {
                const videoId = new URL(videoUrl).searchParams.get("v");
                embedUrl = `https://www.youtube.com/embed/${videoId}`;
              } else if (videoUrl.includes("vimeo.com")) {
                embedUrl = videoUrl.includes("player.vimeo.com")
                  ? videoUrl
                  : videoUrl.replace("vimeo.com/", "player.vimeo.com/video/");
              }

              return (
                <div className={styles.video_box} key={i}>
                  <iframe
                    width="100%"
                    height="250px"
                    src={embedUrl}
                    title={`Video ${i}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write;   encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              );
            })}
<div ref={bottomRef} />
          </div>
        )}
        <div className={`${styles.btns} ${styles.all_btns_res}`}>
           <button
          className={`${styles.see_tempo} ${f_one.className}`}
          onClick={() => setPage(prev => prev + 1)}
          disabled={loadingMore}
        >
          {loadingMore ? "Loading…" : "SEE MORE"}
        </button>
          {
            Catdata
            ?.filter((btn) => btn.category !== "TVC")
              .map((curElem, i) => (
                <button 
                  className={`${styles.btn} ${f_one.className} ${activeButton == curElem?.category ? styles.hide_btn : ""} btn`}
                  key={i}
                  onClick={() => {
                    if (activeButton !== curElem?.category) {
                      setActiveButton(curElem?.category);  // Set to curElem?.category if it's different
                    } else {
                      setActiveButton("TVC");  // Remove the active state if it's the same
                    }
                    
                  }}
                >
                  {curElem?.category}
                </button>
              ))
          }

        </div>
       
      </div>
    </div>
  )
}

export default Portfolio
