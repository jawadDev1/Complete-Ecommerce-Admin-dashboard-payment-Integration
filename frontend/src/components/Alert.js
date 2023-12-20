import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ShowAlert() {
  const { message, show_alert } = useSelector(state => state.alert);
  const { success: productSuccess } = useSelector(state => state.products)
  const { success: userSuccess } = useSelector(state => state.user)
  const { success: orderSuccess } = useSelector(state => state.order)

  const notify = () => toast(message, {
    position: "top-center",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    progress: undefined,
    theme: "light",
    pauseOnHover: false
    });

    // if(productSuccess || userSuccess || orderSuccess){
    if(show_alert){
      notify();
    }

  return (
    
    <div>
      <ToastContainer ></ToastContainer>
    </div>
    

  )
}

export default ShowAlert