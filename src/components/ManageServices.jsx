import '../App.css';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import { Box } from '@mui/material';

export default function ManageService() {
    const [services, setServices] = useState([]);
    const [packages, setPackages] = useState([]);

    const handleDeleteService = (ServiceID) => {
        const url = 'http://birthdayblitzhub.online:8080/api/services/' + ServiceID
        fetch(url, {
            method: 'DELETE',
        }).then(res => {
            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }
            if (res.ok) {
                return res.json();
            }
            // handle error
        }).then(data => {
            // Do something with deleted task
            if (data?.serviceID) {
                const newArray = services.filter(item => item.serviceID !== data.serviceID);
                setServices(newArray);
            } else {
                alert('wrong ID');
            }
            return data;
        }).catch(error => {
            // handle error
        })
    }

    const handleDeletePackage = (PackageID) => {
        const url = 'http://birthdayblitzhub.online:8080/api/packages/' + PackageID
        fetch(url, {
            method: 'DELETE',
        }).then(res => {
            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }
            if (res.ok) {
                return res.json();
            }
            // handle error
        }).then(data => {
            // Do something with deleted task
            if (data?.packageID) {
                const newArray = packages.filter(item => item.packageID !== data.packageID);
                setPackages(newArray);
            } else {
                alert('wrong ID');
            }
            return data;
        }).catch(error => {
            // handle error
        })
    }

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
            setServices(data);
            return data;
        }).catch(error => {
            // handle error
        })
    }

    const hanldeGetPackage = () => {
        fetch('http://birthdayblitzhub.online:8080/api/packages', {
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
            setPackages(data);
            return data;
        }).catch(error => {
            // handle error
        })
    }
    useEffect(() => {
        hanldeGetService();
        hanldeGetPackage();
    }, [])
    return (
        <Box>
            {
                services.length !== 0 ?
                    <h3>List Services</h3>
                    :
                    <h2>Waitting...</h2>
            }
            <div className='list'>
                {
                    services.map((item, index) => (
                        item?.serviceID ?
                            <div className='service' key={item.serviceID}>
                                <img src={item.picture} alt='Service Picture' />
                                <div>
                                    <h5>Service Name: {item.name} </h5>
                                    <p>Host: {item.host_ID}</p>
                                    <p>{item.description}</p>
                                    <p>Price: {item.price}$</p>
                                </div>
                                <Link to={`http://localhost:3000/serviceDetail/${item.serviceID}`}>
                                    <p><button>Detail</button></p>
                                </Link>
                                <p>
                                    <button >Update</button>
                                    <button onClick={
                                        () => {
                                            handleDeleteService(item.serviceID)
                                        }}>
                                        Delete
                                    </button>
                                </p>
                            </div>
                            :
                            <p>None</p>
                    ))
                }
            </div>
            {
                packages.length !== 0 ?
                    <h3>List Packages</h3>
                    :
                    <h3>Waitting...</h3>
            }
            <div className='list'>
                {
                    packages.map((item, index) => (
                        item?.packageID ?
                            <div className='service' key={item.packageID}>
                                <img src={item.picture} alt='Service Picture' />
                                <div>
                                    <h5>Package Name: {item.name} </h5>
                                    <p>Host: {item.host_ID}</p>
                                    <p>{item.description}</p>
                                    <p>Price: {item.price}$</p>
                                </div>
                                <p>
                                    <button >Update</button>
                                    <button onClick={
                                        () => {
                                            handleDeletePackage(item.packageID)
                                        }}>
                                        Delete
                                    </button>
                                </p>
                            </div>
                            :
                            <p>None</p>
                    ))
                }
            </div>
        </Box>
    )
}