import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavBarMenu from '../components/NavBarMenu';
import Footer from '../components/Footer';


function RootLayout( {children, items}) {
  return (
    <div>
      <NavBarMenu items = {items} />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default RootLayout;