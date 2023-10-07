import { PrismaClient } from "@prisma/client";
import AddProduct from "./addProduct";
import DeleteProduct from "./deleteProduct";
import UpdateProduct from "./updateProduct";

const prisma = new PrismaClient();

const getProducts = async () => {
    // get data from db with prisma
    const resProduct = await prisma.product.findMany({
        select: {
            id: true,
            title: true,
            price: true,
            brandId: true,
            brand:true,
        },
    });

    return resProduct;
}

const getBrands = async () => {
    const res = await prisma.brand.findMany();
    return res;
}


const Product = async () => {
    // const products = await getProducts();
    const [products, brands] = await Promise.all([
        getProducts(),
        getBrands()
    ])
    console.log(brands);

    return (
        <div>
            <div className="mb-2">
                {/* <AddProduct /> */}
                <AddProduct brands={brands} />
            </div>

            <div className="">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Brand</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product.id}>
                            <td>{index + 1}</td>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                            <td>{product.brand.name}</td>
                            <td className="flex justify-center space-x-1">
                                <DeleteProduct  product={product} />
                                <UpdateProduct brands={brands} product={product} />
                            </td>
                        </tr>
                        ))}
                    
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Product
