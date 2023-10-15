
import React from 'react'
import axios from "axios"
import Layout from '@/components/Layout'
import ProductItem from '@/components/ProductItem'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

const Category = ({ data, category }) => {
    return (
        <>
            <Navbar />

            <div className="w-10/12 h-full mx-auto">
                <h2 className="text-center pt-16 text-2xl">Category: <span className="text-orange-500">{category}</span></h2>
                <div className="grid grid-cols-3 gap-16">
                    {data?.map((product) => (
                        <ProductItem key={product._id} product={product} />
                    ))}
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Category

export async function getServerSideProps(ctx) {
    const category = ctx.params.cat

    const { data } = await axios.get(`http://localhost:3000/api/products?cat=${category}`)

    return {
        props: {
            data,
            category
        }
    }
}