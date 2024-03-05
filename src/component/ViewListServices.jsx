import '../component/list.css';
// import '../App.css'

import { useEffect, useState } from "react";
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { Header } from './Header';

export default function ViewListServices() {
    const [service, setService] = useState([]);
    const [packages, setPackage] = useState([]);

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
    useEffect(() => {
        hanldeGetService();
        hanldeGetPackage();
    }, [])
    return (
        <Box>
            <Header />
            {
                service.length !== 0 ?
                    <h3>List Services</h3>
                    :
                    <h2>Waiting...</h2>
            }
            <div className='list'>
                {
                    service.map((item, index) => (
                        item?.serviceID ?
                            <div className='servicee' key={item.serviceID}>
                                <img src={item.picture} alt='Service Picture' />
                                <div>
                                    <h5>Service Name: {item.name} </h5>
                                    <p>Host: {item.account.name}</p>
                                    <p>Price: {item.price}$</p>
                                </div>
                                <Link to={`http://localhost:3000/serviceDetail/${item.serviceID}`}>
                                    <p><button>Detail</button></p>
                                </Link>
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
                    <h3>Waiting...</h3>
            }
            <div className='list'>
                {
                    packages.map((item, index) => (
                        item?.packageID ?
                            <div className='servicee' key={item.packageID}>
                                <img src={item.picture} alt='Service Picture' />
                                <div>
                                    <h5>Package Name: {item.name} </h5>
                                    <p>Host: {item.account.name}</p>
                                    {/* <p>{item.description}</p> */}
                                    <p>Price: {item.price}$</p>
                                </div>
                                <Link to={`http://localhost:3000/packageDetail/${item.packageID}`}>
                                    <p><button>Detail</button></p>
                                </Link>
                            </div>
                            :
                            <p>None</p>
                    ))
                }
            </div>
        </Box>
    )
}