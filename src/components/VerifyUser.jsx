import React, { useEffect } from "react";
import * as faceapi from "face-api.js";

const VerifyUser = ({ imageData }) => {
  useEffect(() => {
    const verify = async () => {
      const storedDescriptor = localStorage.getItem("userFaceDescriptor");
      if (!storedDescriptor) {
        alert("No user registered.");
        return;
      }

      const img = document.createElement("img");
      img.src = imageData;
      img.onload = async () => {
        const descriptor = await getFaceDescriptor(img);
        if (descriptor) {
          const stored = JSON.parse(storedDescriptor);
          const distance = faceapi.euclideanDistance(descriptor, stored);
          if (distance < 0.6) {
            alert("User verified!");
          } else {
            alert("Face does not match.");
          }
        }
      };
    };

    verify();
  }, [imageData]);

  return null;
};

export default VerifyUser;
