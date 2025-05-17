import React from 'react'
import styles from "../css/nav.module.css"
import Image from 'next/image'
const Nav = () => {
  return (
    <div className={styles.navbar}>
    <a href="/">
    <div className={styles.logo}>
    <Image
  src={`/images/logo.png`}
  priority
  alt="logo"
  fill
  style={{ objectFit: "contain" }}
  quality={100}
  sizes="(max-width: 400px) 70vw, 400px"
/>
    </div></a>
</div>
  )
}

export default Nav