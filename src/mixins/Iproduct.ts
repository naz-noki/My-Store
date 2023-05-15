interface rating {
    rate: number,
    count: number,
}

export default interface Iproduct {
                            id:number,
                            title: string,
                            category: string,
                            image: string,
                            description: string,
                            price: number,
                            totalPrice: number,
                            quantity: number,
                            rate: number,
                            count: number,
                            rating: rating
                        }