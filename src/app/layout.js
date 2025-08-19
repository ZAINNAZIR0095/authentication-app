import "./globals.css";
import {Lobster} from 'next/font/google'
const lobsterFont =Lobster({
    subsets : ["latin"] , 
    weight : "400" , 
    variable : '--font-lobster'
}) 

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lobsterFont.variable}`} >
      <body
       
      >
        {children}
      </body>
    </html>
  );
}
