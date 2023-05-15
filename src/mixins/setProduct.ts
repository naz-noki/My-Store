import Iproduct from "./Iproduct";

const setProduct = (Products: Iproduct[], productTitle:string):Iproduct[] => {
    const newProductsList:Iproduct[] = [];
    for(let i = 0; i<Products.length; i++){
        const cur:Iproduct = Products[i];
        if(cur.title.includes(productTitle)) newProductsList.push(cur);
    }
    return newProductsList;
}

export default setProduct;