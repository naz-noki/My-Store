import Iproduct from "./Iproduct";

const showMoreProducts = (products:Iproduct[], seeMore:boolean)=>{
    if(seeMore) return products.slice(0, 5);
    return products;
}

export default showMoreProducts;