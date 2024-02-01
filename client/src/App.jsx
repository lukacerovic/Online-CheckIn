import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import SignInHotel from "./pages/SignInHotel"
import SignUpHotel from "./pages/SignUpHotel"
import HotelProfile from "./pages/HotelProfile"
import TouristProfile from "./pages/TouristProfile"
import SignUpTourist from "./pages/SignUpTourist"
import SignInTourist from "./pages/SignInTourist"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in-hotel' element={<SignInHotel />} />
        <Route path='/sign-up-hotel' element={<SignUpHotel />} />
        <Route path='/sign-up-tourist' element={<SignUpTourist />} />
        <Route path='/sign-in-tourist' element={<SignInTourist />} />
        <Route path='/hotel-profile' element={<HotelProfile />} />
        <Route path='/tourist-profile' element={<TouristProfile />} />
      </Routes>
    </BrowserRouter>
  )
}
