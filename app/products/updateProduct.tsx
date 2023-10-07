"use client";
import { useState, SyntheticEvent } from 'react'
import type { Brand } from "@prisma/client"
import axios from 'axios'
import { useRouter } from 'next/navigation';


type Product = {
    id: number;
    title: string;
    price: number;
    brandId: number;
}

const UpdateProduct = ({brands, product}: {brands: Brand[]; product: Product}) => {
    // console.log(brands);
    const router = useRouter()
    const [title, setTitle] = useState(product.title);
    const [price, setPrice] = useState(product.price);
    const [brand, setBrand] = useState(product.brandId);
    const [isOpen, setIsOpen] = useState(false);

    const handleModal = () => {
        setIsOpen(!isOpen);
    }
    
    const handleUpdate = async (e : SyntheticEvent) => {
        e.preventDefault()
        //hit api
        await axios.patch(`/api/products/${product.id}`, {
            title: title,
            price: Number(price),
            brandId: Number(brand)
        })
        router.refresh();
        setIsOpen(false);
    }


  return (
    <div>

        <button className='btn btn-info btn-sm' onClick={handleModal}> Edit </button>

        <div className={isOpen ? 'modal modal-open': 'modal'} >
            <div className="modal-box">
                <h3 className="font-bold text-lg">Update {product.title}</h3>
                <form onSubmit={handleUpdate}>
                    <div className="form-control w-full">
                        <label htmlFor="" className="label font-bold">product name</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value) } className="input input-bordered"placeholder="product name" />
                    </div>
                    <div className="form-control w-full">
                        <label htmlFor="" className="label font-bold">price</label>
                        <input type="text" value={price} onChange={(e) => setPrice(Number(e.target.value)) } className="input input-bordered" placeholder="price" />
                    </div>
                    <div className="form-control w-full">
                        <label htmlFor="" className="label font-bold">brand</label>
                        <select className="select select-bordered" value={brand} onChange={(e) => setBrand(Number(e.target.value)) }>
                            {/* <option value="" disabled> Select a Brand</option> */}
                            {brands.map((brand) =>(
                                <option value={brand.id} key={brand.id}>{brand.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="modal-action d-flex">
                        <button type="button" className="btn" onClick={handleModal}> Close </button>
                        <button type="submit" className="btn btn-primary"> Save </button>
                    </div>

                </form>
            </div>
        </div>  
    </div>
  )
}

export default UpdateProduct
