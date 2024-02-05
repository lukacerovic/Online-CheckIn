import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import '../App.css'; // Uvoz CSS fajla ovde

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
  const [dateOfIssue, setDateOfIssue] = useState("");
  const [authority, setAuthority] = useState("");
  const [expireDate, setExpireDate] = useState("");


  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    if (!file) return;

    try {
      setScanning(true);
      const imageData = await readFileAsync(file);
      await recognizeText(imageData);
    } catch (error) {
      setErrorMessage("Error processing the image. Please try again.");
      console.error(error);
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
      });
  
      // Razdvojite tekst na linije
      const lines = text.split('\n');
      const filteredLines = lines.filter(line => /[A-Z]{2,}/.test(line));
      const filteredText = filteredLines.join('\n');
      
      const passportInfo = filteredLines.findIndex(line => line.startsWith("Passeport"));
      if (passportInfo !== -1) {
        const passportElements = filteredLines[passportInfo].split(" ");
  
        const type = passportElements[1];
        const code = passportElements[2];
        const passportNumber = passportElements[3];

        const surname = filteredLines[passportInfo + 1].trim();
        const givenName = filteredLines[passportInfo + 2].trim();
        const nationality = filteredLines[passportInfo + 3].trim();

        // Uzimamo celu liniju za Birth i Personal No
        const birthAndPersonalNo = filteredLines[passportInfo + 4].trim(); 
        const partFirst = birthAndPersonalNo.split(' ');
        const dateOfBirth = partFirst.slice(0, 3).join(' ');
        const personalNo = partFirst.slice(3).join(' ');

        // Uzimamo celu liniju za Sex i Place Of Birth
        const sexAndPlace = filteredLines[passportInfo + 5].trim();
        const partsSecond = sexAndPlace.split(' ');
        const sex = partsSecond.slice(0,1);
        const placeOfBirth = partsSecond.slice(1);

        // Uzimamo celu liniju za Issue i Authority
        const issueAndAuthority = filteredLines[passportInfo + 6].trim(); 
        const parts = issueAndAuthority.split(' ');
        const dateOfIssue = parts.slice(1, 4).join(' ');
        const authority = parts.slice(4).join(' ');

        // Uzimamo celu liniju za Expire i Potpis
        const expirePart = filteredLines[passportInfo + 4].trim(); 
        const partThird = birthAndPersonalNo.split(' ');
        const expireDate = partThird.slice(0, 3).join(' ');

        setType(type);
        setCode(code);
        setPassportNumber(passportNumber);
        setSurname(surname);
        setGivenName(givenName);
        setNationality(nationality);
        setDateOfBirth(dateOfBirth);
        setPersonalNo(personalNo);
        setSex(sex);
        setPlaceOfBirt(placeOfBirth);
        setDateOfIssue(dateOfIssue);
        setAuthority(authority);
        setExpireDate(expireDate);
      }

      setTextResult(filteredText);
    } catch (error) {
      setErrorMessage("Error processing the image. Please try again.");
      console.error(error);
    } finally {
      // Postavite skeniranje na false kada završite proces prepoznavanja teksta
      setScanning(false);
    }
  };
  

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col items-center mt-10'>
        <input type="file" accept="image/*" onChange={handleImageUpload}/>

        {selectedImage && (
          <div className='flex flex-col self-center'>
            <h2 className='text-white text-lg mt-5'>Passport Image:</h2>
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
          <div className='mt-10'>
            <h2 className='text-white text-4xl mb-5'>Text Results:</h2>
            {textResult.split('\n').map((line, index) => (
              <p key={index} className='text-white'>{line}</p>
            ))}
            
            <div className='flex flex-col gap-4 mt-20'>
                <h1 className='text-white text-4xl mb-5'>Form to Submit</h1>
                <label className='text-white text-lg mt-3'>Country Code</label>
                <input type='text' placeholder='Country Code' className='border p-3 rounded-lg text-white' value={code} readOnly/>
                <label className='text-white text-lg mt-3'>Type</label>
                <input type='text' placeholder='Type' className='border p-3 rounded-lg text-white' value={type} readOnly/>
                <label className='text-white text-lg mt-3'>Passport Number</label>
                <input type='text' placeholder='Passport Number' className='border p-3 rounded-lg text-white' value={passportNumber} readOnly/>
                <label className='text-white text-lg mt-3'>First Name</label>
                <input type='text' placeholder='First Name' className='border p-3 rounded-lg text-white' value={surname} readOnly/> 
                <label className='text-white text-lg mt-3'>Last Name</label>
                <input type='text' placeholder='Last Name' className='border p-3 rounded-lg text-white' value={givenName} readOnly/>
                <label className='text-white text-lg mt-3'>Nationality</label>
                <input type='text' placeholder='Nationality' className='border p-3 rounded-lg text-white' value={nationality} readOnly/> 
                <label className='text-white text-lg mt-3'>Personal No.</label>
                <input type='text' placeholder='Personal No.' className='border p-3 rounded-lg text-white' value={personalNo} readOnly/>
                <label className='text-white text-lg mt-3'>Date of Birthday</label>
                <input type='text' placeholder='Date of Birthday' className='border p-3 rounded-lg text-white' value={dateOfBirth} readOnly/>
                <label className='text-white text-lg mt-3'>Place Of Birth</label>
                <input type='text' placeholder='Place Of Birth' className='border p-3 rounded-lg text-white' value={placeOfBirth} readOnly/> 
                <label className='text-white text-lg mt-3'>Sex</label>
                <input type='text' placeholder='Sex' className='border p-3 rounded-lg text-white' value={sex} readOnly/> 
                <label className='text-white text-lg mt-3'>Date Of Issue</label>
                <input type='text' placeholder='Date Of Issue' className='border p-3 rounded-lg text-white' value={dateOfIssue} readOnly/>
                <label className='text-white text-lg mt-3'>Date Of Expiry</label>
                <input type='text' placeholder='Date Of Expiry' className='border p-3 rounded-lg text-white' value={expireDate} readOnly/> 
                <label className='text-white text-lg mt-3'>Authority</label>
                <input type='text' placeholder='Authority' className='border p-3 rounded-lg text-white' value={authority} readOnly/>
                
            </div>
          </div>
          
        )}

        {errorMessage && (
          <div className="text-red-500 mt-2">{errorMessage}</div>
        )}
      </div>
      
    </div>
  );
}



