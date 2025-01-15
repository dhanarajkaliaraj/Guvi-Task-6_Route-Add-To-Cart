
function Cart({ cart, total, handleRemoveCart, addQuantity, reduceQuantity }) {
    const discounted = (amount) => (amount * (90/100)).toFixed(2);  
    
    return (
        <div className='mx-10 sm:mx-24'>
            <h3 className='text-center text-[3rem]'>Cart</h3>
            {cart.map((item, index) => {
                return (
                    <div key={index} className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-gray-600">Rs.{item.price}</p>
                        </div>
                        <div>
                            <p className="font-medium text-center">Quantity</p>
                            <span className="text-gray-600 text-center"><button className="mr-2 w-[20px] font-semibold bg-gray-300 rounded-[50%]"
                            onClick={()=> reduceQuantity(item, index)}
                            >-</button>{item?.quantity ? item.quantity : 1}<button 
                            onClick={()=>addQuantity(item, index)}
                            className="w-[20px] ml-2 font-semibold bg-gray-300 rounded-[50%]">+</button></span>
                        </div>
                        <button onClick={() => {
                            handleRemoveCart(item, index)
                        }} className="text-red-500 hover:text-red-700">
                            Remove
                        </button>
                    </div>
                );
            })}
            <div className="pt-4 mt-8 border-t">
                <div className="flex items-center justify-between">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold">Rs.{Number(total).toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="font-bold">Discounted 10%:</span>
                    <span className="font-bold">Rs.{total > 0 ? discounted(Number(total).toFixed(2)): 0.00}</span>
                </div>
            </div>
        </div>
    )
}

export default Cart