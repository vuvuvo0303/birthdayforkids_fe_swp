import '../App.css';
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import axios from 'axios';
import { Box } from '@mui/material';

export default function PackageDecription() {
    const [packages, setPackage] = useState(null);
    const userName = useParams();

    const hanldeGetPackage = async (id = userName.id) => {
        const url = 'http://birthdayblitzhub.online:8080/api/packages/' + id;
        await fetch(url, {
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
        })
            .then(data => {
                // Do something with the list of tasks
                // console.log('real data: ', data);
                setPackage(data);
                return data;
            })
            .catch(error => {
                // handle error
            })
    }
    useEffect(() => {
        hanldeGetPackage();
    }, [])


    return (
        <Box className='Detail'>
            <img src={packages?.picture} alt='package Picture' />
            <div>
                <h3>package Name: {packages?.name} </h3>
                <p>Host: {packages?.account.name}</p>
                <p>{packages?.description}</p>
                <p>Price: {packages?.price}$</p>
            </div>
            <button>Add to card</button>
            <button>Update</button>
            <button>Cancel</button>
        </Box>
    )

}
