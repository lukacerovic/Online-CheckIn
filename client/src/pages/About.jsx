import { Link } from 'react-router-dom'

export default function WorkDetails() {
  return (
    <div className='h-full flex flex-col gap-10'>
        <Link to='/hotel-listings' className='self-center'>
            <img src="/images/logo2.png" alt='logo' className='bg-transparent' style={{width:'20vw'}} />
        </Link>
        <div className='text-white self-center flex flex-col' style={{fontSize:'1.5vw', marginTop:'-2vw', width:'80%'}}>
            <span className='text-center' style={{paddingBottom:'2vw'}}>
            Our application revolutionizes the hotel booking experience by streamlining the check-in process through cutting-edge technology. With our innovative online check-in system, users can breeze through registration effortlessly. Gone are the days of tedious form-filling; our platform simplifies the process by allowing users to upload a photo of their passport.
            </span>
            <span className='text-center' style={{paddingBottom:'2vw'}}>
                Once uploaded, our system works its magic, <span className='text-pink-500 uppercase'>automatically scanning the passport and extracting all necessary details</span>. From personal information to travel document specifics, the system populates the online registration form seamlessly. Users can rest assured that their data is accurately captured, eliminating the risk of manual errors.
            </span>
            <span className='text-center' style={{paddingBottom:'2vw'}}>
                But that's not all. Upon confirmation of their booking, users receive a unique <span className='text-pink-500 uppercase'>QR code via email</span>. This QR code isn't just any code; it's the key to their booked room. With a simple scan, users gain access to their accommodations, ushering in a new era of convenience and security in the hospitality industry.
            </span>
        </div>
        <h1 className='text-center text-white' style={{fontSize:'3vw', paddingTop:'1vw'}}>Instructions:</h1>
        <div className='text-white flex self-center' style={{width:'95vw',marginTop:'5vw', marginBottom:'8vw'}}>
            <div className='flex flex-col gap-10' style={{ width:'100%', paddingInline:'3vw',gap:'1vw', borderRightWidth:'2px'}}>
                <h1 className='self-center sm:text-1xl md:text-3xl lg:text-5xl xl:text-7xl' style={{paddingBottom:'5vw'}}>Hotel Account</h1>
                <div className='flex flex-col' style={{gap:'7vw'}}>
                    <div>
                        <div className='flex items-center gap-10'>
                            <h1 style={{fontSize:'13vw'}}className='sm:text-3xl md:text-5xl lg:text-7xl xl:text-9xl text-pink-500'>1</h1>
                            <div>
                                <h1 style={{fontSize:'2.7vw', borderBottomWidth:'2px',paddingBottom:'5px', borderColor:'#f56991'}}>Create Hotel Account</h1>
                                <p className='pt-3' style={{fontSize:'1.2vw'}}>Hotel registration is a straightforward process. Simply sign up, provide your hotel details, verify your account, set up payment options, and publish your listing. Get ready to welcome guests and offer them a memorable stay!</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center gap-8'>
                            <h1 style={{fontSize:'13vw'}}className='text-9xl text-pink-500'>2</h1>
                            <div>
                                <h1 style={{fontSize:'2.7vw', borderBottomWidth:'2px',paddingBottom:'5px', borderColor:'#f56991'}}>Edit Hotel Profile</h1>
                                <p className='pt-3' style={{fontSize:'1.2vw'}}>Editing your hotel profile is simple and convenient. Log in to your account, navigate to the profile section, make the desired changes to your hotel details, amenities, and pricing, and save your updates. Ensure that your profile reflects the latest information about your property to attract guests and provide them with an exceptional experience.</p>
                            </div>
                            
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center gap-8'>
                            <h1 style={{fontSize:'13vw'}}className='text-9xl text-pink-500'>3</h1>
                            <div>
                                <h1 style={{fontSize:'2.7vw', borderBottomWidth:'2px',paddingBottom:'5px', borderColor:'#f56991'}}>Create Hotel Booking Post</h1>
                                <p className='pt-3' style={{fontSize:'1.2vw'}}>Hotels can easily create listings for the rooms they offer for booking. By clicking on the "Create Listing" button on their profile, hotels can fill out a form to create their room listings. After successful creation, these listings, along with all other posts created by the hotel, will be displayed on the homepage of the website. Here, all hotel listings will be listed, allowing tourists to gather information about the rooms and listings and book directly through the listing.</p>
                            </div>
                            
                        </div>                     
                    </div>
                    <div>
                        <div className='flex items-center gap-8'>
                            <h1 style={{fontSize:'13vw'}}className='text-9xl text-pink-500'>4</h1>
                            <div>
                                <h1 style={{fontSize:'2.7vw', borderBottomWidth:'2px',paddingBottom:'5px', borderColor:'#f56991'}}>Hotel Booking Management</h1>
                                <p className='pt-3' style={{fontSize:'1.2vw'}}>Hotels streamline the booking process by enabling tourists to book rooms listed in their advertisements. Upon a tourist's decision to book a room, they fill out an online check-in form with passport information and submit the booking request. Hotels can manage their bookings by clicking on the "View Bookings" button, which displays a table of all tourist booking requests for specific rooms. This table provides detailed information from the passports of tourists who have sent requests. By clicking the "Assign Room" button, hotels assign rooms to tourists, confirming their booking. Subsequently, tourists receive an email confirmation of their successful booking along with a QR code, serving as their room key for accessing the assigned room.</p>
                            </div>
                            
                        </div>
                    </div>
                </div>
                
            </div>
            <div className='flex flex-col' style={{ width:'100%', paddingInline:'3vw'}}>
                <h1 className='self-center sm:text-1xl md:text-3xl lg:text-5xl xl:text-7xl' style={{paddingBottom:'5vw'}}>Tourist Account</h1>
                <div className='flex flex-col' style={{gap:'6vw'}}>
                    <div>
                        <div className='flex items-center gap-10'>
                            <h1 style={{fontSize:'13vw'}}className='sm:text-3xl md:text-5xl lg:text-7xl xl:text-9xl text-pink-500'>1</h1>
                            <div>
                                <h1 style={{fontSize:'2.7vw', borderBottomWidth:'2px',paddingBottom:'5px', borderColor:'#f56991'}}>Create Tourist Account</h1>
                                <p className='pt-3' style={{fontSize:'1.2vw'}}>Tourist registration is quick and easy. Sign up, fill in your details, verify your email, explore listings, book your stay, and get ready for an exciting adventure!</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center gap-8'>
                            <h1 style={{fontSize:'13vw'}}className='text-9xl text-pink-500'>2</h1>
                            <div>
                                <h1 style={{fontSize:'2.7vw', borderBottomWidth:'2px',paddingBottom:'5px', borderColor:'#f56991'}}>Edit Tourist Profile</h1>
                                <p className='pt-3' style={{fontSize:'1.2vw'}}>Updating your tourist profile is a breeze. Sign in to your account, access the profile settings, modify your personal information, preferences, and travel interests, and save the changes. Keeping your profile up-to-date ensures a seamless booking experience and allows you to tailor your travel preferences for your next adventure.</p>
                            </div>
                            
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center gap-8'>
                            <h1 style={{fontSize:'13vw'}}className='text-9xl text-pink-500'>3</h1>
                            <div>
                                <h1 style={{fontSize:'2.7vw', borderBottomWidth:'2px',paddingBottom:'5px', borderColor:'#f56991'}}>Exploring Booking Posts</h1>
                                <p className='pt-3' style={{fontSize:'1.2vw'}}>Tourists can explore all hotel listings available by visiting the homepage. Here, they will find listings created by hotels offering room accommodations. Tourists can view details about each listing and find the room that suits their preferences. Once they find a suitable listing, they can proceed to book by clicking on the booking button provided within the listing. This streamlined process allows tourists to easily book their desired accommodation with just a few clicks.</p>
                            </div>
                            
                        </div>                     
                    </div>
                    <div>
                        <div className='flex items-center gap-8'>
                            <h1 style={{fontSize:'13vw'}}className='text-9xl text-pink-500'>4</h1>
                            <div>
                                <h1 style={{fontSize:'2.7vw', borderBottomWidth:'2px',paddingBottom:'5px', borderColor:'#f56991'}}>Tourist Booking Process</h1>
                                <p className='pt-3' style={{fontSize:'1.2vw'}}>When tourists find a room listing they wish to book, they click on the "Book Now" button to initiate the process. They are prompted to complete an online check-in form by uploading a picture of their passport. The passport is automatically scanned to fill out the form. Tourists verify the form's information for accuracy and can make necessary corrections before submitting. Upon submission, the hotel receives the information. After approval, tourists receive an email confirmation and a QR code, serving as their room key. The QR code provides access to the booked room. Tourists can also view their booking history on their profile, where they can see details of past booking requests, including dates, names, and booking statuses. Until the hotel confirms the booking, the status remains "Waiting to Confirm." Once confirmed, the status changes to "Booking is Confirmed," along with access to the QR code received via email for accessing the room.</p>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        <div className='text-white self-center flex flex-col' style={{fontSize:'2.5vw', width:'80%'}}>
            <span className='text-center' style={{paddingBottom:'3vw'}}>
                In essence, our application redefines the hotel booking process, prioritizing efficiency, accuracy, and user convenience. Say goodbye to lengthy check-in queues and paperwork hassles.With our platform, checking in is as simple as a snapshot and a scan. Welcome to the future of hotel booking.
            </span>
        </div>
    </div>
  )
}
