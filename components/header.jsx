import React from 'react'
import { SignedIn,SignedOut,SignInButton,SignOutButton,SignUpButton,UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'
import { LayoutDashboard, PenBox } from 'lucide-react'
import {checkuser} from "@/lib/checkuser"

const header = async() => {
  await checkuser();
  return (
    <div className='fixed top-0 w-full bg-black backdrop-blur-md z-50 border-b-2 border-gray-500'>
      <nav className='container mx-auto flex items-center justify-between'>
        <Link href="/">
        <Image
        src={"/logo.png"}
        alt="Nexora Logo"
        height = {50}
        width = {150}
        >
        </Image>
        </Link>
      <div className='flex items-center space-x-4'>
        <SignedIn>
          <Link href={"/dashboard"}>
          <Button className='bg-orange-600'>
            <LayoutDashboard size={18}></LayoutDashboard>
            <span className='hidden md:inline'>Dashboard</span>
          </Button>
          </Link>
          <Link href={"/transaction/create"}>
          <Button className='bg-orange-600'>
            <PenBox size={18}></PenBox>
            <span className='hidden md:inline'>Add Transaction</span>
          </Button></Link>
        </SignedIn>
              <SignedOut>
              <SignInButton forceRedirectUrl="/dashboard">
                <Button variant="outline">
                  Login
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton appearance={{
                elements:{
                  avatarBox:"w-10 h-10",
                }
              }} />
            </SignedIn>
            </div>
            </nav>
    </div>
  )
}

export default header