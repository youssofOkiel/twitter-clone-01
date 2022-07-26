import React from 'react'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'


const ModalImage = ({open, onClose, imgsrc}) => {

    return (
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        style={{ display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 'none'}}
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
           <div className='modalImage__imageWrapper'>
              <img src={imgsrc} alt="popupimge"/>
           </div>
        </Fade>
      </Modal>
    )
}

export default ModalImage
