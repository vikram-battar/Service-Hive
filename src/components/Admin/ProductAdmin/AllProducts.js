import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Button } from "react-bootstrap";
 import EditIcon from "@mui/icons-material/Edit";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {downloadBill} from "../../../Utils/downloadBill"
import { config } from "../../../App";
import DownloadIcon from "@mui/icons-material/Download";
import Header from "../Header/Header";
import OrderInfo from "./ProductModal"
import axios from "axios";
import { useHistory } from "react-router-dom";

const ProductAdmin = (props) => {
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
       
        const url = `${config.endpoint}/products`;
        
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
      name: "Service Name",
      selector: (row) => row.label,
      id: "name",
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      id: "make",
      sortable: true,
    },
    
    {
      name: "Cost",
      id: "licensePlate",
      selector: (row) => row.cost,
      sortable: true,
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
  ];

  return (
    <>
      
      <Header />
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
export default ProductAdmin;
