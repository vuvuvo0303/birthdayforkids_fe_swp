import '../list.css';
// import '../App.css'
import { useEffect, useState } from "react";
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { Header } from '../Header';
import { Select } from 'antd';
import { Footer } from '../Footer';

export default function ViewListServices() {
    const [service, setService] = useState([]);
    const [packages, setPackage] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [displayType, setDisplayType] = useState('all');
    const [data, setData] = useState({
        id: 0,
        name: "",
        price: 0,
        description: "",
        picture: "",
    });

    const hanldeGetService = () => {
        fetch('http://birthdayblitzhub.online:8080/api/services', {
            method: 'GET',
            headers: { 'content-type': 'application/json' },
        }).then(res => {
            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }
            if (res.ok) {
                // console.log('checkData: ', res.json());
                return res.json();
                // setData(res.json());
            }
            // handle error
        }).then(data => {
            // Do something with the list of tasks
            // console.log('real data: ', data);
            setService(data);
            return data;
        }).catch(error => {
            // handle error
        })
    }

    const handleUpdate = (ID) => {
        // if (Object.keys(updatedData).length === 0) {
        //     alert('Please provide at least one field to update.');
        //     return;
        // }
        fetch(`http://birthdayblitzhub.online:8080/api/services/${ID}`, {
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

    const handleDeleteService = (ServiceID) => {
        // alert('Do you want to Delete?');
        const url =
            "http://birthdayblitzhub.online:8080/api/services/" + ServiceID;
        fetch(url, {
            method: "DELETE",
        })
            .then(async (data) => {
                console.log(ServiceID);
                const newArray = service.filter(
                    (item) => item.serviceID !== ServiceID
                );
                setService(newArray);
            })
            .catch((error) => {
                // handle error
            });
    };

    const hanldeGetPackage = () => {
        fetch('http://birthdayblitzhub.online:8080/api/packages/allPackages', {
            method: 'GET',
            headers: { 'content-type': 'application/json' },
        }).then(res => {
            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }
            if (res.ok) {
                // console.log('checkData: ', res.json());
                return res.json();
                // setData(res.json());
            }
            // handle error
        }).then(data => {
            // Do something with the list of tasks
            // console.log('real data: ', data);
            setPackage(data);
            return data;
        }).catch(error => {
            // handle error
        })
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


    const handleDeletePackage = (PackageID) => {
        const url =
            "http://birthdayblitzhub.online:8080/api/packages/" + PackageID;
        fetch(url, {
            method: "DELETE",
        })
            // .then((res) => {
            //     if (!res.ok) {
            //         throw new Error("Failed to fetch data");
            //     }
            //     if (res.ok) {
            //         return res.json();
            //     }
            //     // handle error
            // })
            .then((data) => {
                // Do something with deleted task
                // if (data?.packageID) {
                const newArray = packages.filter(
                    (item) => item.packageID !== PackageID
                );
                setPackage(newArray);
                // } else {
                //     alert("wrong ID");
                // }
                return data;
            })
            .catch((error) => {
                // handle error
            });
    };

    const handleChange = (event) => {
        console.log(event);
        setSortBy(event);
        // Gọi hàm xử lý sắp xếp dịch vụ ở đây
        handleSortByPrice(event);
    };

    const handleSortByPrice = (sortBy) => {
        // Viết logic sắp xếp dịch vụ ở đây
        console.log('Sort by:', sortBy);
        if (sortBy === 'Desc') {
            const sortedServices = [...service]; // Tạo một bản sao của mảng service để tránh ảnh hưởng đến state gốc
            sortedServices.sort((a, b) => b.price - a.price); // Sắp xếp mảng các dịch vụ theo giá giảm dần
            console.log('sortedServices', sortedServices);
            setService(sortedServices); // Cập nhật state service với mảng đã được sắp xếp
            console.log("data service: ", service);

            const sortedPackage = [...packages];
            sortedPackage.sort((a, b) => b.price - a.price);
            // console.log('sortedPackage', sortedPackage);
            setPackage(sortedPackage);
            // console.log("data package: ", packages);
        }
        else if (sortBy === 'Asc') {
            const sortedServices = [...service];
            sortedServices.sort((a, b) => a.price - b.price);
            setService(sortedServices);

            const sortedPackage = [...packages];
            sortedPackage.sort((a, b) => a.price - b.price);
            setPackage(sortedPackage);
        }
    };

    const handleDisplayService = () => {
        setDisplayType('service');
    };

    const handleDisplayPackage = () => {
        setDisplayType('package');
    };
    // const handleDisplayAll = () => {
    //     setDisplayType('all');
    // };

    useEffect(() => {
        if (displayType === 'service') {
            hanldeGetService();
        } else if (displayType === 'package') {
            hanldeGetPackage();
        } else {
            hanldeGetService();
            hanldeGetPackage();
        }
    }, [displayType]);

    return (
        <Box>
            <Header />
            <div className='choose'>
                <Select
                    // defaultValue="Desc"
                    style={{
                        width: 200,
                        // marginTop: 100,
                        // marginLeft: 100,
                    }}
                    onChange={handleChange}
                    options={[
                        {
                            label: <span>Sort by Price</span>,
                            title: 'Sort by Price',
                            options: [
                                {
                                    label: <span>Descending</span>,
                                    value: 'Desc',
                                },
                                {
                                    label: <span>Ascending</span>,
                                    value: 'Asc',
                                },
                            ],
                        },
                    ]}
                />
                <button className='Display' onClick={handleDisplayService} >List all service</button>
                <button className='Display' onClick={handleDisplayPackage}>List all package</button>
            </div>
            {/* {
                service.length !== 0 ?
                    <p></p>
                    :
                    <h2>Waiting...</h2>
            } */}
            {(displayType === 'all' || displayType === 'service') && (
                <div className='list'>
                    {
                        service.map((item, index) => (
                            item?.serviceID
                                ?
                                <div className='servicee' key={item.serviceID}>
                                    <img src={item.picture} alt='Service Picture' />
                                    <div className="content">
                                        <h5>Service Name: {item.name} </h5>
                                        <p>Host: {item.account.name}</p>
                                        <p className="price">Price: {item.price}$</p>
                                        <div>
                                            <Link to={`http://localhost:5173/serviceDetail/${item.serviceID}`}                                    >
                                                <button>Detail</button>
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    // setIsOpen(true);
                                                    setData(item);
                                                }}
                                            >
                                                <a href="#popup1" id="openPopUp">
                                                    Update
                                                </a>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    handleDeleteService(item.serviceID);
                                                    hanldeGetService();
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                :
                                <p>None</p>
                        ))
                    }
                </div>
            )}
            <div id="popup1" className="overlay">
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
                            $
                        </div>
                        <div>
                            <label htmlFor="newDescription">
                                Description:
                            </label>
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
                        <button
                            className="buttUpdate"
                            type="submit"
                            onClick={() => {
                                handleUpdate(data?.serviceID);
                                hanldeGetService();
                            }}
                        >
                            Update
                        </button>
                        {/* <button
                                className="Close"
                                onClick={() => {
                                    setIsOpen(false);
                                }}
                            >
                                Close
                            </button> */}
                    </form>
                </div>
            </div>

            {/* {
                packages.length !== 0 ?
                    <p></p>
                    :
                    <h3></h3>
            } */}
            {(displayType === 'all' || displayType === 'package') && (
                <div className='list'>
                    {
                        packages.map((item, index) => (
                            item?.packageID ?
                                <div className='servicee' key={item.packageID}>
                                    <img src={item.picture} alt='Service Picture' />
                                    <div className="content">
                                        <h5>Package Name: {item.name} </h5>
                                        <p>Host: {item.account.name}</p>
                                        {/* <p>{item.description}</p> */}
                                        <p className="price">Price: {item.price}$</p>
                                        <div>
                                            <Link to={`http://localhost:5173/packageDetail/${item.packageID}`}>
                                                <button>Detail</button>
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    // setIsOpen(true);
                                                    setData(item);
                                                }}
                                            >
                                                <a href="#popup2" id="openPopUp">
                                                    Update
                                                </a>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    handleDeletePackage(item.packageID);
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>

                                    </div>
                                </div>
                                :
                                <p>None</p>
                        ))
                    }
                </div>
            )}
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
                                    setData((State) => ({
                                        ...State,
                                        price: e.target.value,
                                    }));
                                }}
                            />
                            $
                        </div>
                        <div>
                            <label htmlFor="newDescription">
                                Description:
                            </label>
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
                        <button
                            className="buttUpdate"
                            type="submit"
                            onClick={() => {
                                handleUpdatePackage(data?.packageID);
                                // setIsOpen(false);
                                hanldeGetService();
                            }}
                        >
                            Update
                        </button>
                        <button
                            className="Close"
                            onClick={() => {
                                // setIsOpen(false);
                            }}
                        >
                            Close
                        </button>
                    </form>
                </div>
            </div>

            <Link className='dash' to={'/dashboard/party-host'}>
                <button>DashBoard</button>
            </Link>
            <Footer />
        </Box>
    )
}