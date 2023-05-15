interface Iproduct {
    category: string,
    description: string,
    id: number,
    image: string,
    price: number,
    title: string,
}

const setProduct = (Products: Iproduct[], productTitle:string):Iproduct[] => {
    const newProductsList:Iproduct[] = [];
    for(let i = 0; i<Products.length; i++){
        const cur:Iproduct = Products[i];
        if(cur.title.includes(productTitle)) newProductsList.push(cur);
    }
    return newProductsList;
}

export default setProduct;