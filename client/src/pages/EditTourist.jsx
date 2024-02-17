import {useSelector} from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/account/accountSlice.js';

export default function EditTourist() {
  const fileRef = useRef(null);
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(undefined);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [filePercent, setFilePercent] = useState(0);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const currentUser = useSelector((state) => state.account);
  const currentUserData = currentUser.currentAccount

  console.log(currentUserData._id);
  const dispatch = useDispatch();

  // if there is a file call handleFileUpload function
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]); 

  const handleFileUpload = (file) => {
    const storage = getStorage(app);

    const fileName = new Date().getTime() + file.name; 
    const storageRef = ref(storage, fileName);

    // Sada kreiramo Upload Task:
    // uploadBytesResumable daje prikaz procenta upload radnje 
    const uploadTask = uploadBytesResumable(storageRef, file); 
    
    uploadTask.on('state_changed', // tracking changes
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercent(Math.round(progress)); // da bi imali lepsi prikaz procenata
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then
        ((downloadURL) => {
          setFormData({ ...formData, profileImage: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    
    setFormData({ ...formData, [e.target.id]: e.target.value });  // u zavisnosti od id inputa, praticemo promene tih polja i one ce biti belezene u formData
  // ovim samo pratimo vrednosti koje su se menjale, tako da moze da bude jedna ili sve
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  // sprecavamo submit formu ako se samo rifresuje
    try {
      dispatch(updateUserStart());
      setLoading(true);
      const res = await fetch(`/api/tourist/updateTourist/${currentUserData._id}`, // ruta za update i prosledjujemo id korisnika za proveru da li on ima pravo da menja taj profil
      {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json(); // konvertujemo podatke u json format
      if (data.success === false) {
        setError(data.message)
        return;
      }

      // ako je sve u redu
      setLoading(false);
      setUpdateSuccess(true);
      dispatch(updateUserSuccess(data));

    } catch (error) {
      dispatch(updateUserFailure(error.message));
    };
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-white font-semibold text-center my-7'>Edit Tourist</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 text-white'>
        <input onChange={(e) => setFile(e.target.files[0])} type='file' ref={fileRef} hidden/>
        <img onClick={() => fileRef.current.click()} className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' src={formData.profileImage || currentUserData.profileImage} alt="profile"/>
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image Upload (image must be less than 2 MB)
            </span> 
          ) : filePercent > 0 && filePercent < 100 ? (
              <span className='text-slate-700'>{`Uploading ${filePercent}%`}</span>
            ) : filePercent === 100 ? (
              <span className='text-green-700'>Upload Successfully!</span>
            ) : (
              ''
          )}
        </p>
        <input type='text' id='name' defaultValue={currentUserData.name} onChange={handleChange} className='border p-3 rounded-lg '/>
        <input type='text' id='lastName' defaultValue={currentUserData.lastName} onChange={handleChange} className='border p-3 rounded-lg '/>
        <input type='text' id='email' defaultValue={currentUserData.email} onChange={handleChange} placeholder='email' className='border p-3 rounded-lg '/>
        <input type='password' id='password' onChange={handleChange} placeholder='password' className='border p-3 rounded-lg '/>
        <select defaultValue={currentUserData.gender} onChange={handleChange} id='gender' className='border h-20 text-white p-3 rounded-lg' placeholder='Gender'>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
            <option value='Other'>Other</option>
        </select>
        <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
          { loading ? 'Loading...' : 'Update' }
        </button>
      </form>
      <p className='text-red-700 mt-5 text-center'>{error ? error : ''}</p>
      <p className='text-green-700 mt-5 text-center'>{updateSuccess ? 'User is updated successfully!' : ''}</p>
    </div>
  )
}