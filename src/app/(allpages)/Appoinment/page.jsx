'use client'
import React, { useEffect, useState } from 'react'
import { f_one } from '@/utils/fonts'
import ArrowdownIcon from '@/app/svg/ArrowdownIcon'
import style from "../../css/Appoinment.module.css"
import { ToastContainer, toast } from 'react-toastify';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
const page = () => {
  const [dropdown, setdropdown] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNo, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [service, setService] = useState("Service Type")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("Select Time")
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ Name: "", Email: "", Phoneno: "", Address: "", Service: "", Date: "", Time: "" });
  const form = useRef();
  const Services = [
    "Documentry",
    "Commercials",
    "Films",
    "Digital video ads",

  ]
  const Time = [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM"
  ]
  const sendEmail = (e) => {
    e.preventDefault();
    const notifyError = () => toast("❌ There was a problem. Please contact us at +92 334 3966787.");
    const notify = () => toast("✅ Applied for Appoinment Successfully");
    emailjs
      .sendForm('service_yvbujox', 'template_nelpqbv', form.current, {
        publicKey: 'k8eKAVoB-fpxKqbeS',
      })
      .then(
        () => {
          notify()
        },
        (error) => {
          console.log('FAILED...', error.text);
          notifyError()
        },
      );
  }
  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    let newErrors = {};
    if (!name.trim()) newErrors.Name = "Name is required";
    if (!email.trim()) newErrors.Email = "Email is required";
    if (!phoneNo.trim()) newErrors.Phoneno = "Phone Number is required";
    if (!address.trim()) newErrors.Address = "Address is required";
    if (service == "Service Type" ) newErrors.Service = "Service is required";
    if (!date.trim()) newErrors.Date = "Date is required";
    if (time == "Select Time") newErrors.Time = "Time is required";
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      setLoading(false);
      return;
    }
    setError({ Name: "", Email: "", Phoneno: "", Address: "", Service: "", Date: "", Time: "" })

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phoneNo);
    formData.append("address", address)
    formData.append("service", service),
      formData.append("date", date)
    formData.append("time", time)
    sendEmail(e)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/appoinment`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setLoading(false);
        setName("");
        setEmail(null);
        setPhone("");
        setEmail("");
        setPhone("");
        setAddress("");
        setService("");
        setDate("")
        setTime("")
      } else {
        alert(`Error: ${data.message}`);
        setLoading(false);
      }
    } catch {
      console.error("Error uploading portfolio video:", error.message);
      alert("Something went wrong!");
      setLoading(false);
    }
  }
  return (
    <div className='Appoinment'>
      <ToastContainer
        position="top-center"
        theme="dark"
        toastStyle={{ backgroundColor: "black", color: "white" }}
        progressStyle={{ backgroundColor: "white" }}
      />
      <div className={style.hero}>
        <div className={style.bg_overlay}>
          <h2 className={`${f_one.className} ${style.text}`}>Appointment Form</h2>
        </div>
      </div>
      <div className={style.form}>
        <h2 className={`${style.hm} ${f_one.className}`}>BOOK AN APPOINTMENT</h2>
        <p className={`${style.text_sm} ${f_one.className}`}>Please confirm that you would like to request the following appointment:</p>
        <form ref={form} onSubmit={(e) => { handelSubmit(e) }} className={style.form_content}>
          <div className={style.inputs}>
            <div className="flex col gap_10">
              <input type="text" name="name"  className={`${style.input} ${f_one.className}`} placeholder='Name' onChange={(e) => { setName(e.target.value) }} />
              {
                error.Name && <span className={`err ${f_one.className}`}>{error.Name}</span>
              }
            </div>
            <div className="flex col gap_10">
              <input type="email" name="email" className={`${style.input} ${f_one.className}`} placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} />
              {
                error.Email && <span className={`err ${f_one.className}`}>{error.Email}</span>
              }
            </div>
            <div className="flex col gap_10">
              <input type="tel" name="phone" className={`${style.input} ${f_one.className}`} placeholder='Phone No' onChange={(e) => { setPhone(e.target.value) }} />
              {
                error.Phoneno && <span className={`err ${f_one.className}`}>{error.Phoneno}</span>
              }
            </div>
            <div className="flex col gap_10">
              <input type="text" name="address" className={`${style.input} ${f_one.className}`} placeholder='Address' onChange={(e) => { setAddress(e.target.value) }} />
              {
                error.Address && <span className={`err ${f_one.className}`}>{error.Address}</span>
              }
            </div>
          </div>
          <div className="flex col gap_10">
            <div className={style.dropdown}>
              <div className={`${style.dp_head} ${f_one.className}`} onClick={() => {
                setdropdown(dropdown === "Ser" ? "" : "Ser");
              }}>
                {service}
                <div className={`${style.ar}  ${dropdown == "Ser" && style.active} `}>
                  <ArrowdownIcon />
                </div>
              </div>
              <div className={`${style.dp_box} ${dropdown == "Ser" && style.active} ${f_one.className}`}>
                {
                  Services?.map((curElem, i) => (
                    <option value={curElem} className={style.dp_content} key={i} onClick={() => { setService(curElem), setdropdown("") }}>
                      {curElem}
                    </option>
                  ))
                }
              </div>
            </div>
            {
              error.Service && <span className={`err ${f_one.className}`}>{error.Service}</span>
            }
          </div>
          <input onChange={() => { }} name='service' type="text" className={style.hidden} value={service} />
          <div className={style.inputs}>
            <div className="flex col gap_10">
              <input type="date" name='date' onChange={(e) => { setDate(e.target.value) }} className={`${style.input} ${f_one.className} ${style.date}`} />
              {
                error.Date && <span className={`err ${f_one.className}`}>{error.Date}</span>
              }
            </div>
            <div className="flex col gap_10">
              <div className={style.dropdown}>
                <div className={`${style.dp_head} ${f_one.className}`} onClick={() => {
                  setdropdown(dropdown === "Tim" ? "" : "Tim");
                }}
                >
                  {time}
                  <div className={`${style.ar}  ${dropdown == "Tim" && style.active} `}>
                    <ArrowdownIcon />
                  </div>
                </div>
                <div className={`${style.dp_box} ${dropdown == "Tim" && style.active} ${f_one.className}`}>
                  {
                    Time?.map((curElem, i) => (
                      <span className={style.dp_content} key={i} onClick={() => { setTime(curElem), setdropdown("") }}>
                        {curElem}
                      </span>
                    ))
                  }
                </div>
              </div>
              <input onChange={() => { }} name='time' type="text" className={style.hidden} value={time} />
              {
                error.Time && <span className={`err ${f_one.className}`}>{error.Time}</span>
              }
            </div>
          </div>
          <button type='submit' className={`btn ${style.btn} ${f_one.className}`} onClick={(e) => { handelSubmit(e) }}>Book An Appoinment</button>
        </form>
      </div>
    </div>
  )
}

export default page