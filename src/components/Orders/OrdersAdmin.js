import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Button } from "react-bootstrap";
 import EditIcon from "@mui/icons-material/Edit";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {downloadBill} from "../../Utils/downloadBill"
import { config } from "../../App";
import DownloadIcon from "@mui/icons-material/Download";
import Header from "../Header/Header";
import OrderInfo from "./OrderModal"
import axios from "axios";
import { useHistory } from "react-router-dom";

const OrdersAdmin = (props) => {
  const [carData, setCarData] = useState([]);
  const [show, setShow] = useState(false);
  const [serviceForm, setServiceForm] = useState({});
  const history = useHistory();
    const checkLoggedIn=()=>{
        const username = window.localStorage.getItem("username")
        if(username)
        {

        }
        else
        {
            history.push('/login')
        }
    }
    checkLoggedIn()

  const handleClick = (row) => {
    let x = row;

    setShow(true);
    setServiceForm(x);
  };
 
  useEffect(() => {
   
    const fetchData = async () => {
      let username = window.localStorage.getItem("username");
      let category = window.localStorage.getItem("category");
      console.log("username", username)
      if (username) {
       
        const url = `${config.endpoint}/orders?category=${category}`;
        
         let res = await axios.get(url)
        console.log(res)
        //console.log("Hi from Admin", res);
        setCarData(res.data);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
        name: "Date",
        id: "date",
        selector: (row) => row.order_date,
        sortable: true,
      },
    {
      name: "Customer Name",
      selector: (row) => row.username,
      id: "name",
      sortable: true,
    },
    {
      name: "Service",
      selector: (row) => row.label,
      id: "make",
      sortable: true,
    },
    
    {
      name: "Quantity",
      id: "licensePlate",
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: "Status",
      id: "serviceType",
      selector: (row) => row.order_status,
      sortable: true,
      
    },
    {
      name: "Cost",
      id: "cost",
      selector: (row) => row.price,
    },
    {
        name: "Edit Status",
        id: "downtimePageAction",
        selector: (row) => (
          <EditIcon
            style={{ justifyContent: "center" }}
            onClick={() => {
              handleClick(row);
            }}
          />
        ),
      },
    
    {
      name: "Download Invoice",
      id: "downloadInvoice",

      selector: (row) => {
       

        return (
          <DownloadIcon
            style={{ justifyContent: "center" }}
            onClick={() => {
                downloadBill(row)
            }}
          />
        );
      },
    },
  ];

  return (
    <>
      <Header />
      <h1>{window.localStorage.getItem("category")} Orders</h1>
      <DataTable
        columns={columns}
        data={carData}
        pagination
        striped={true}
        className="table d-flex align-items-center"
        //fixedHeader
        fixedHeaderScrollHeight="450px"
        subHeader
       
      />
      <OrderInfo 
          serviceForm={serviceForm}
          show = {show}
          setShow={setShow}
          carData={carData}
          setCarData={setCarData}
          className="modal"
        />
    </>
  );
};
export default OrdersAdmin;
