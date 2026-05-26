// fonts.js
import React, { useEffect } from 'react';
import GlobalFont from 'react-native-global-font';

export default function Fonts() {
  useEffect(() => {
    GlobalFont.applyGlobal(
      "Montserrat-SemiBold",
      "Poppins-Medium",
      "Poppins-Regular",
      "Poppins-Light",
      "Poppins-Bold"
    );
  }, []);

  return null; 
}
