import { useEffect, useState } from "react";
import { Container, Dropdown, DropdownButton, Form, Table } from "react-bootstrap";
import SideNavbar from "./SideNavBar";
import { toast } from "react-toastify";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [value, setValue] = useState("")
  const [showClient, setShowClient] = useState(false)
  const [showState, setShowState] = useState(false)
  const [showData, setShowData] = useState(false)
  const url = import.meta.env.VITE_URL;


  const notifyError = (errorMsg) =>{
    toast.error(errorMsg, {
      className: "text-white bg-danger m-4",
    })
  }

  const getallInvoices = async () => {
    const resp = await fetch(url + "/invoices", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (resp.ok) {
      const res = await resp.json();
      setInvoices(res.content);
    }
  };

  const filterByClient = async () => {
  try {  const resp = await fetch(url + "/invoices?clientId=" + value, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        }, 
    });
    if(resp.ok){
        const res = await resp.json()
        setInvoices(res.content)
    }} catch (error){
        console.log(error);
        notifyError("Errore nel reperimento dei dati")
    }
  }

  const handleChange = e => {
    setValue(e.target.value)
  }

  const handlefetchByClient = e => {
    e.preventDefault()
    filterByClient()
  }

  useEffect(() => {
    getallInvoices()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <>
    
    <SideNavbar/>
      <Container className="mt-5">
        <h1>Invoices</h1>
        <DropdownButton className="mb-2" id="dropdown-basic-button" title="Filters">
        <Dropdown.Item onClick={() => {
            setShowClient(true)
            setShowState(false);
             setShowData(false)}}>Client</Dropdown.Item>
        <Dropdown.Item onClick={() => {
            setShowClient(false);
             setShowState(true);
             setShowData(false) }}>State</Dropdown.Item>
        <Dropdown.Item onClick={() => {
            setShowState(false);
             setShowData(true)
             setShowClient(false); }}>Date</Dropdown.Item>
      </DropdownButton>

      <Form className={showClient ? "d-block" : "d-none"} onSubmit={handlefetchByClient}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Client</Form.Label>
          <Form.Control type="text" placeholder="Client" value={value} onChange={handleChange} />
        </Form.Group>
        </Form>
        <Form className={showState ? "d-block" : "d-none"} onSubmit={handlefetchByClient}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>State</Form.Label>
          <Form.Control type="text" placeholder="State" value={value} onChange={handleChange} />
        </Form.Group>
        </Form>
        <Form className={showData ? "d-block" : "d-none"} onSubmit={handlefetchByClient}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" placeholder="Date" value={value} onChange={handleChange} />
        </Form.Group>
      </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Invoice Number</th>
              <th>State</th>
              <th>Total amount</th>
              <th>Client</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => {
              return (
                <tr key={invoice.id}>
                  <td>{index + 1}</td>
                  <td>{invoice.date}</td>
                  <td>{invoice.invoiceNumber}</td>
                  <td>{invoice.totalAmount}</td>
                  <td>{invoice.invoicesState}</td>
                  <td>{invoice.client.companyName}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
};
export default Invoices;
