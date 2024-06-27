import getData from '@/commonTsServer/getData'
import React from 'react'
import Container from "./Container"
const Page = async () => {
    const data =await getData("/user/inventory/")
    const invetories = data.data
  return (
    <Container inventories={invetories}/>
  )
}

export default Page