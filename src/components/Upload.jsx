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
    <div style={styles.container}>
      <div style={styles.uploadSection}>
      <input
          type="text"
          placeholder="Title (max 50 characters)"
          maxLength={50}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.textInput}
        />
        
        <textarea
          placeholder="Description (max 200 characters)"
          maxLength={200}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textArea}
        />
        <h2>Upload Image</h2>
        <input 
          type="file" 
          name="image" 
          id="file-upload-img" 
          accept=".jpg,.jpeg,.png" 
          onChange={callMe} 
          style={styles.inputFile}
        />
        <img 
          src={fileImg} 
          alt="Preview" 
          id="showimage" 
          style={{ ...styles.imagePreview, display: fileImg ? 'block' : 'none' }} 
        />
      </div>

      <form onSubmit={handleOnClickSubmit1} style={styles.uploadSection}>
        <h2>Upload Video</h2>
        <input 
          type="file" 
          name="video" 
          id="file-upload-vid" 
          accept=".mp4" 
          onChange={callMe1} 
          style={styles.inputFile}
        />
        {fileVid && (
          <video 
            controls 
            src={fileVid} 
            style={styles.videoPreview} 
          />
        )}
        
        

        <button type="submit" style={styles.submitButton}>Submit</button>

        {isLoading && <p id="uploadingMsg">Uploading ...</p>}
        {isUploaded && <p id="uploadingMsg">Uploaded Successfully ...</p>}
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f7f7f7',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    margin: '0 auto',
  },
  uploadSection: {
    width: '100%',
    marginBottom: '20px',
    textAlign: 'center',
  },
  inputFile: {
    marginTop: '10px',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
    cursor: 'pointer',
  },
  imagePreview: {
    marginTop: '20px',
    maxWidth: '100%',
    borderRadius: '8px',
  },
  videoPreview: {
    marginTop: '20px',
    maxWidth: '100%',
    borderRadius: '8px',
  },
  textInput: {
    marginTop: '20px',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
    fontSize: '16px',
  },
  textArea: {
    marginTop: '20px',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
    height: '100px',
    fontSize: '16px',
    resize: 'none',
  },
  submitButton: {
    marginTop: '20px',
    padding: '10px 50px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#28a745',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    backgroundColor:"#264653"
  }
};
