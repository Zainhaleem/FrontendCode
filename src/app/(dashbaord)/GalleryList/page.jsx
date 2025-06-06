'use client'
import { f_two } from '@/utils/fonts'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import Loading from '@/app/components/Loading'
import TrashIcon from '@/app/svg/TrashIcon'

const page = () => {
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
  const Handeldelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this image?");
    const notify = () => toast("✅ Hero Updated Successfully");
    if (!confirmDelete) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gallery/${id}`, {
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
  return (
    <div className='box form'>
            <ToastContainer
              position="top-center"
              theme="dark"
              toastStyle={{ backgroundColor: "black", color: "white" }}
              progressStyle={{ backgroundColor: "white" }}
            />
      <h2 className={`${f_two.className} das_hm`}>Gallery List</h2>
      {loading ? (
        <Loading/>
      ): (
        <div className="list">
        {
          data?.map((curElem, index) => (
            <div className="list_item" key={index}>
              <div className="gallery_img">
                <Image
                  src={curElem?.images?.url}
                  alt="product"
                  fill
                  style={{ objectFit: "contain" }}
                  quality={100}
                />
              </div>
              <div className="btns">
                <a href={`/UpdateGallery/${curElem._id}`} className={`${f_two.className} btn_update`}>Update</a>
                <button onClick={() => { Handeldelete(curElem._id) }} className={`${f_two.className} btn btn_delete`}><TrashIcon/></button>
              </div>
            </div>
          ))
        }
      </div>
      )}
      <button className={`btn see btn_gr ${f_two.className}`}  onClick={() => fetchData()}
        disabled={isLoadingMore}> {isLoadingMore ? "Loading..." : "Show More"}</button>
    </div>
  )
}

export default page
