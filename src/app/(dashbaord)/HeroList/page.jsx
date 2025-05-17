'use client'
import { f_two } from '@/utils/fonts'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import Loading from '@/app/components/Loading'
import TrashIcon from '@/app/svg/TrashIcon'
const page = () => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const fetchData = async () => {
    try {
      console.log("cc", )
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/hero`);
      setData(response?.data?.heroes);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }
  const Handeldelete = async (id) => {

    const confirmDelete = window.confirm("Are you sure you want to delete this Hero?");
    const notify = () => toast("✅ Hero Updated Successfully");
    if (!confirmDelete) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hero/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        notify()
        setData((prev) => prev.filter((img) => img._id !== id))
      } else {
        alert(`Delete failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error deleting image:", error.message);
      alert("Something went wrong while deleting!");
    }
  };
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className='box form'>
      <ToastContainer
        position="top-center"
        theme="dark"
        toastStyle={{ backgroundColor: "black", color: "white" }}
        progressStyle={{ backgroundColor: "white" }}
      />
      <h2 className={`${f_two.className} das_hm`}>HeroBanner List</h2>
     {
      loading ? (<Loading/>) : (
        <div className="list">
        {
          data?.map((curElem, index) => (
            <div className="list_item" key={index}>
              <div className="hero_img">
                <Image
                  src={curElem?.images?.url}
                  alt="product"
                  fill
                  style={{ objectFit: "contain" }}
                  quality={100}
                />
              </div>
              <div className="btns">
                <a href={`/UpdateHero/${curElem._id}`} className={`${f_two.className} btn_update`}>Update</a>
                <button onClick={() => { Handeldelete(curElem._id) }} className={`${f_two.className} btn btn_delete`}><TrashIcon/></button>
              </div>
            </div>
          ))
        }
      </div>
      )
     }
    </div>
  )
}

export default page