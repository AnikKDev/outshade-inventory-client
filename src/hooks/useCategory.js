import {
    useQuery,

} from '@tanstack/react-query'


const useCategory = () => {
    const { data: categories, isLoading, refetch } = useQuery(['orders'], () => fetch('https://fast-badlands-17448.herokuapp.com/categories').then(res => res.json()));

    return [categories, isLoading, refetch];
};

export default useCategory;