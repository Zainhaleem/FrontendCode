'use client'
import PlusSvg from '@/app/svg/PlusSvg'
import { f_one, f_two } from '@/utils/fonts'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify';

const page = () => {
  const [image, setImage] = useState(undefined);
  const [imagesPrev, setImagesPrev] = useState(undefined)
  const [loading, setloading] = useState(false)
  const [error, setError] = useState({ image: "" });

  const handleImageUpload = (e) => {
    const files = e.target.files;
    const validImageTypes = ["image/jpeg", "image/png", "image/webp"];

    Array.from(files).forEach((file) => {
      if (!validImageTypes.includes(file.type)) {
        alert("Please select a valid image file (JPEG, PNG, WebP)");
        return;
      }
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagesPrev(reader.result);
      };
      reader.readAsDataURL(file);
    });
  };

  const handelSubmit = async (e) => {
    const notify = () => toast("✅ Hero Uploaded Successfully");
    e.preventDefault();
    setloading(true);

    let newErrors = {};
    if (!image) newErrors.image = "Image is required";

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      setloading(false);
      return;
    }

    setError({ image: "" });

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hero`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        notify();
        setloading(false);
        setImage(null);
        setImagesPrev(null);
      } else {
        alert(`Error: ${data.message}`);
        setloading(false);
      }
    } catch (error) {
      console.error("Error uploading hero image:", error.message);
      alert("Something went wrong!");
      setloading(false);
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
      <h2 className={`${f_two.className} das_hm`}>Create HeroBanner</h2>
      <form action="submit" className="form inputs">
        <div className="label_box">
          <span className={`${f_two.className}`}>Select Image </span>
          <input
            type="file"
            id="img"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            required
            className='ds_none'
          />
          <label htmlFor='img' className="img_picker">
            <PlusSvg />
          </label>
        </div>
     {
      imagesPrev && (
        <div className="prev_images">
        <div className="prev_image hero">
          <Image
            src={imagesPrev}
            alt="product"
            fill
            style={{ objectFit: "contain" }}
            quality={100}
          />
        </div>
      </div>
      )
     }
        {error.image && <span className={`${f_one.className} err`}>{error.image}</span>}

        <input
          disabled={loading}
          type="submit"
          onClick={handelSubmit}
          className={`${f_two.className} btn_sub`}
          value={loading ? "Uploading" : "Create HeroBanner"}
        />
      </form>
    </div>
  );
}

export default page;
