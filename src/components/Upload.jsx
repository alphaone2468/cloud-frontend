import { useState } from "react";

export default function Upload() {
  const [fileImg, setFileImg] = useState('');
  const [fileVid, setFileVid] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  async function handleOnClickSubmit1(e) {
    e.preventDefault();
    console.log("I have clicked");

    const obj = {
      title,
      description,
      stringimg: fileImg,
      stringvideo: fileVid,
    };
    
    setIsLoading(true);
    let data = await fetch("https://backend-nai0.onrender.com/api/v1/upload-data", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    data = await data.json();
    console.log(data);
    setIsLoading(false);
    setIsUploaded(true);
  }

  async function callMe(e) {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64);
    setFileImg(base64);
    document.getElementById("showimage").style.display = 'block';
  }

  async function callMe1(e) {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64);
    setFileVid(base64);
  }

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  }

  return (
    <div className="upload-container">
      <div className="upload-section">
        <input
          type="text"
          placeholder="Title (max 50 characters)"
          maxLength={50}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="upload-text-input"
        />
        
        <textarea
          placeholder="Description (max 200 characters)"
          maxLength={200}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="upload-text-area"
        />
        <h2>Upload Image</h2>
        <input 
          type="file" 
          name="image" 
          id="file-upload-img" 
          accept=".jpg,.jpeg,.png" 
          onChange={callMe} 
          className="upload-input-file"
        />
        <img 
          src={fileImg} 
          alt="Preview" 
          id="showimage" 
          className={`upload-image-preview ${fileImg ? 'visible' : 'hidden'}`} 
        />
      </div>

      <form onSubmit={handleOnClickSubmit1} className="upload-section">
        <h2>Upload Video</h2>
        <input 
          type="file" 
          name="video" 
          id="file-upload-vid" 
          accept=".mp4" 
          onChange={callMe1} 
          className="upload-input-file"
        />
        {fileVid && (
          <video 
            controls 
            src={fileVid} 
            className="upload-video-preview" 
          />
        )}
        
        <button type="submit" className="upload-submit-button">Submit</button>

        {isLoading && <p id="uploadingMsg">Uploading ...</p>}
        {isUploaded && <p id="uploadingMsg">Uploaded Successfully ...</p>}
      </form>
    </div>
  );
}
