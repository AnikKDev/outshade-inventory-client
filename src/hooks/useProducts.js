import {
    useQuery,
} from '@tanstack/react-query'


const useProducts = () => {
    const { data: products, isLoading, refetch } = useQuery(['products'], () => fetch('http://localhost:5000/products').then(res => res.json()));

    return [products, isLoading, refetch];
};

export default useProducts;