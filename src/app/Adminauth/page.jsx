'use client'
import { f_two } from '@/utils/fonts'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const page = () => {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const router = useRouter()

    const handelSubmit = (e) => {
        e.preventDefault();
        if (
            email === process.env.NEXT_PUBLIC_ADMIN_EMAIL &&
            pass === process.env.NEXT_PUBLIC_ADMIN_PASS
          ) {
            document.cookie = "authorizedAdmin=true; path=/; max-age=86400";
            router.push('/DashHome');
          } else {
            alert("Invalid credentials");
          }
          
    }

    return (
        <form className="adminAuth">
            <h2 className={`hm ${f_two.className}`}>Admin Auth</h2>
            <input
                className={`input ${f_two.className}`}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
                type='email'
            />
            <input
                className={`input ${f_two.className}`}
                onChange={(e) => setPass(e.target.value)}
                placeholder='Password'
                type='password'
            />
            <input
                type="submit"
                onClick={handelSubmit}
                className={`${f_two.className} btn_sub`}
                value="Login"
            />
        </form>
    )
}

export default page
