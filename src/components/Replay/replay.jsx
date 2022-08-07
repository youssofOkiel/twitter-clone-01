import React, {useEffect, useState} from 'react'
import { Button , Input } from '@material-ui/core'
import {useStateValue} from '../../contexts/StateContextProvider'
import db from "../../firebase";
import './replay.css'
import Spinner from '../elements/Spinner/Spinner';
const Replay = ({postId}) => {
    const [{user}] = useStateValue()
    const [commentText , setCommentText] = useState("")
    const [isLoading , setIsLoading] = useState(false)

    useEffect(() => {
       
    }, [])

    const addComment = (e) => {
        e.preventDefault();
        setIsLoading(true)
        db.collection("comments").add({
            sender:user,
            tweetId:postId,
            text:commentText
        })
        setCommentText("")
        setIsLoading(false)
    }

    return (
       <>
            <div className='replay'>
                <form onSubmit={addComment}>

            
            <Input
                placeholder="enter your replay"
                type="text"
                className='replayInput'
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              {isLoading ? (
                  <Button  className='ReplayButton' type='submit'>
                    <Spinner />
                  </Button>
                ) : (
                  <Button  className='ReplayButton' type="submit" >
                    replay
                  </Button>
                )}
              </form>
              </div>
       </>
    )
}

export default Replay