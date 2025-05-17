'use client'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Loading from '@/app/components/Loading'
import TrashIcon from '@/app/svg/TrashIcon'
import axios from 'axios'
import { f_two } from '@/utils/fonts'
const page = () => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState("")
  const [statusValue, setStatusValue] = useState("")
  const [appointments, setAppointments] = useState([]);
  const fetchAppointments = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/appoinments${status ? `?status=${status}` : ''}`;
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        setAppointments(data.appointments);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [status]);
  const handelUpdateStatus = async (e, value, id) =>{
  const notify = () => toast("✅ Status Updated Successfully");
  e.preventDefault();
  setLoading(true);
  const formData = new FormData();
  formData.append("status", value);
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/appointment/${id}`, {
      method: "PUT",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      notify();
      setLoading(false);
      setStatusValue(null);
      fetchAppointments()
    } else {
      alert(`Error: ${data.message}`);
      setLoading(false);
    }
  } catch (error) {
    console.error("Error updateing status:", error.message);
    alert("Something went wrong!");
    setLoading(false);
  }
  }
  return (
    <div className='box form'>
      <ToastContainer
        position="top-center"
        theme="dark"
        toastStyle={{ backgroundColor: "black", color: "white" }}
        progressStyle={{ backgroundColor: "white" }}
      />
      <h2 className={`${f_two.className} das_hm`}>Appoinment List</h2>
      <select className={`select_box ${f_two.className}`} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Filter</option> {/* default */}
        <option value="Approved">Approved</option>
        <option value="Disapproved">Disapproved</option>
        <option value="Pending">Pending</option>
      </select>

      {loading ? (<Loading />) : (
        <div className="list">
          {appointments?.map((curElem, i) => (
            <div className="list_item appoinment" key={i}>
              <span className={`${f_two.className} bts`}>Name:{curElem?.name}</span>
              <span className={`${f_two.className} bts`}>Email: {curElem?.email}</span>
              <span className={`${f_two.className} bts`}>Phone: {curElem?.email}</span>
              <span className={`${f_two.className} bts`}>Address:{curElem?.address}</span>
              <span className={`${f_two.className} bts`}>Time:{curElem?.time}</span>
              <div className="btns ap">
                <button className={`ap_btn btn ${f_two.className}`} onClick={(e)=>{handelUpdateStatus(e, "Approved", curElem._id)}}>Approve</button>
                <button className={`ap_btn btn ${f_two.className}`} onClick={(e)=>{handelUpdateStatus(e, "Disapproved", curElem._id)}}>Disapprove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default page
