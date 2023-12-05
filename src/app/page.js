"use client"
import HomeComponent from '@/components/HomeComponent'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <main>
      <div>
        <Navbar />
      </div>
      <div>
        <HomeComponent />
      </div>
    </main>
  )
}
