import React, { useState } from 'react'
import { Country, State } from 'country-state-city';
import { useDispatch } from 'react-redux';
import { saveShippingInfo } from '../../features/Cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import CheckOutSteps from './CheckOutSteps';

import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PinDropIcon from '@mui/icons-material/PinDrop';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PublicIcon from '@mui/icons-material/Public';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';

function Shipping() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');

  function setShippingInfo(){
    dispatch(saveShippingInfo({address, city, pinCode, phoneNo, country, state}))
    const shippingInfo = {
      address,
      city, 
      pinCode,
      phoneNo,
      country,
      state
    }
    sessionStorage.setItem('shippingInfo', JSON.stringify(shippingInfo))
    navigate('/order/confirmorder')
  }

  return (
    <>
    
      <CheckOutSteps activeStep={0} />
      
      <div className="container mt-9 min-h-screen -[80%] mx-auto">
        <h3 className='mx-auto text-center text-2xl font-medium border-b-2 opacity-90 pb-3 w-52'>Shipping Details</h3>
        <form onSubmit={setShippingInfo} className='flex flex-col justify-center items-center  gap-5  mt-5 md:w-[40%] w-[80%] mx-auto'>

          <div className="address relative flex items-center w-full">
            <span className='absolute m-2'><HomeIcon /></span>
            <input type="text" required className='border-2 focus:border-black pl-8 py-3 outline-none w-full' placeholder='Address' value={address} onChange={(e) => { setAddress(e.target.value) }} minLength={8}/>
          </div>

          <div className="city relative flex items-center w-full">
            <span className='absolute m-2'><LocationCityIcon /></span>
            <input type="text" required className='border-2 focus:border-black pl-8 py-3 outline-none w-full' placeholder='City' value={city} onChange={(e) => { setCity(e.target.value) }} minLength={3}/>
          </div>

          <div className="pin-code relative flex items-center w-full">
            <span className='absolute m-2'><PinDropIcon /></span>
            <input type="number" required className='border-2 focus:border-black pl-8 py-3 outline-none w-full' placeholder='Pin Code' value={pinCode} onChange={(e) => { setPinCode(e.target.value) }} minLength={3}/>
          </div>

          <div className="phone-no relative flex items-center w-full">
            <span className='absolute m-2'><LocalPhoneIcon /></span>
            <input type="number" required className='border-2 focus:border-black pl-8 py-3 outline-none w-full' placeholder='Phone Number' value={phoneNo} onChange={(e) => { setPhoneNo(e.target.value) }} minLength={9}/>
          </div>

          <div className="country relative flex items-center w-full">
            <span className='absolute m-2'><PublicIcon /></span>
            <select required className='border-2  pl-8 py-3 outline-none w-full' value={country} onChange={(e) => { setCountry(e.target.value) }}>

              <option value="country">Country</option>

              {Country && Country.getAllCountries().map(item => {
                return <option value={item.isoCode} key={item.isoCode}>{item.name}</option>
              })}

            </select>
          </div>

          {country && <div className="state relative flex items-center w-full">
            <span className='absolute m-2'><TransferWithinAStationIcon /></span>
            <select required className='border-2  pl-8 py-3 outline-none w-full' value={state} onChange={(e) => { setState(e.target.value) }}>

              <option value="country">State</option>

              {State && State.getStatesOfCountry(country).map(item => {
                return <option value={item.name} key={item.isoCode}>{item.name}</option>
              })}

            </select>
          </div>}

          <button className='w-full py-3 rounded mt-4 mb-11 text-white text-xl bg-red-600 hover:bg-red-500' type='submit'>Continue</button>
        </form >
      </div >

    </>
  )
}

export default Shipping