import React from 'react'
import Image from 'next/image';


type Props = {};

function Page({}: Props) {
  return (
    <div>
       <div>
       <Image width={50} height={50}  src="/soundPic.jpg" alt="poster image" />
       </div>
    </div>
  )
}

export default Page;