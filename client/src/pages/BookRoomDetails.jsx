import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function BookRoomDetails() {
    const currentUser = useSelector((state) => state.account);
    const currentUserData = currentUser.currentAccount;
    const [bookings, setBookings] = useState(undefined);
    const roomId = useParams(); // Dohvatamo roomId iz URL-a

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await fetch(`/api/booking/bookingsInfo/${roomId.id}`);
            if (!res.ok) {
              throw new Error('HTTP error, status = ' + res.status);
            }
            const data = await res.json();
            console.log("Ovo je data za booking details: ", data);
            if (!Array.isArray(data)) {
              throw new Error('Data is not in the expected format');
            }
            setBookings(data);
          } catch (error) {
            console.error('Error fetching listings:', error);
          }
        };
      
        fetchData();
      }, [roomId.id]);
  return (
    <div className='flex flex-col'>
        <h1 className='text-center text-white text-2xl'>Booking Details For</h1>
        <h1 className='text-center text-slate-500 text-2xl'>Room ID: {roomId.id}</h1>
        {bookings && bookings.length > 0 && (
            <div className='mt-10'>
                <table className="w-full mt-6 text-white" >
                    <thead>
                        <tr className="bg-gray-800 font-bold text-left">
                            <th className="text-sm px-4 py-2">Tourist Name</th>
                            <th className="text-sm px-4 py-2">Tourist Last Name</th>
                            <th className="text-sm px-4 py-2">Tourist Sex</th>
                            <th className="text-sm px-4 py-2">Tourist Birth</th>
                            <th className="text-sm px-4 py-2">Tourist Nationality</th>
                            <th className="text-sm px-4 py-2">Passport Code</th>
                            <th className="text-sm px-4 py-2">Passport Type</th>
                            <th className="text-sm px-4 py-2">Passport No</th>
                            <th className="text-sm px-4 py-2">Tourist No</th>
                            <th className="text-sm px-4 py-2">Passport Expire</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{booking.touristName}</td>
                                <td className="border px-4 py-2">{booking.touristLastName}</td>
                                <td className="border px-4 py-2">{booking.touristSex}</td>
                                <td className="border px-4 py-2">{booking.touristDateOfBirth}</td>
                                <td className="border px-4 py-2">{booking.touristNationality}</td>
                                <td className="border px-4 py-2">{booking.touristPassportCode}</td>
                                <td className="border px-4 py-2">{booking.touristPassportType}</td>
                                <td className="border px-4 py-2">{booking.touristPassportNo}</td>
                                <td className="border px-4 py-2">{booking.touristPersonalNo}</td>
                                <td className="border px-4 py-2">{booking.passportDateOfExpire}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
    </div>

  )
}
