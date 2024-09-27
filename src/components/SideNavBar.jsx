import React, { useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

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
          <Nav.Link href="#clients">Clients</Nav.Link>
          <Nav.Link href="#invoices">Invoices</Nav.Link>
        </Nav>
      </div>

      {/* Main content */}
      <div className="flex-grow-1">
        {/* Toggle Button */}
        <Navbar bg="light" expand="lg" className="px-3">
          <Button onClick={toggleSidebar} className="me-auto">
            {isOpen ? 'Close Menu' : 'Open Menu'}
          </Button>
        </Navbar>

        <div className="p-4">
          <h1>Welcome to My App</h1>
          <p>Here is your content...</p>
        </div>
      </div>
    </div>
  );
}

export default SideNavbar;