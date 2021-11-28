import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getFavoritesThunk} from "../../store/favorites/thunks";
import {selectFavorites} from "../../store/favorites";
import {CourseList} from "../../components/CourseList/CourseList";


export const Favorites = () => {
    const dispatch = useDispatch();
    const favorites = useSelector(selectFavorites)

    useEffect(async () => {
        await dispatch(getFavoritesThunk())
    },[dispatch])


    return(
        <div style={{minHeight:'80vh'}}>
            <h1 style={{textAlign:'center'}}>Избранное</h1>
            <CourseList list={favorites}/>
        </div>
    )
}
