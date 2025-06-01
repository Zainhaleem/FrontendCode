'use client'
import { f_two } from '@/utils/fonts'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import Loading from '@/app/components/Loading'
import TrashIcon from '@/app/svg/TrashIcon'
import Image from 'next/image'
const page = () => {
  const [data, setData] = useState()
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [Category, setCategory] = useState("TVC");
  const [CatData, setCatData] = useState([]);
  const [page, setPage] = useState(0);
  const limit = 6;

  const Handeldelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this image?");
    const notify = () => toast("✅ Portfolio Deleted Successfully");
    if (!confirmDelete) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/portfolio/${id}`, {
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
    const fetchData = async () => {
      // decide which loader to flip
      if (page === 0) setInitialLoading(true);
      else setLoadingMore(true);

      try {
        const { data: res } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/portfolio`,
          { params: { category: Category, page, limit } }
        );

        setData(prev =>
          page === 0
            ? res.portfolios    // replace on the very first load
            : [...prev, ...res.portfolios]  // append on “load more”
        );
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      } finally {
        // flip off the correct loader
        if (page === 0) setInitialLoading(false);
        else setLoadingMore(false);
      }
    };

    fetchData();
  }, [Category, page]);
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
      <h2 className={`${f_two.className} das_hm`}>Portfolio List</h2>
      <select className={`select_box ${f_two.className}`} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Filter By Category</option> {/* default */}
        {CatData?.map((curElem, i)=>(
          <option value={curElem?.category} key={i}>{curElem?.category}</option>
        ))}
      </select>
      {CatData.find(cat => cat.category == Category)?.subCategories?.length > 0 && (
             <select className={`select_box ${f_two.className}`} onChange={(e) => setCategory(e.target.value)}>
             <option value="">Filter By SubCategories</option> {/* default */}
             {CatData.find(cat => cat.category === Category)?.subCategories.map((subCat, i) => (
                   <option value={subCat.point} key={i}>{subCat.point}</option>
                 ))}
           </select>
      )}
      {initialLoading ? (<Loading />) : (
        <div className="list">
          {
            data?.map((curElem, index) => {
              const videoUrl = curElem?.video;

              let embedUrl = "";
              if (videoUrl.includes("youtu.be")) {
                embedUrl = videoUrl.replace("youtu.be/", "www.youtube.com/embed/").split("?")[0];
              } else if (videoUrl.includes("youtube.com/watch?v=")) {
                const videoId = new URL(videoUrl).searchParams.get("v");
                embedUrl = `https://www.youtube.com/embed/${videoId}`;
              } else if (videoUrl.includes("vimeo.com")) {
                embedUrl = videoUrl.includes("player.vimeo.com")
                  ? videoUrl
                  : videoUrl.replace("vimeo.com/", "player.vimeo.com/video/");
              }

              return (
                <div className="list_item" key={index}>
                  <div className="portfolio_video">
                        {embedUrl !== "" ? (
                            <iframe
                      width="100%"
                      height="100%"
                      src={embedUrl}
                      title={`Video ${index}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    ) : (
                      <div className="gallery_img">
                                    <Image
                                      src={curElem?.image?.url}
                                      alt="product"
                                      fill
                                      style={{ objectFit: "cover" }}
                                      quality={100}
                                    />
                                  </div>
                    ) }
                  </div>
                  <div className="flex col content_dash">
                    <div className="flex col gap_10">
                      <span className={`${f_two.className} bts`}>Category : {curElem?.category}</span>
                      <span className={`${f_two.className} bts`}>Priority : {String(curElem?.priority)}</span>
                    </div>
                    <div className="btns">
                      <a href={`/UpdatePortfolio/${curElem._id}`} className={`${f_two.className} btn_update`}>Update</a>
                      <button onClick={() => Handeldelete(curElem._id)} className={`${f_two.className} btn btn_delete`}>
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          }
        </div>
      )}
      <button className={`btn see btn_gr ${f_two.className}`} disabled={loadingMore} onClick={() => setPage(prev => prev + 1)}> {loadingMore ? "Loading…" : "SEE MORE"}</button>
    </div>
  )
}

export default page
