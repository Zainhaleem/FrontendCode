'use client'
import React from 'react'
import PlusSvg from '@/app/svg/PlusSvg'
import { f_one, f_two } from '@/utils/fonts'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify'
import { useParams } from 'next/navigation'
import axios from 'axios'
const page = () => {
  const [video, setVideo] = useState("");
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState(null);
  const [placedIndex, setPlacedIndex] = useState("");
  const [error, setError] = useState({ video: "", category: "" });
  const [data, setData] = useState()
  const { id } = useParams();
  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/portfolio/${id}`);
      setData(response?.data?.portfolio);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }
  const handleSubmit = async (e) => {
      e.preventDefault();
      const notify = () => toast("✅ Portfolio Updated Successfully");
      setLoading(true);
  
      let newErrors = {};
      if (!video) newErrors.video = "Video is required";
      if (!category.trim()) newErrors.category = "Category is required";
  
      if (Object.keys(newErrors).length > 0) {
        setError(newErrors);
        setLoading(false);
        return;
      }
  
      setError({ video: "", category: "" });
  
      const formData = new FormData();
      formData.append("video", video);
      formData.append("category", category);
      formData.append("priority", priority);
      if (placedIndex !== "") {
        formData.append("placedIndex", placedIndex);
      }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/portfolio/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        notify();
        setLoading(false);
        setVideo("");
        setCategory("");
      } else {
        alert(`Error: ${data.message}`);
        setloading(false);
      }
    } catch (error) {
      console.error("Error uploading portfolio video:", error.message);
      alert("Something went wrong!");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData()
  }, [])
  useEffect(() => {
    setVideo(data?.video || "");
    setCategory(data?.category || "");
    setPriority(data?.priority)
    setPlacedIndex(data?.placedIndex?.toString() || "");
  }, [data]);

  useEffect(()=>{
   console.log(placedIndex, "cc")
  },[placedIndex])
  return (
    <div className='box form'>
      <ToastContainer
        position="top-center"
        theme="dark"
        toastStyle={{ backgroundColor: "black", color: "white" }}
        progressStyle={{ backgroundColor: "white" }}
      />
      <h2 className={`${f_two.className} das_hm`}>Update Portfolio</h2>
      <form action="submit" className="form inputs">
                <div className="label_box">
                  <span className={`${f_two.className}`}>Category</span>
                  <input
                    type="text"
                    className={`input ${f_two.className}`}
                    placeholder='Type Portfolio Category'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  {error.category && <span className={`${f_one.className} err`}>{error.category}</span>}
                </div>
        
                <div className="label_box">
                <span className={`${f_two.className}`}>Video Url</span>
                  <input
                    type="text"
                    className={`input ${f_two.className}`}
                    placeholder='Type Portfolio Category'
                    value={video}
                    onChange={(e) => setVideo(e.target.value)}
                  />
                </div>
                <div className="label_box">
                  <span className={`${f_two.className}`}>Placed Index</span>
                  <input
  type="text"
  className={`input ${f_two.className}`}
  placeholder="Type Placed Index"
  value={placedIndex}
  onChange={(e) => setPlacedIndex(e.target.value)}
/>
                </div>
             
        <input disabled={loading} type="submit" onClick={handleSubmit} className={`${f_two.className} btn_sub`} value={loading ? "Uploading" : "Update Portfolio"} />
      </form>
    </div>
  )
}

export default page
