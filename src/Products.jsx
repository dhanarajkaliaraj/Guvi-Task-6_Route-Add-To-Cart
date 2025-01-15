import { useEffect } from "react";
import { useState } from "react";

import Card from './Card';

function Products({ addToCart}) {
    const [products, setProducts] = useState([]);

    let fetchProducts = async () => {
        const productsData = await fetch(
          "https://6461c1c2491f9402f4aa0565.mockapi.io/products"
        );
        // const productsData = await fetch('https://fakestoreapi.com/products');
            // .then(res=>res.json())
            // .then(json=>console.log(json))
        const productResponse = await productsData.json();
        setProducts(productResponse);
      };

      useEffect(() => {
        fetchProducts();
      }, []);
    

    return (
        <>           
        <h3 className='text-center text-[3rem]'>Products</h3>
        <div className="flex flex-wrap justify-evenly items-center gap-6">
            {products.map((product, index) => {
                return (
                    <Card key={index} product={product} index={index} handleAddToCart={addToCart} />
                );
            })}
        </div>
        </>
    )
}

export default Products