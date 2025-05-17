'use client'
import PlusSvg from '@/app/svg/PlusSvg'
import { f_one, f_two } from '@/utils/fonts'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

const page = () => {
  const [video, setVideo] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [OpenSubCat, setOpenSubCat] = useState(undefined)
  const [Catdata, setCatData] = useState([])
  const [error, setError] = useState({ video: "", category: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const notify = () => toast("✅ Portfolio Uploaded Successfully");
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
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/portfolio`, {
        method: "POST",
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
        setLoading(false);
      }
    } catch (error) {
      console.error("Error uploading portfolio video:", error.message);
      alert("Something went wrong!");
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/category`;
        const res = await fetch(url);
        const data = await res.json();
        if (res.ok) {
          setCatData(data?.data);
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
      <h2 className={`${f_two.className} das_hm`}>Create Portfolio</h2>
      <form action="submit" className="form inputs">
        <div className="label_box">
          <span className={`${f_two.className}`}>Category</span>
          <select name="category" className={`select_box ${f_two.className}`} onChange={(e) => { setCategory(e.target.value); setOpenSubCat(e.target.value) }}>
            <option value="Category">Category</option>
            {Catdata?.map((curElem, i) => (
              <option value={curElem.point} key={i}>{curElem?.category}</option>
            ))}
          </select>
          {error.category && <span className={`${f_one.className} err`}>{error.category}</span>}
        </div>
        <div className="label_box">
          <span className={`${f_two.className}`}>Sub Category</span>
          <select name="category" className={`select_box ${f_two.className}`} onChange={(e) => setCategory(e.target.value)}>
            <option value="Sub Category">Sub Category</option>
            {Catdata.find(cat => cat.category === category)?.subCategories.map((subCat, i) => (
              <option value={subCat.point} key={i}>{subCat.point}</option>
            ))}
          </select>
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

        {error.video && <span className={`${f_one.className} err`}>{error.video}</span>}

        <input
          disabled={loading}
          type="submit"
          onClick={handleSubmit}
          className={`${f_two.className} btn_sub`}
          value={loading ? "Uploading" : "Create Portfolio"}
        />
      </form>
    </div>
  )
}

export default page;
