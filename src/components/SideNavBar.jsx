import  { useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { List,  X } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

function SideNavbar() {
  const [isOpen, setIsOpen] = useState(false);


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className={`bg-light ${isOpen ? 'd-block' : 'd-none'} sidebar`}>
        <Nav className="flex-column p-3">
          <Link className='nav-link' to="/clients">Clients</Link>
          <Link className='nav-link' to="/invoices">Invoices</Link>
        </Nav>
      </div>

      {/* Main content */}
      <div className="flex-grow-1">
        {/* Toggle Button */}
        <Navbar bg="white" expand="lg" className="px-3">
          <Button onClick={toggleSidebar} className="me-auto vertical-align-middle bg-white text-black border-0">
            {isOpen ? <X/> : <List />}
          </Button>
        </Navbar>

        <div className="p-4">
          <h1>Welcome to EPIC ENERGY</h1>
          <p>BY TEAM 1</p>
        </div>
      </div>
    </div>
  );
}

export default SideNavbar;

