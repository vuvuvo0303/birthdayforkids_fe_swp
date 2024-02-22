import '../App.css';
import { useEffect, useState } from "react";

export default function ViewListServices() {
    const [service, setService] = useState([]);
    const [packages, setPackage] = useState([]);

    const hanldeGetService = () => {
        fetch('https://65d5f7f2f6967ba8e3bd2382.mockapi.io/Service', {
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
        fetch('https://65d5f7f2f6967ba8e3bd2382.mockapi.io/Package', {
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
        <body>
            {
                service.length !== 0 ?
                    <h3>List Services</h3>
                    :
                    <h2>Have no Service</h2>
            }
            <div className='list'>
                {
                    service.map((item, index) => (
                        item?.service_ID ?
                            <div className='service' key={item.service_ID}>
                                <img src={item.picture} alt='Service Picture' />
                                <div>
                                    <h5>Service Name: {item.name} </h5>
                                    <p>Host: {item.host_ID}</p>
                                    <p>{item.description}</p>
                                    <p>Price: {item.price}$</p>
                                </div>
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
                    <h3>Have no Package</h3>
            }
            <div className='list'>
                {
                    packages.map((item, index) => (
                        item?.package_ID ?
                            <div className='service' key={item.package_ID}>
                                <img src={item.picture} alt='Service Picture' />
                                <div>
                                    <h5>Package Name: {item.name} </h5>
                                    <p>Host: {item.host_ID}</p>
                                    <p>{item.description}</p>
                                    <p>Price: {item.price}$</p>
                                </div>
                            </div>
                            :
                            <p>None</p>
                    ))
                }
            </div>
        </body>
    )
}