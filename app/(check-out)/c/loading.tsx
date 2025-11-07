import React from "react";

export default function DashboardLoading() {
  return (
    <div className=' w-full h-screen flex justify-center items-center'>
     <span className="loader"></span>
    </div>
  );
}

// import React from "react";
// import { Player } from "@lottiefiles/react-lottie-player";
// import loadingAnimation from "../public/lottieflow-loading-08-000000-easey.json";

// export default function Loading() {
//   return (
//     <div className='w-full h-screen flex justify-center items-center'>
//       <Player
//         autoplay
//         loop
//         src={loadingAnimation}
//         style={{ width: '300px', height: '300px' }}
//       />
//     </div>
//   );
// }