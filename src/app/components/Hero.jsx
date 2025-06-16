'use client'
import React, { useState, useRef, useEffect } from 'react';
import styles from '../css/Hero.module.css';
import Image from 'next/image';
import { f_one } from '@/utils/fonts';
import axios from 'axios';
import FacebookSvg from '../svg/FacebookSvg';
import YoutubeSvg from '../svg/YoutubeSvg';
import InstaSvg from '../svg/InstaSvg';
import VimeoSvg from '../svg/VimeoSvg';
import Imdb from '../svg/Imdb';

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState([]);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isHovered = useRef(false);
  const [imgLoadStates, setImgLoadStates] = useState({});
  // Slide navigation
  const scrollToSlide = (index) => {
    const slider = sliderRef.current;
    if (slider) {
      const slideWidth = slider.offsetWidth;
      slider.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth',
      });
    }
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % data.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  // Fetch data
  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/hero`);
      setData(response?.data?.heroes || []);
    } catch (error) {
      console.error('Error fetching hero data:', error);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, []);

  // Slide when index changes
  useEffect(() => {
    scrollToSlide(currentIndex);
  }, [currentIndex]);

  // Auto-scroll with pause on hover
  useEffect(() => {
    if (data.length <= 1) return;

    const startAutoScroll = () => {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        if (!isHovered.current) goToNext();
      }, 5000);
    };

    startAutoScroll();
    return () => clearInterval(intervalRef.current);
  }, [data]);

  // Touch swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const delta = touchStartX.current - touchEndX.current;
    if (Math.abs(delta) > 50) {
      delta > 0 ? goToNext() : goToPrev();
    }
  };
 useEffect(()=>{
  console.log(imgLoadStates)
 },[imgLoadStates])
  return (
    <div className={styles.Hero}>
      <div
        className={styles.slider}
        ref={sliderRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {data.length > 0 && (
          <>
          {data?.map((curElem, index) => (
      <div className={`${styles.slide} ${imgLoadStates[index] ? styles.loaded : ''}`} key={index}>
      <Image
        src={curElem?.images?.url}
        alt={`Slide ${index + 1}`}
        fill
        sizes="100vw"
        style={{ objectFit: 'cover' }}
        className={`${styles.img} ${!imgLoadStates[index] ? styles.loading : styles.loaded}`}
        quality={100}
        priority
        unoptimized
        onLoadingComplete={() => {
          setImgLoadStates((prev) => ({ ...prev, [index]: true }));
        }}
      />
    </div>
    
        ))}
          </>
        )}
      </div>

      <div className={styles.dots_box}
              onMouseEnter={() => (isHovered.current = true)}
              onMouseLeave={() => (isHovered.current = false)}
      >
        <span className={`${styles.btn} ${f_one.className}`} onClick={goToPrev}>
          PREV
          <div className={styles.line}></div>
        </span>

        <div className={styles.dots}>
          {data?.map((_, i) => (
            <div
              key={i}
              className={`${styles.dot} ${i === currentIndex ? styles.active : ''}`}
              onClick={() => setCurrentIndex(i)}
            >
              <div className={styles.dot_fill}></div>
            </div>
          ))}
        </div>

        <span className={`${styles.btn} ${f_one.className}`} onClick={goToNext}>
          <div className={styles.line}></div>
          NEXT
        </span>
      </div>

      <div className={styles.social_media}>
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
             <a href="https://www.imdb.com/name/nm9590185/">
        <Imdb />
        </a>
      </div>
    </div>
  );
};

export default Hero;
