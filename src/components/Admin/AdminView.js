import { flexbox, width } from "@mui/system";
import Bar1 from "./Bar1";
import Bar2 from "./Bar2"
import "./admin.css"
import Header from "./Header/Header";
const AdminView = () => {
  return (
    <div>
        <Header/>
        <br/>
        <br/>
        
      <div className="admin">
        <Bar1 label="Categories" apiEndpoint="topCategories" />
      </div>
      <div className="admin">
        <Bar1 label="Services" apiEndpoint="topServices" style={{ flex: 1 }} />
      </div>
      <br/>
      <br/><br/>
      <div className="admin">
        <Bar1 label="Users" apiEndpoint="topUsers" />
      </div>
      <div className="admin">
        <Bar2 label="Users" apiEndpoint="mostOrderedServices" />
      </div>
    </div>
  );
};

export default AdminView;
