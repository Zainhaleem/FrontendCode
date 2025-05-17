"use client"
import TrashIcon from '@/app/svg/TrashIcon'
import { f_two } from '@/utils/fonts'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'next/navigation'
const page = () => {
    const [Category, setCateogory] = useState("")
    const [TempSubCat, setTempSubCat] = useState("")
    const [subCategory, setSubCateogory] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ category: "" });
    const [data, setData] = useState([])
    const { id } = useParams();
    const handelSubmit = async (e) => {
        e.preventDefault();
        const notify = () => toast("✅ Category Created Successfully");
        setLoading(true)
        let newErrors = {};
        if (!Category.trim()) newErrors.Category = "Category is required";
        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
            setLoading(false);
            return;
        }
        setError({ category: "" })

        const formData = new FormData();
        formData.append("category", Category);
        if (subCategory.length > 0) {
            formData.append("subCategories", JSON.stringify(subCategory));
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category/${id}`, {
                method: "PUT",
                body: formData,
            });
            if (response.ok) {
                notify();
                setLoading(false);
                setCateogory("")
                setSubCateogory([])
            } else {
                alert(`Error: ${data.message}`);
                setLoading(false);
            }
        } catch {
            console.error("Error uploading category", error.message);
            alert("Something went wrong!");
            setLoading(false);
        }
    }
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const url = `${process.env.NEXT_PUBLIC_API_URL}/api/category/${id}`;
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
    }, [id]);
    useEffect(() => {
        setCateogory(data?.category || "")
        setSubCateogory(data?.subCategories || [])
    }, [data])
    return (
        <div className="box form">
            <ToastContainer
                position="top-center"
                theme="dark"
                toastStyle={{ backgroundColor: "black", color: "white" }}
                progressStyle={{ backgroundColor: "white" }}
            />
            <h2 className={`${f_two.className} das_hm`}>Update Category</h2>
            <div className="form inputs">
                <div className="label_box">
                    <span className={`${f_two.className}`}>Category</span>
                    <input type="text" onChange={(e) => { setCateogory(e.target.value) }} value={Category} className={`${f_two.className} input`} />
                    <span className={`err ${f_two.className}`}>{error.category}</span>
                </div>
                <div className="label_box">
                    <span className={`${f_two.className}`}>SubCategories</span>
                    <input
                        type="text"
                        onChange={(e) => setTempSubCat(e.target.value)}
                        className={`${f_two.className} input`}
                        value={TempSubCat}
                    />
                    <button
                        className={`ap_btn btn ${f_two.className}`}
                        onClick={() => {
                            if (TempSubCat.trim() !== "") {
                                setSubCateogory((prev) => [
                                    ...prev,
                                    { point: TempSubCat.trim() }
                                ]);
                                setTempSubCat(""); // Clear input
                            }
                        }}
                    >
                        Add
                    </button>
                </div>
                {subCategory.length > 0 && (
                    <div className="label_box list_box">
                        {subCategory?.map((curElem, i) => (
                            <div key={i} className='flex alg_cen gap_10 subcat'>  <span className={`${f_two.className} bts`} key={i}>{curElem?.point}</span> <label onClick={() => {
                                setSubCateogory((prev) => prev.filter((_, index) => index !== i));
                            }}><TrashIcon /></label> </div>
                        ))}
                    </div>
                )}
                <input
                    disabled={loading}
                    type="submit"
                    onClick={handelSubmit}
                    className={`${f_two.className} btn_sub`}
                    value={loading ? "Uploading" : "Update Category"}
                />
            </div>
        </div>
    )
}

export default page
