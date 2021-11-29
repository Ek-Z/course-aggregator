import {useSelector} from "react-redux";
import {selectFavorites} from "../../store/favorites";
import {CourseList} from "../../components/CourseList/CourseList";


export const Favorites = () => {
    const favorites = useSelector(selectFavorites)

    return(
        <div style={{minHeight:'80vh'}}>
            <h1 style={{textAlign:'center', marginBottom:'15px'}}>Избранное</h1>
            {favorites.length ? <CourseList list={favorites}/> : <p style={{textAlign:'center'}}>Вы пока ничего не добавили в избранное</p>}
        </div>
    )
}
