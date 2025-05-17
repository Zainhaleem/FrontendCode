import Sidenav from "../components/Sidenav";
import "../css/global.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`dashboard`}>
        <Sidenav/>
        {children}
      </body>
    </html>
  );
}
