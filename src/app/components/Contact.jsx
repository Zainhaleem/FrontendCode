"use client"
import React from 'react'
import styles from "../css/Contact.module.css"
import { f_one } from '@/utils/fonts'
import Globe from '../svg/Globe'
import Telphone from '../svg/Telphone'
import Location from '../svg/Location'
import emailjs from '@emailjs/browser';
import { useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
const Contact = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
     const notify = () => toast("✅ Message Sended Successfully");
     const notifyError = () => toast("❌ There was a problem. Please contact us at +92 334 3966787.");
     emailjs
     .sendForm('service_yvbujox', 'template_p1p5qrl', form.current, {
       publicKey: 'k8eKAVoB-fpxKqbeS',
     })
      .then(
        () => {
          notify();
        },
        (error) => {
           notifyError()
          console.log(error)
        },
      );
    }
  return (
    <div className={styles.Contact}>
             <ToastContainer
                      position="top-center"
                      theme="dark"
                      toastStyle={{ backgroundColor: "black", color: "white" }}
                      progressStyle={{ backgroundColor: "white" }}
                  />
        <div className={`${styles.main} container`}>
     <h2 className={`${styles.hm} ${f_one.className}`}>Get In Touch</h2>
     <p className={`${f_one.className} ${styles.text}`}>Contact us for a great photography session & beautiful captured moments</p>
     <form ref={form} onSubmit={sendEmail} className={`${styles.form}`}>
       <div className={styles.grid}>
       <input type="text" name="user_name" required className={`${styles.input} ${f_one.className}`} placeholder='Name' />
        <input type="email"  name="user_email" required className={`${styles.input} ${f_one.className}`} placeholder='Email' />
        <input type="tel"  name="user_phone" required className={`${styles.input} ${f_one.className}`} placeholder='Phone' />
        <input type="text" name="user_address" required className={`${styles.input} ${f_one.className}`} placeholder='Address' />
       </div>
        <textarea name="message" className={`${styles.input} ${f_one.className} ${styles.textarea}`} placeholder='Text Here'/>
        <div className={`${styles.btn_final}`}>
   <a href="#" type='submit' onClick={sendEmail} className={`btn btn_gr ${f_one.className} ${styles.btn_sub} collision gr`}>
  <span className="btn_col_text">SEND MAIL</span>
</a>
   </div>
     </form>
    </div>
   <div className={styles.cards_parent}>
   <div className={`${styles.cards} container`}>
      <div className={styles.card}>
        <div className={styles.circle}>
          <Globe/>
        </div>
        <div className={styles.content}>
         <span className={`${f_one.className} ${styles.big_text}`}>Our Website</span>
         <span className={`${f_one.className} ${styles.text}`}>www.zainhaleem.com</span>
         <a href="#" className={`${f_one.className} ${styles.visit_btn}`}>VISIT NOW</a>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.circle}><Telphone/></div>
        <div className={styles.content}>
         <span className={`${f_one.className} ${styles.big_text}`}>Contact Us</span>
         <span className={`${f_one.className} ${styles.text}`}>+92 334 3966787</span>
<a href="tel:+923343966787" className={`${f_one.className} ${styles.visit_btn}`}>
  CALL NOW
</a>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.circle}>
       <Location/>
        </div>
        <div className={styles.content}>
  <span className={`${f_one.className} ${styles.big_text}`}>Studio Address</span>
  <span className={`${f_one.className} ${styles.text}`}>Plot C-5, Sector 31/A, Mehran Town</span>
  <a
    href="https://www.google.com/maps?q=Plot+C-5,+Sector+31/A,+Mehran+Town"
    target="_blank"
    rel="noopener noreferrer"
    className={`${f_one.className} ${styles.visit_btn}`}
  >
    view map
  </a>
</div>

      </div>
    </div>
   </div>
    </div>
  )
}

export default Contact
