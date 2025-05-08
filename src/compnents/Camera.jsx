// import React, { useRef, useState } from "react";

// const Camera = () => {
//   const videoRef = useRef(null);
//   const [error, setError] = useState(null);

//   // Start Camera
//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true, // Enables video
//       });
//       videoRef.current.srcObject = stream;
//     } catch (err) {
//       setError("Unable to access the camera. Please allow camera permissions.");
//       console.error(err);
//     }
//   };

//   // Stop Camera
//   const stopCamera = () => {
//     const stream = videoRef.current.srcObject;
//     if (stream) {
//       const tracks = stream.getTracks();
//       tracks.forEach((track) => track.stop());
//       videoRef.current.srcObject = null;
//     }
//   };

//   // Call `startCamera` when the component mounts
//   React.useEffect(() => {
//     startCamera();
//     return () => stopCamera(); // Clean up when unmounting
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <h1 className="text-2xl font-bold mb-4">Camera</h1>
//       {error ? (
//         <p className="text-red-500">{error}</p>
//       ) : (
//         <video ref={videoRef} autoPlay playsInline className="border rounded-lg w-full max-w-md"></video>
//       )}
//       <button
//         onClick={stopCamera}
//         className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600"
//       >
//         Stop Camera
//       </button>
//     </div>
//   );
// };

// export default Camera;

import React, { useRef, useState } from "react";

const Camera = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState(null);
  const [snapshot, setSnapshot] = useState(null);

  // Start Camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true, // Enables video
      });
      videoRef.current.srcObject = stream;
    } catch (err) {
      setError("Unable to access the camera. Please allow camera permissions.");
      console.error(err);
    }
  };

  // Stop Camera
  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  // Capture Snapshot
  const captureSnapshot = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // Set canvas dimensions to match the video
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      // Draw the current video frame to the canvas
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      // Convert canvas content to an image URL
      const snapshotURL = canvas.toDataURL("image/png");
      setSnapshot(snapshotURL);
    }
  };

  React.useEffect(() => {
    startCamera();
    return () => stopCamera(); // Clean up when unmounting
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Camera</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="border rounded-lg w-full max-w-md mb-4"
        ></video>
      )}

      <canvas ref={canvasRef} className="hidden"></canvas>

      <div className="flex gap-4">
        <button
          onClick={captureSnapshot}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Capture Snapshot
        </button>
        <button
          onClick={stopCamera}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Stop Camera
        </button>
      </div>

      {snapshot && (
        <div className="mt-6">
          <h2 className="text-lg font-bold">Snapshot:</h2>
          <img
            src={snapshot}
            alt="Captured snapshot"
            className="border rounded-lg mt-2 max-w-md"
          />
        </div>
      )}
    </div>
  );
};

export default Camera;
