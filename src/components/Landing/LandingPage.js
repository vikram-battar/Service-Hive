import Slideshow from "./SlideShow";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import CategoryBox from "./CategoryBox";
import { useHistory, Link } from "react-router-dom";

const LandingPage = () => {
    const category={
        category:"Boquet"
    }
    const history=useHistory()
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
  return (
    <div>
      <Header />
      <Slideshow />
      <div className="categories">
        <Link className="categoryBox category1" to={{ pathname: '/', state: { category:"women_salon" } } }>
          <CategoryBox name={"Women Salon"} />
        </Link>
        <Link className="categoryBox category2" to={{ pathname: '/', state: { category:"men_salon" } }}>
          <CategoryBox name={"Men Salon"}/>
        </Link>
        <Link className="categoryBox category3" to={{ pathname: '/', state: { category:"cleaning" } }}>
          <CategoryBox  name={"Cleaning"}/>
        </Link>
      </div>
      <div className="categories ">
        <Link className="categoryBox category4" to={{ pathname: '/', state: { category:"electrician" } }}>
          <CategoryBox  name={"Electrician"}/>
        </Link>
        <Link className="categoryBox category5" to={{ pathname: '/', state: { category:"carpenter" } }}>
          <CategoryBox  name={"Carpenter"}/>
        </Link>
        {/* <Link className="categoryBox category6" to={{ pathname: '/', state: { category:"Shirt" } }}>
          <CategoryBox  name={"Shirts"}/>
        </Link> */}
      </div>

      <Footer />
    </div>
  );
};
export default LandingPage;
