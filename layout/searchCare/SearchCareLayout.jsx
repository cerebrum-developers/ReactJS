import React from 'react'
import Header from '../../components/Header'
import { Outlet, Navigate } from "react-router-dom";

const SearchCareLayout = () => {
  return (
    <>
    <Header />
    <Outlet />
    </>
  )
}

export default SearchCareLayout
