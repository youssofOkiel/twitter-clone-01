import React, {useEffect, useState} from 'react'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'

import {useStateValue} from '../../contexts/StateContextProvider'
import './like.css'

const Like = ({likes, likeAction, unlikeAction}) => {
    const [{user}] = useStateValue()
    const [isLiked, setisLiked] = useState(false)

    useEffect(() => {
        if(user.id && likes){
            if(likes.includes(user.id)){
                setisLiked(true)
            } else {
                setisLiked(false)
            }
        }
    }, [likes])

    return (
        <div className="footerIcon_wrapper">
            { isLiked?
                <span className='liked' onClick={unlikeAction}><FavoriteIcon/></span>
            :
            <span className='unliked' onClick={likeAction} ><FavoriteBorderIcon /></span>
            }
            <span className='footerIcon__counter'>{likes.length>0 && likes.length}</span>
        </div>
    )
}

export default Like