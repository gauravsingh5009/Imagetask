import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Cropper } from "react-cropper"; 
import "cropperjs/dist/cropper.css"; 
import "./caption.css";

const Caption = () => {
    const param = useParams();
    const cropperRef = useRef(null); 
    const [capt, setCapt] = useState(null); 
    const [caption, setCaption] = useState(""); 
    const [croppedImage, setCroppedImage] = useState(null); 
    const key = "cRQ_1IS22LHB1uFIxK1DshXQOmOJJROBmeUdSVekkIg";

    useEffect(() => {
        axios
            .get(`https://api.unsplash.com/photos/${param.id}?client_id=${key}`)
            .then((response) => {
                setCapt(response.data); 
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [param.id]);

    // Function to crop the image and add the caption
    const handleCrop = () => {
        const cropper = cropperRef.current.cropper;
        const croppedCanvas = cropper.getCroppedCanvas();

        // Get the cropped image as a data URL
        const croppedDataUrl = croppedCanvas.toDataURL();

        // Draw the cropped image onto a canvas to add the caption
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        // Set canvas size to match the cropped image
        canvas.width = croppedCanvas.width;
        canvas.height = croppedCanvas.height;

        // Draw the cropped image on the canvas
        const img = new Image();
        img.src = croppedDataUrl;
        img.onload = () => {
            context.drawImage(img, 0, 0);

            // Add the caption to the canvas
            context.font = "30px Arial";
            context.fillStyle = "black";
            context.fillText(caption, 50, canvas.height - 50);

            // Get the final image with the caption as a data URL
            const finalDataUrl = canvas.toDataURL();
            setCroppedImage(finalDataUrl); // Store the final image data URL
        };
    };

    // Function to handle downloading the edited image
    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = croppedImage;
        link.download = "cropped-image-with-caption.png";
        link.click();
    };

    if (!capt) return <p>Loading image...</p>;
    return (
        <div className="container">
          <h2>Crop Image and Add Caption</h2>
          <div className="wrap1">
            <div className="imagediv">
              <Cropper
                src={capt.urls.full}
                style={{ height: 400, width: "100%" }}
                initialAspectRatio={1}
                guides={false}
                ref={cropperRef}
                viewMode={1}
              />
            </div>
      
            <div className="inputdiv">
              <div className="reading">
                <label className="cap" htmlFor="caption">Add Caption</label>
                <textarea
                  name="caption"
                  rows="2"
                  cols="50"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                ></textarea>
              </div>
      
              <input className="download" type="button" value="Crop & Add Caption" onClick={handleCrop} />
      
              {croppedImage && (
                <>
                  {/* <img src={croppedImage} alt="Cropped with Caption" /> */}
                  <input className="download" type="button" value="Download Image" onClick={handleDownload} />
                </>
              )}
            </div>
          </div>
        </div>
      );
      
};

export default Caption;
