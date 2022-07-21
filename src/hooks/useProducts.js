import {
    useQuery,
} from '@tanstack/react-query'


const useProducts = () => {
    const { data: products, isLoading, refetch } = useQuery(['products'], () => fetch('https://fast-badlands-17448.herokuapp.com/products').then(res => res.json()));

    return [products, isLoading, refetch];
};

export default useProducts;