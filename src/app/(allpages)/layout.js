import Footer from "../components/Footer";
import Nav from "../components/Nav";
import "../css/global.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={``}>
        <Nav/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
