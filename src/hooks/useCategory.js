import {
    useQuery,

} from '@tanstack/react-query'


const useCategory = () => {
    const { data: categories, isLoading, refetch } = useQuery(['orders'], () => fetch('http://localhost:5000/categories').then(res => res.json()));

    return [categories, isLoading, refetch];
};

export default useCategory;