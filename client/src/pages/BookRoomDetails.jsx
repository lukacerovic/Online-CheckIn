import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';


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

      const handleAssignRoom = async(bookingId) =>{
        console.log(bookingId);
        try {
            const res = await fetch(`/api/booking/assignRoom/${bookingId}/${roomId.id}`, // ruta za update i prosledjujemo id korisnika za proveru da li on ima pravo da menja taj profil
            {  
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            //   body: JSON.stringify(formData),
            });
            const data = await res.json(); // konvertujemo podatke u json format
            console.log("DaTa",data);
            if (data.success === false) {
              console.log(data.message);
              return;
            }
     
          } catch (error) {
            console.log(error.message);
          };
      };
  return (
    <div className='flex flex-col'>
        <Header/>
        <h1 className='text-center text-white text-2xl'>Booking Details For Room:</h1>
        <h1 className='text-center text-slate-300 text-2xl'>Room ID: {roomId.id}</h1>
        {bookings && bookings.length > 0 && (
            <div className='mt-10 self-center'>
                <table className="w-full mt-6 text-white" >
                    <thead>
                        <tr className="bg-gray-800 font-bold text-left">
                            <th style={{fontSize:'1.2vw', paddingInline:'1vw'}}>Name</th>
                            <th style={{fontSize:'1.2vw', paddingInline:'1vw'}}>Last Name</th>
                            <th style={{fontSize:'1.2vw', paddingInline:'1vw'}}>Sex</th>
                            <th style={{fontSize:'1.2vw', paddingInline:'1vw'}}>Birth</th>
                            <th style={{fontSize:'1.2vw', paddingInline:'1vw'}}>Nationality</th>
                            <th style={{fontSize:'1.2vw', paddingInline:'1vw'}}>Doc. Code</th>
                            <th style={{fontSize:'1.2vw', paddingInline:'1vw'}}>Doc. Type</th>
                            <th style={{fontSize:'1.2vw', paddingInline:'1vw'}}>Doc. No</th>
                            <th style={{fontSize:'1.2vw', paddingInline:'1vw'}}>Personal No</th>
                            <th style={{fontSize:'1.2vw', paddingInline:'1vw'}}>Doc. Expire</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => (
                            <tr key={index} className='items-center'>
                                <td className="border text-center" style={{paddingLeft:'0.5vw',fontSize:'0.8vw'}}>{booking.touristName}</td>
                                <td className="border text-center" style={{paddingLeft:'0.5vw',fontSize:'0.8vw'}}>{booking.touristLastName}</td>
                                <td className="border text-center" style={{paddingLeft:'0.5vw',fontSize:'0.8vw'}}>{booking.touristSex}</td>
                                <td className="border text-center" style={{paddingLeft:'0.5vw',fontSize:'0.8vw'}}>{booking.touristDateOfBirth}</td>
                                <td className="border text-center" style={{paddingLeft:'0.5vw',fontSize:'0.8vw'}}>{booking.touristNationality}</td>
                                <td className="border text-center" style={{paddingLeft:'0.5vw',fontSize:'0.8vw'}}>{booking.touristPassportCode}</td>
                                <td className="border text-center" style={{paddingLeft:'0.5vw',fontSize:'0.8vw'}}>{booking.touristPassportType}</td>
                                <td className="border text-center" style={{paddingLeft:'0.5vw',fontSize:'0.8vw'}}>{booking.touristPassportNo}</td>
                                <td className="border text-center" style={{paddingLeft:'0.5vw',fontSize:'0.8vw'}}>{booking.touristPersonalNo}</td>
                                <td className="border text-center" style={{paddingLeft:'0.5vw',fontSize:'0.8vw'}}>{booking.passportDateOfExpire}</td>
                                {booking.assignedRoom ? (
                                    <button className="bg-red-500 capitalize px-4 py-1 mb-3 ml-3">
                                        Assigned: {booking.assignedRoom} 
                                    </button>
                                    
                                ) : (
                                    <button onClick={() => handleAssignRoom(booking._id)} className="bg-green-500 capitalize" style={{fontSize:'1.5vw',marginLeft:'0.5vw', paddingInline:'0.5vw'}}>
                                        Assign Room
                                    </button>
                                )}

                            </tr>
                            
                        ))}
                    </tbody>
                </table>
            </div>
        )}
    </div>

  )
}
