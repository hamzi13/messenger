import axios from "axios";
import React, { useEffect } from "react";
import useConversation from "@/app/hooks/useConversation";
import { HiPhoto } from "react-icons/hi2";

const CloudinaryUpload = () => {
  const { conversationId } = useConversation();
  useEffect(() => {
    const loadCloudinaryScript = () => {
      const script = document.createElement("script");
      script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
      script.async = true;
      script.onload = () => {
        console.log("Cloudinary widget script loaded");
      };
      document.body.appendChild(script);
    };

    if (!window.cloudinary) {
      loadCloudinaryScript();
    }
  }, []);

  //   const handleUpload = (result: any) => {
  //     console.log(result);
  //     axios.post("/api/messages", {
  //       image: result?.info?.secure_url,
  //       conversationId
  //     });
  //   };

  const handleUploadClick = () => {
    if (window.cloudinary) {
      window.cloudinary.openUploadWidget(
        {
          cloudName: "dqb5xgg34", // Replace with your Cloudinary cloud name
          uploadPreset: "axhscl8i",
        
        },
        (error, result) => {
          if (result.event === "success") {
            axios.post("/api/messages", {
              image: result?.info?.secure_url,
              conversationId,
            });
          }
        }
      );
    } else {
      console.error("Cloudinary widget not loaded");
    }
  };

  return (
    <button onClick={handleUploadClick}>
      <HiPhoto size={30} className="text-sky-500" />
    </button>
  );
};

export default CloudinaryUpload;
