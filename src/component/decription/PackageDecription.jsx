import "../decription/description.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
// import { Header } from "../Header";
import { Header } from "../Header";
import { HeaderLogin } from "../HeaderLogin";
import { HeaderLoginOfHost } from "../../page/profile/HeaderLoginOfHost";
import { useDispatch, useSelector } from "react-redux";
import { updatePackage } from "../../redux/features/bookingSlice";

export default function PackageDecription() {
  const [packages, setPackage] = useState(null);
  const [services, setServices] = useState(null);
  const userName = useParams();
  const [data, setData] = useState({
    id: 0,
    name: "",
    price: 0,
    description: "",
    picture: "",
  });
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loggedUser = useSelector((store) => store.user);
  const handleLogRedux = (redux) => {
    // console.log("redux", redux);
    console.log('account', packages?.account.accountID);

  }

  const handleUpdatePackage = (ID) => {
    // if (Object.keys(updatedData).length === 0) {
    //     alert('Please provide at least one field to update.');
    //     return;
    // }
    fetch(`http://birthdayblitzhub.online:8080/api/packages/${ID}`, {
      method: "PUT", // or PATCH
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // handle error
      })
      .then((task) => {
        // Do something with updated task
        console.log("check data: ", task);
      })
      .catch((error) => {
        // handle error
      });
  };

  const hanldeGetPackage = async (id = userName.id) => {
    const url = "http://birthdayblitzhub.online:8080/api/packages/" + id;
    await fetch(url, {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        if (res.ok) {
          // console.log('checkData: ', res.json());
          return res.json();
          // setData(res.json());
        }
        // handle error
      })
      .then((data) => {
        // Do something with the list of tasks
        console.log('real data: ', data);
        setPackage(data);
        return data;
      })
      .catch((error) => {
        // handle error
      });
  };
  const hanldeGetServiceByPackageId = async (id = userName.id) => {
    const url = `http://birthdayblitzhub.online:8080/api/services/package/${id}`;
    await fetch(url, {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        if (res.ok) {
          // console.log('checkData: ', res.json());

          // setService(res.json());
          return res.json();
        }
        // handle error
      })
      .then((data) => {
        // Do something with the list of tasks
        console.log("real data sv by pkID: ", data);
        // setFeedback(data[0]);
        setServices(data);
        return data;
      })
      .catch((error) => {
        // handle error
      });
  };
  useEffect(() => {
    hanldeGetPackage();
    hanldeGetServiceByPackageId();
    handleLogRedux(loggedUser);
  }, []);

  return (
    <Box>
      {!loggedUser?.role && <Header />}
      {loggedUser?.role === "Guest" && <HeaderLogin />}
      {loggedUser?.role === "Host" && <HeaderLoginOfHost />}
      <div className="Detail">
        <img src={packages?.picture} alt="Package Picture" />
        <div className="content">
          <h3 className='Name'>Package Name: {packages?.name} </h3>
          <br />
          <h2 className="descrip">Description:</h2>
          <ul className="descrip_cont">
            <li>Provided by: {packages?.account.name}</li>
            <li>Detail: {packages?.description}</li>
            {packages?.maximumSlot &&
              <li>Maximum Slot:{packages?.maximumSlot}</li>
            }
            {services?.length !== 0 &&
              <li className='summ'><details>
                <summary>Including services:</summary>
                <ul className='details'>
                  {services && services.map((item) => (
                    item?.serviceID
                      ?
                      <li key={item?.serviceID}>
                        {item?.name}
                      </li>
                      :
                      <p>None</p>
                  ))}
                </ul>
              </details>
              </li>
            }

          </ul>
          <p className="price">Price: {packages?.price} VNĐ</p>
          <div>
            <button>
              <Link onClick={() => {
                dispatch(updatePackage(packages))
                navigate(`/booking/${packages?.account.accountID}`)
              }}
              >
                Buy Now
              </Link>
            </button>
            {/* <button
              onClick={() => {
                // setIsOpen(true)
                setData(packages);
              }}
            >
              <a href="#popup2" id="openPopUp">
                Update
              </a>
            </button> */}
            <button>
              <Link to={"/ViewListService"}>Cancel</Link>
            </button>
          </div>
        </div>
      </div>
      <div id="popup2" className="overlay">
        <div className="popup">
          <a className="close" href="#">
            &times;
          </a>
          <img src={data.picture} alt="Service Picture" />
          <form className="content">
            <div>
              <label htmlFor="newName">Service Name:</label>
              <input
                type="text"
                id="newName"
                value={data.name}
                onChange={(e) => {
                  setData((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                  }));
                }}
              />
            </div>
            <div>
              <label htmlFor="newPrice">Price:</label>
              <input
                type="number"
                id="newPrice"
                value={data.price}
                onChange={(e) => {
                  setData((prevState) => ({
                    ...prevState,
                    price: e.target.value,
                  }));
                }}
              />
            </div>
            <div>
              <label htmlFor="newDescription">Description:</label>
              <textarea
                id="newDescription"
                value={data.description}
                onChange={(e) => {
                  setData((prevState) => ({
                    ...prevState,
                    description: e.target.value,
                  }));
                }}
              />
            </div>
            {/* <button
              className="buttUpdate"
              type="submit"
              onClick={() => {
                handleUpdatePackage(data?.packageID);
                hanldeGetPackage();
              }}
            >
              Update
            </button> */}
            <button onClick={() => { setIsOpen(false) }}>Close</button>
          </form>
        </div>
      </div>
    </Box >
  );
}
