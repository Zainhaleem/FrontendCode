import React from 'react'
import styles from "../css/About.module.css"
import { f_one } from '@/utils/fonts'
import Image from 'next/image'
const About = () => {
  return (
    <div className={`About ${styles.About} ${f_one.className}`}>
      <div className={`container ${styles.container}`}>
      <div className={styles.left}>
      <h2 className={styles.hm}>Behind the Lens <br />
      <span className={styles.red}>Journey of Vision</span></h2>
      <p className={styles.text}>
      Imagine a canvas where light dances and stories unfold. That’s the world Zain creates. He’s collaborated with the industry’s leading directors and brands – Ufone, Telenor, Jazz, Mobilink, Mobily, MTN, Zong, Warid telecom, Bangla Link, Honda, Toyota, Suzuki, KIA, Peugeot, Shell Helix, Garnier, Palmolive, Head & Shoulders, Sunsilk, Pepsi, Coke, Lipton, Tapal, Nestle, Nescafe, Lays, Food Panda, Cadbury, Engro, Unilever, P&G, Ponds, Dove, Lux, Omore, Peak Freanz, Knor, Dairy Milk, McDonalds, Walls, KFC, Orient, Mitsubishi, Haier, US AID, ICI, Dettol, Surf Excel, Ariel, Dulex Paints, Nelson, Molty Foam, YouTube, Samsung, Oppo, Infinix, Sony, Piff Puff Arabia and many more to count on, not just as a service provider, but as a creative partner.
      </p>
      <div className={styles.bt}>
      <div className={styles.red_ball}>
        <span className={styles.big_text}>24+</span>
      </div>
      <h2 className={styles.hs}>Years Experience</h2>
      </div>
      </div>
      <div className={styles.right}>
      <video
    autoPlay
    loop
    muted
    playsInline
    className={styles.video}
  >
    <source src="/images/LogoGrid.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
      </div>
     
      </div>
    </div>
  )
}

export default About
