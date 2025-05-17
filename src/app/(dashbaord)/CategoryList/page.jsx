"use client"
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import TrashIcon from '@/app/svg/TrashIcon'
import Loading from '@/app/components/Loading'
import { f_two } from '@/utils/fonts'
const page = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
      const Handeldelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this image?");
        const notify = () => toast("✅ Category Deleted Successfully");
        if (!confirmDelete) return;
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category/${id}`, {
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
        const fetchCategory = async () => {
          try {
            const url = `${process.env.NEXT_PUBLIC_API_URL}/api/category`;
            const res = await fetch(url);
            const data = await res.json();
            if (res.ok) {
              setData(data?.data);
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
        <div className='box form'>
            <ToastContainer
                position="top-center"
                theme="dark"
                toastStyle={{ backgroundColor: "black", color: "white" }}
                progressStyle={{ backgroundColor: "white" }}
            />
            <h2 className={`${f_two.className} das_hm`}>Category List</h2>
            {loading ? <Loading/> : (
               <div className="list">
                 {data?.map((curElem, i)=>(
                    <div className="list_item appoinment" key={i}>
                    <span className={`${f_two.className} bts`}>category: {curElem?.category}</span>
                    <span className={`${f_two.className} bts`}>
  SubCategories: {curElem?.subCategories?.map((item) => item.point).join(', ')}
</span>

                    <div className="btns">
                    <a href={`/UpdateCategory/${curElem._id}`} className={`${f_two.className} btn_update`}>Update</a>
                    <button onClick={() => Handeldelete(curElem._id)} className={`${f_two.className} btn btn_delete`}>
                    <TrashIcon />
                  </button>
                    </div>
                 </div>
                 ))}
               </div>
            )}
        </div>
    )
}

export default page