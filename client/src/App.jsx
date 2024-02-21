import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import SignInHotel from "./pages/SignInHotel"
import SignUpHotel from "./pages/SignUpHotel"
import HotelProfile from "./pages/HotelProfile"
import HotelListings from "./pages/HotelListings"
import TouristProfile from "./pages/TouristProfile"
import SignUpTourist from "./pages/SignUpTourist"
import SignInTourist from "./pages/SignInTourist"
import EditHotel from "./pages/EditHotel"
import EditTourist from "./pages/EditTourist"
import CreateRoom from "./pages/CreateRoom"
import BookRoom from "./pages/BookRoom"
import BookRoomDetails from "./pages/BookRoomDetails"
import YourRoom from "./pages/YourRoom"
import About from "./pages/About"
import RoomDetails from "./pages/RoomDetails"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in-hotel' element={<SignInHotel />} />
        <Route path='/sign-up-hotel' element={<SignUpHotel />} />
        <Route path='/sign-up-tourist' element={<SignUpTourist />} />
        <Route path='/sign-in-tourist' element={<SignInTourist />} />
        <Route path='/hotel-profile' element={<HotelProfile />} />
        <Route path='/hotel-listings' element={<HotelListings />} />
        <Route path='/hotel-edit/:id' element={<EditHotel />} />
        <Route path='/room-details/:id' element={<RoomDetails />} />
        <Route path='/tourist-edit/:id' element={<EditTourist />} />
        <Route path='/tourist-profile' element={<TouristProfile />} />
        <Route path='/create-room' element={<CreateRoom />} />
        <Route path='/book-room/:id' element={<BookRoom />} />
        <Route path='/book-room-details/:id' element={<BookRoomDetails />} />
        <Route path='/your-room/:roomId/:roomNo' element={<YourRoom />} />
      </Routes>
    </BrowserRouter>
  )
}
