import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import '../App.css'; // Uvoz CSS fajla ovde
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPassport } from "react-icons/fa";

export default function BookRoom() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [textResult, setTextResult] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0); // Stanje za praćenje napretka obrade slike
  const [type, setType] = useState("");
  const [code, setCode] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [surname, setSurname] = useState("");
  const [givenName, setGivenName] = useState("");
  const [nationality, setNationality] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [personalNo, setPersonalNo] = useState("");
  const [sex, setSex] = useState("");
  const [placeOfBirth, setPlaceOfBirt] = useState("");
  const [expireDate, setExpireDate] = useState("");

  const currentUser = useSelector((state) => state.account);
  const currentUserData = currentUser.currentAccount;

  const roomId = useParams(); // Dohvatamo roomId iz URL-a

  const navigation = useNavigate();
  const [formData, setFormData] = useState({});


  const handleImageUpload = async (e) => {
    if (selectedImage){
      setSelectedImage(null);
    }
    const file = e.target.files[0];
    setSelectedImage(file);
    if (!file) return;

    try {
      setScanning(true);
      const imageData = await readFileAsync(file);
      await recognizeText(imageData);
    } catch (error) {
      setErrorMessage("Error processing the image. Please try again.");
    } finally {
      setScanning(false);
    }
  };

  const readFileAsync = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const recognizeText = async (imageData) => {
    const totalProgressSteps = 100; // Ukupan broj koraka za postizanje 100%
    let currentProgress = 0;
  
    // Postavite loger da prati napredak
    const progressLogger = ({ progress }) => {
      currentProgress = progress * totalProgressSteps;
      setProgress(currentProgress);
    };
  
    try {
      // Pokrenite prepoznavanje teksta sa podešenim loggerom
      const { data: { text } } = await Tesseract.recognize(imageData, 'eng+srp+srp_latn', {
        logger: progressLogger,
      }, {rotateAuto: true});
  
      // Razdvojite tekst na linije i uzimanje samo rezultata velikih slova i brojeva
      const lines = text.split('\n');
      const filteredLines = lines.filter(line => /[A-Z]{2,}|(\d{2}\.\d{2}\.\d{4})|\d+/.test(line));
      
      // Prikupljamo informacije od poslednje dve linije jer su nam one dovoljne za sve:
      const lastTwoLines = filteredLines.slice(-2);
      const firstLine = lastTwoLines[0];
      let firstInfo = [];
      let currentElement = '';
      let previousChar = '';
      
      for (let char of firstLine) {
          if (char === '<' && previousChar === '<') {
              // Ako prethodni i trenutni karakter su '<', spoji trenutni element sa prethodnim
              firstInfo[firstInfo.length - 1] += currentElement; // Spajamo
              currentElement = ''; // Resetuj trenutni element
          } else if (char === '<') {
              // Ako je samo trenutni karakter '<', dodaj prethodni element u listu
              firstInfo.push(currentElement);
              currentElement = ''; // Resetuj trenutni element
          } else {
              // Ako trenutni karakter nije '<', dodaj ga u trenutni element
              currentElement += char;
          }
          previousChar = char; // Zapamti trenutni karakter kao prethodni za sledeću iteraciju
      }
      firstInfo.push(currentElement);
      firstInfo = firstInfo.filter(element => element !== '');
      
      // dodeljivanje imena, prezimena, tipa, drzavljanstva:
      const surname = firstInfo[1].slice(3);
      const givenName = firstInfo[2] + ' ' + firstInfo[3];
      const code = firstInfo[1].slice(0, 3);
      const type = firstInfo[0];

      // razdvajamo vrednosti za 2. recenicu:
      const secondLine = lastTwoLines[1]; 
      const passportNumber = secondLine.slice(0, 9);

      const dateOfBirthSlice = secondLine.slice(13, 19); // Dobijanje dela stringa koji predstavlja datum rođenja
      // Reorganizacija delova datuma
      const lastTwoDigitsBirth = dateOfBirthSlice.slice(4, 6);
      const middleTwoDigitsBirth = dateOfBirthSlice.slice(2, 4);
      const firstTwoDigitsBirth = dateOfBirthSlice.slice(0, 2);
      // Spajanje delova u željeni format
      const dateOfBirth = `${lastTwoDigitsBirth}.${middleTwoDigitsBirth}.${firstTwoDigitsBirth}.`;

      const sex = secondLine.slice(20, 21);

      const expireDateSlice = secondLine.slice(21, 27);
      const lastTwoDigitsExpire = expireDateSlice.slice(4, 6);
      const middleTwoDigitsExpire = expireDateSlice.slice(2, 4);
      const firstTwoDigitsExpire = expireDateSlice.slice(0, 2);
      const expireDate = `${firstTwoDigitsExpire}.${middleTwoDigitsExpire}.${firstTwoDigitsExpire}.`;


      // personal no:
      const personalNoStartIndex = 28;
      const lessThanIndex = secondLine.indexOf('<', personalNoStartIndex); // Pronalazi indeks prvog '<' nakon personalNoStartIndex
      const personalNo = secondLine.slice(personalNoStartIndex, lessThanIndex);

      setType(type);
      setCode(code);
      setPassportNumber(passportNumber);
      setSurname(surname);
      setGivenName(givenName);
      setNationality(code);
      setDateOfBirth(dateOfBirth);
      setPersonalNo(personalNo);
      setSex(sex);
      setExpireDate(expireDate);
      setFormData({
        roomId: roomId.id.toString(),
        touristId: currentUserData._id,
        touristEmail: currentUserData.email,
        touristName: surname,
        touristLastName: givenName,
        touristSex: sex,
        touristPassportNo: passportNumber,
        touristPassportCode: code,
        touristPassportType: type,
        touristDateOfBirth: dateOfBirth,
        touristPersonalNo: personalNo,
        touristNationality: code,
        passportDateOfExpire: expireDate,
      });
      setTextResult(filteredLines);
      
    } catch (error) {
      console.error(error); 
      setErrorMessage("Error processing the image. Please try again.");
    } finally {
      setScanning(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value }); 
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
        const res = await fetch('/api/booking/createBooking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...formData,
                // userRef: currentUserData._id,
              }),
        });
        const data = await res.json();
        

        if(data.success == false){
            console.log("Successfully created");
        }
        navigation('/hotel-listings');
    } catch (error) {
      console.log("Error whie submiting: ", error);
    };
  };

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col items-center mt-10'>
      {!selectedImage && (
        <div className='text-white mb-20'>
          <h1 className='text-white sm:text-xl md:text-3xl lg:text-5xl xl:text-6xl text-center py-10'>
            Passport Upload and Online Check-In
          </h1>
          <div className='flex pt-20 justify-between items-start' style={{width:'90vw', gap:'5vw'}}>
            <div className='flex items-center gap-5'>
              <div>
                <h1 className='text-cyan-500 text-6xl'>1</h1>
              </div>
              <div>
                <h1 className='text-cyan-500 sm:text-md md:text-xl lg:text-2xl xl:text-3xl uppercase pb-5'>upload a clear image of your passport</h1>
                <p className='text-md lg:text-lg xl:text-xl'>Once uploaded, your passport will be scanned, and the necessary fields for online check-in will be populated automatically. You will then have the opportunity to review all entered information before submission.</p>
              </div>
            </div>
            <div className='flex items-center gap-5'>
              <div>
                <h1 className='text-cyan-500 text-6xl'>2</h1>
              </div>
              <div>
                <h1 className='text-cyan-500 sm:text-md md:text-xl lg:text-2xl xl:text-3xl uppercase pb-5'>online check-in form</h1>
                <p className='text-md lg:text-lg xl:text-xl'>
                  The scanned passport will be used to pre-fill the required details for your online check-in, including personal information and travel documents. Please ensure that the information extracted from the passport is accurate and matches your travel documents.
                </p>  
              </div>              
            </div>
            <div className='flex items-center gap-5'>
              <div>
                <h1 className='text-cyan-500 text-6xl'>3</h1>
              </div>
              <div>
                <h1 className='text-cyan-500 sm:text-md md:text-xl lg:text-2xl xl:text-3xl uppercase pb-5'>finalize your check-in request</h1>
                <p className='text-md lg:text-lg xl:text-xl'>
                  After reviewing the populated fields, if all the provided information is correct, you can proceed to submit the form to finalize your online check-in request. Upon successful submission, your online check-in process will be completed, and you will be ready for your upcoming travel.
                </p>
              </div>              
            </div>
          </div>
        </div>
      )}

        <label htmlFor="passportUpload" className="flex gap-3 text-3xl text-white items-center bg-cyan-500 p-3 my-20 rounded-lg cursor-pointer">
          Upload Your Passport Photo <FaPassport className='bg-transparent' size={'2vw'}/>
          <input type="file" id="passportUpload" accept="image/*" className="mt-20 bg-green-500 opacity-0 absolute" onChange={handleImageUpload} />
        </label>
        {selectedImage && (
          <div className='flex flex-col self-center'>
            <h2 className='text-white text-4xl mt-5'>Passport Image:</h2>
            <div style={{ position: 'relative', maxWidth: '100%', borderRadius:'2%' }}>
              <img src={URL.createObjectURL(selectedImage)} alt="Pasoš" style={{ maxWidth: '100%', height:'60vh' }} />
              {scanning && (
                <div
                  style={{ height: '100%', }} 
                >
                  <p className="scan-line"></p>
                </div>
              )}
            </div>
            {!textResult && (
              <div className='mt-10'>
                <h1 className='text-white text-4xl text-center'>Scanning the passport</h1>
                <h1 className='text-white text-4xl text-center'>Please be patient, this may take a while...</h1>
                {progress > 0 && progress < 100 && (
                  <h2 className='text-white text-2xl text-center'>{progress.toFixed(2)}%</h2>
                )}
              </div>
            )}
          </div>
        )}

        {textResult && (
          <div className='mt-10 flex w-full flex-col'>
            <h2 className='text-white text-center text-4xl mb-5'>Check Filled Form:</h2>
       
                <h1 className='text-white text-center text-4xl mb-5'>Form to Submit</h1>
                <form className='flex self-center flex-col gap-4 mt-20' onSubmit={handleSubmitForm}>
                    <div className='flex flex-row gap-10'>
                      <div className='flex flex-col'>
                        <label className='text-white text-lg mt-3'>Country Code</label>
                        <input type='text' placeholder='Country Code' className='border p-3 rounded-lg text-white' value={formData.touristPassportCode} onChange={handleChange} id='touristPassportCode'/>
                      </div>  
                      <div className='flex flex-col'>
                        <label className='text-white text-lg mt-3'>Type</label>
                        <input type='text' placeholder='Type' className='border p-3 rounded-lg text-white' value={formData.touristPassportType} onChange={handleChange} id='touristPassportType'/>
                      </div>  
                      <div className='flex flex-col'> 
                        <label className='text-white text-lg mt-3'>Passport Number</label>
                        <input type='text' placeholder='Passport Number' className='border p-3 rounded-lg text-white' value={formData.touristPassportNo} onChange={handleChange} id='touristPassportNo'/>
                      </div> 
                      <div className='flex flex-col'> 
                        <label className='text-white text-lg mt-3'>Passport Number</label>
                        <input type='text' placeholder='Passport Number' className='border p-3 rounded-lg text-white' value={formData.touristPassportNo} onChange={handleChange} id='touristPassportNo'/>
                      </div> 
                    </div>
                    <div className='flex gap-10'>
                      <div className='flex flex-col'>
                        <label className='text-white text-lg mt-3'>First Name</label>
                        <input type='text' placeholder='First Name' className='border p-3 rounded-lg text-white' value={formData.touristName} onChange={handleChange} id='touristName'/> 
                      </div>
                      <div className='flex flex-col'>
                        <label className='text-white text-lg mt-3'>Last Name</label>
                        <input type='text' placeholder='Last Name' className='border p-3 rounded-lg text-white' value={formData.touristLastName} onChange={handleChange} id='touristLastName'/>
                      </div> 
                      <div className='flex flex-col'>
                        <label className='text-white text-lg mt-3'>Sex</label>
                        <input type='text' placeholder='Sex' className='border p-3 rounded-lg text-white' value={formData.touristSex} onChange={handleChange} id='touristSex'/> 
                      </div> 
                      <div className='flex flex-col'>
                        <label className='text-white text-lg mt-3'>Date of Birthday</label>
                        <input type='text' placeholder='Date of Birthday' className='border p-3 rounded-lg text-white' value={formData.touristDateOfBirth} onChange={handleChange} id='touristDateOfBirth'/>
                      </div> 
                    </div>
                    <label className='text-white text-lg mt-3'>Nationality</label>
                    <input type='text' placeholder='Nationality' className='border p-3 rounded-lg text-white' value={formData.touristNationality} onChange={handleChange} id='touristNationality'/> 
                    <label className='text-white text-lg mt-3'>Personal No.</label>
                    <input type='text' placeholder='Personal No.' className='border p-3 rounded-lg text-white' value={formData.touristPersonalNo} onChange={handleChange} id='touristPersonalNo'/>
                    <label className='text-white text-lg mt-3'>Date Of Expiry</label>
                    <input type='text' placeholder='Date Of Expiry' className='border p-3 rounded-lg text-white' value={formData.passportDateOfExpire} onChange={handleChange} id='passportDateOfExpire'/> 
                    <button className='bg-green-500 text-white px-5 py-3 text-3xl rounded-lg self-center mt-10 mb-10'>Submit a form</button>
                </form>
          </div>
          
        )}
        {errorMessage && (
          <div className="text-red-500 mt-2">{errorMessage}</div>
        )}
      </div>
      
    </div>
  );
}



