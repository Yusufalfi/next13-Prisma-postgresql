"use client";
import { useState, SyntheticEvent } from 'react'
import type { Brand } from "@prisma/client"
import axios from 'axios'
import { useRouter } from 'next/navigation';

    const AddProduct = ({brands}: {brands: Brand[]}) => {
    // console.log(brands);
    const router = useRouter()
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [brand, setBrand] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const handleModal = () => {
        setIsOpen(!isOpen);
    }
    
    const handleSubmit = async (e : SyntheticEvent) => {
        e.preventDefault()
        //hit api
        await axios.post('/api/products', {
            title: title,
            price: Number(price),
            brandId: Number(brand)
        })
        setTitle("");
        setPrice("");
        setBrand("");
        router.refresh();
        setIsOpen(false);
    }


  return (
    <div>

        <button className='btn' onClick={handleModal}>Add New</button>

        <div className={isOpen ? 'modal modal-open': 'modal'} >
            <div className="modal-box">
                <h3 className="font-bold text-lg">Add New Product</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-control w-full">
                        <label htmlFor="" className="label font-bold">product name</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value) } className="input input-bordered"placeholder="product name" />
                    </div>
                    <div className="form-control w-full">
                        <label htmlFor="" className="label font-bold">price</label>
                        <input type="text" value={price} onChange={(e) => setPrice(e.target.value) } className="input input-bordered" placeholder="price" />
                    </div>
                    <div className="form-control w-full">
                        <label htmlFor="" className="label font-bold">brand</label>
                        <select className="select select-bordered" value={brand} onChange={(e) => setBrand(e.target.value) }>
                            <option value="" disabled> Select a Brand</option>
                            {brands.map((brand) =>(
                                <option value={brand.id} key={brand.id}>{brand.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleModal}> Close </button>
                        <button type="submit" className="btn btn-primary"> Save </button>
                    </div>

                </form>
            </div>
        </div>  
    </div>
  )
}

export default AddProduct
