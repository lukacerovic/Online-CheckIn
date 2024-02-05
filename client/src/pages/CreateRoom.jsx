import { useState } from "react";
import Header from "../components/Header";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function CreateRoom() {
    const [files, setFiles] = useState([]);
    const currentUser = useSelector((state) => state.account);
    const currentUserData = currentUser.currentAccount;
    const [formData, setFormData] = useState({
        imageUrls: [],
        logo: currentUser.currentAccount.logo,
        name: '',
        description: '',
        address: '',
        availableRooms: '1',
        numberOfGuests: '1',
        bedrooms: '1',
        bathrooms: '1',
        price: 0,
        includes: [],
      });
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigate();

    console.log(formData);
     
    const handleImageSubmit = (e) => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 7){
            setUploading(true);
            setImageUploadError(false);
            const promises = [];

            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));   // za svaku sliku koja je prisutna pozivamo funkciju koja ce da vrsi async upload
            }
            Promise.all(promises).then((urls) => {
                setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls)});
                setImageUploadError(false);
                setUploading(false);
            }).catch((err) => {
                setImageUploadError('Image upload failed (2 mb max per image)');
                setUploading(false);
            });
        }else{
            setImageUploadError('You can only upload 6 images per listing');
            setUploading(false);
        }
      };

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);  // importujemo getStorage i app 
            const fileName = new Date().getTime() + file.name;  // kreiramo unikatno ime fajla dodavanjem datuma + naziv fajla
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    };

    const handleRemoveImage = (index) => {
        setFormData({
          ...formData,
          imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        });
    };

    const handleChange = (e) => {
        if (e.target.type === 'checkbox') {
            // Ako je događaj promene od checkboxa, ažurirajte polje includes
            const isChecked = e.target.checked;
            const checkboxValue = e.target.id;
    
            setFormData((prevFormData) => {
                // Napravite kopiju trenutnog formData-a
                const updatedFormData = { ...prevFormData };
    
                if (isChecked) {
                    // Ako je checkbox potvrđen, dodajte njegovu vrednost u includes
                    updatedFormData.includes.push(checkboxValue);
                } else {
                    // Ako je checkbox odznačen, uklonite njegovu vrednost iz includes
                    updatedFormData.includes = updatedFormData.includes.filter(
                        (item) => item !== checkboxValue
                    );
                }
    
                return updatedFormData;
            });
        } else if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea') {
            // Ako je događaj promene od inputa tipa number, text ili textarea
            setFormData({
                ...formData,
                [e.target.id]: e.target.value
            });
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(false);
            const res = await fetch('/api/rooms/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUserData._id,
                  }),
            });
            const data = await res.json();
            
            setLoading(false);
            if(data.success == false){
                setError(error.message);
            }
            navigation('/hotel-listings');
        } catch (error) {
            setError(error.message);  // kreirali smo peace of state za error iznad zato je ovde koristimo (const [error, setError] = useState(false);)
            setLoading(false);  // // kreirali smo peace of state za loading iznad zato je ovde koristimo (const [loading, setLoading] = useState(false);)
        };
    };

  return (
    <main className='p-3 max-w-4xl mx-auto text-white'>
        <Header/>
        <h1 className='text-3xl font-semibold text-center my-7'>Create a Room</h1>
        <form className='' onSubmit={handleSubmit}>
            <div className='flex sm:flex-row gap-10 mb-10'>
                <div className='flex flex-col gap-4 flex-1'>
                    <input 
                    type='text' 
                    placeholder='Name' 
                    onChange={handleChange} 
                    value={formData.name} 
                    className='border p-3 rounded-lg' 
                    id='name' 
                    maxLength='62' 
                    minLength='10' 
                    required
                    />
                    <textarea 
                    type='text' 
                    placeholder='Description' 
                    onChange={handleChange} 
                    value={formData.description} 
                    className='border p-3 rounded-lg' 
                    id='description' 
                    required
                    />
                    <input 
                    type='text' 
                    placeholder='Address' 
                    onChange={handleChange} 
                    value={formData.address} 
                    className='border p-3 rounded-lg' 
                    id='address' 
                    required
                    />
                    <p className='text-lg mt-3'>How many this type of room your hotel have?</p>
                    <input 
                        type='number' 
                        id='availableRooms' 
                        onChange={handleChange} 
                        value={formData.availableRooms} 
                        min='1' 
                        max='500' 
                        className='p-3 border w-40 border-gray-300 rounded-lg' 
                        required
                    />
                      
                    <div className='flex flex-wrap gap-10'>
                        <div className='flex items-center gap-2'>
                            <input 
                            type='number' 
                            id='numberOfGuests' 
                            onChange={handleChange} 
                            value={formData.numberOfGuests} 
                            min='1' 
                            max='10' 
                            className='p-3 border border-gray-300 rounded-lg' 
                            required
                            />
                            <p>Guests</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input 
                            type='number' 
                            id='bedrooms' 
                            onChange={handleChange} 
                            value={formData.bedrooms} 
                            min='1' 
                            max='10' 
                            className='p-3 border border-gray-300 rounded-lg' 
                            required
                            />
                            <p>Beds</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input 
                            type='number' 
                            onChange={handleChange} 
                            value={formData.bathrooms} 
                            id='bathrooms' 
                            min='1' 
                            max='10' 
                            className='p-3 border border-gray-300 rounded-lg' r
                            equired
                            />
                            <p>Baths</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input 
                            type='number' 
                            onChange={handleChange} 
                            value={formData.price} 
                            id='price' 
                            min='50' 
                            max='1000000' 
                            className='p-3 border border-gray-300 rounded-lg' 
                            required
                            />
                            <div className='flex flex-col items-center'>
                                <p>Regular price</p>
                                <span className='text-xs'>($ / night)</span>
                            </div>                       
                        </div>
                    </div>
                </div>
                <div className='flex-col flex-3 gap-1 text-lg'>
                    <div className='flex gap-2'>
                        <input 
                          type='checkbox' 
                          onChange={handleChange} 
                          checked={formData.includes.includes('wifi')} 
                          id='wifi' 
                          className='w-5'
                        />
                        <span>Wifi</span>
                    </div>
                    <div className='flex gap-2'>
                        <input 
                          type='checkbox' 
                          onChange={handleChange} 
                          checked={formData.includes.includes('parking')} 
                          id='parking' 
                          className='w-5'
                        />
                        <span>Parking</span>
                    </div>
                    <div className='flex gap-2'>
                        <input 
                          type='checkbox' 
                          onChange={handleChange} 
                          checked={formData.includes.includes('spa')}  
                          id='spa' 
                          className='w-5'
                        />
                        <span>Spa</span>
                    </div>
                    <div className='flex gap-2'>
                        <input 
                          type='checkbox' 
                          onChange={handleChange} 
                          checked={formData.includes.includes('fitness')} 
                          id='fitness' 
                          className='w-5'
                        />
                        <span>Fitness center</span>
                    </div>
                    <div className='flex gap-2'>
                        <input 
                          type='checkbox' 
                          onChange={handleChange} 
                          checked={formData.includes.includes('bar')}  
                          id='bar' 
                          className='w-5'
                        />
                        <span>Bar</span>
                    </div>
                    <div className='flex gap-2'>
                        <input 
                          type='checkbox' 
                          onChange={handleChange} 
                          checked={formData.includes.includes('airCondition')} 
                          id='airCondition' 
                          className='w-5'
                        />
                        <span>Air Condition</span>
                    </div>
                    <div className='flex gap-2'>
                        <input 
                          type='checkbox' 
                          onChange={handleChange} 
                          checked={formData.includes.includes('roomService')}  
                          id='roomService' 
                          className='w-5'
                        />
                        <span>Room Service</span>
                    </div>
                    <div className='flex gap-2'>
                        <input 
                          type='checkbox' 
                          onChange={handleChange} 
                          checked={formData.includes.includes('terrace')}  
                          id='terrace' 
                          className='w-5'
                        />
                        <span>Terrace</span>
                    </div>
                    <div className='flex gap-2'>
                        <input 
                          type='checkbox' 
                          onChange={handleChange} 
                          checked={formData.includes.includes('disabledGuest')} 
                          id='disabledGuest' 
                          className='w-5'
                        />
                        <span>Facilities for disabled guests</span>
                    </div>
                </div>
            </div>
            
            <div className='flex flex-col gap-4'>
                <p className='font-semibold'>
                    Images:
                    <span className='font-normal items-center text-gray-500 ml-2'>The first image will be cover (max 6)</span>
                </p>
                <div className='flex gap-4'>
                    <input type='file' onChange={(e) => setFiles(e.target.files)} id='images' accept='image/*' multiple className='p-3 border border-gray-300 rounded w-full'/>
                    <button type='button' disabled={uploading} onClick={handleImageSubmit} className='p-3 bg-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>
                        {uploading ? 'Uploading...' : 'Upload'}
                    </button>
                </div>
                <p className='text-red-700 text-sm'>{imageUploadError && imageUploadError}</p>
                {
                    formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                        <div key={url} className='flex justify-between p-3 border items-center'>
                            <img src={url} alt='listing image' className='w-20 h-20 object-contain rounded-lg' />
                            <button type='button' onClick={() => handleRemoveImage(index)} className='p-2 text-red-700 rounded-lg uppercase hover:opacity-75'>Delete</button>
                        </div>
                        
                    ))
                }
                <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Creating...' : 'Create Room'}</button>
                {error && <p className='text-red-700 text-sm'>{error}</p>}
            </div>
        </form>
    </main>
  )
}

