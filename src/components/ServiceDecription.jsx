import '../App.css';
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import axios from 'axios';
import { Box } from '@mui/material';

export default function ServiceDecription() {
    const [service, setService] = useState(null);
    const userName = useParams();


    const hanldeGetService = async (id = userName.id) => {
        const url = 'http://birthdayblitzhub.online:8080/api/services/' + id;
        await fetch(url, {
            method: 'GET',
            headers: { 'content-type': 'application/json' },
        }).then(res => {
            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }
            if (res.ok) {
                // console.log('checkData: ', res.json());

                // setService(res.json());
                return res.json();
            }
            // handle error
        })
            .then(data => {
                // Do something with the list of tasks
                // console.log('real data: ', data);
                setService(data);
                return data;
            })
            .catch(error => {
                // handle error
            })
    }

    useEffect(() => {
        hanldeGetService();
    }, [])

    return (
        <Box className='Detail'>
            <img src={service?.picture} alt='Service Picture' />
            <div>
                <h3>Service Name: {service?.name} </h3>
                <p>Host: {service?.account.name}</p>
                <p>{service?.description}</p>
                <p>Price: {service?.price}$</p>
            </div>
            <button>Add to card</button>
            <button>Update</button>
            <button>Cancel</button>
        </Box>
    )

}
