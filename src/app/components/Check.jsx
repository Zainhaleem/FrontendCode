import React from 'react'
const getData = async ({ category = "TVC", page = 0, limit = 6 }) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/portfolio?category=${category}&page=${page}&limit=${limit}`;
  
    try {
      const res = await fetch(url, { cache: "no-store" }); // no-store disables caching
      const { portfolios } = await res.json();
      return portfolios;
    } catch (error) {
      console.error("Server error fetching data:", error);
      return [];
    }
  };
  const getCategories = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/category`;
    try {
      const res = await fetch(url, { cache: "no-store" });
      const data = await res.json();
      if (res.ok) {
        return data?.data || [];
      } else {
        console.error("Error fetching categories:", data.message);
        return [];
      }
    } catch (error) {
      console.error("Server error fetching categories:", error);
      return [];
    }
  };
const Check =  async ({searchParam}) => {
  return (
    <div>Check</div>
  )
}

export default Check