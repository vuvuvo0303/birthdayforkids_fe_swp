import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import axios from 'axios';

export default function Decription() {
    const [service, setService] = useState(null);
    const [packages, setPackage] = useState([]);
    const userName = useParams();

    // const getService = async () => {
    //     await axios.get('https://65d5f7f2f6967ba8e3bd2382.mockapi.io/Service', {
    //         params: {
    //             id: userName.id
    //         }
    //     })
    //         .then(response => {
    //             if (response.data) {
    //                 setService(response.data[0]);
    //                 console.log('res data:' + response.data[0]);
    //             }
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         }
    //         )
    // }
    // useEffect(() => {
    //     getService()
    // }, [])

    const hanldeGetService = async (id) => {
        const url = 'https://65d5f7f2f6967ba8e3bd2382.mockapi.io/Service/' + id;
        fetch(url, {
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

    useEffect(() => {
        hanldeGetService();
    }, [])

    return (
        <div className='Detail'>
        </div>
    )

}


function Detail(props) {
    const service = props.service;
    return (
        <div>
            <img src={service?.picture} alt='Service Picture' />
            <div>
                <h5>Service Name: {service?.name} </h5>
                <p>Host: {service?.host_ID}</p>
                <p>{service?.description}</p>
                <p>Price: {service?.price}$</p>
            </div>
        </div>
    )
}