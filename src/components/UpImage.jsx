import React, { useState, useRef } from 'react'
import Camera, { FACING_MODES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { MdFlipCameraAndroid, MdUploadFile } from 'react-icons/md';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UpImage = ({takenimg,setTakenImg, isConvo}) => {
  const [cameraPos, setCameraPos] = useState(FACING_MODES.USER)
  const fileInputRef = useRef(); 

  const toastData = {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Slide,
  }

  const handleTakePhoto = (dataUri) => {
    toast.success('Label picture captured !', toastData);
    setTakenImg(dataUri);
  }

  const handleCameraFlip = () => {
    try{
      if (cameraPos === FACING_MODES.USER){
        setCameraPos(FACING_MODES.ENVIRONMENT)
      }else{
        setCameraPos(FACING_MODES.USER)
      }
      toast.info('Camera switched !', toastData);
    }catch(err){
      toast.info('Camera cannot be switched !', toastData);
    }
  }

  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setTakenImg(reader.result);
      toast.success("Label Uploaded!",toastData);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="p-2">
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
      {!isConvo?<span className="text-xl font-bold">scan food nutrient labels here ↓</span>:<span className="text-xl font-bold">Camera is off, conversation started. <br />Click on Conversation Icon to stop convo and start Camera</span>}
      {!isConvo && <Camera imageType='png' idealResolution={{width:800,height:720}} idealFacingMode = {cameraPos} isImageMirror = {false}
        onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
      />}
      <div className="flex justify-between items-center w-full">
        {takenimg && <img src={takenimg} alt="label" className="h-[100px] p-2 rounded-2xl"/>}
        <div className='flex gap-2 items-center mt-5 border rounded-lg p-2'>
          <button onClick={handleUpload}><MdUploadFile className='sm:text-5xl text-3xl'/></button>
          <button onClick={handleCameraFlip}><MdFlipCameraAndroid className='sm:text-5xl text-3xl'/></button>
        </div>
      </div>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" />
      <p className="text-[11px] text-gray-400 text-bold">*this image will be used for analysis you can retake if image is not clear</p>
    </div>
  )
}

export default UpImage
