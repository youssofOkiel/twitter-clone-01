import React, {useEffect, useState} from 'react'
import { Button , Input } from '@material-ui/core'
import {useStateValue} from '../../contexts/StateContextProvider'
import './replay.css'
const Replay = () => {
    const [{user}] = useStateValue()

    useEffect(() => {
       
    }, [])

    return (
       <>
            <div className='replay'>
            <Input
                placeholder="enter your replay"
                type="text"
                className='replayInput'
              />
              <Button className='ReplayButton'>replay</Button>
              </div>
       </>
    )
}

export default Replay