import React from "react";

import { useState, useEffect } from "react";

import axios from "axios";
import { Button } from "antd";
import { useSelector } from "react-redux";

export const OrderHistory = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loggedUser = useSelector((store) => store.user);

    const fetchData = async (id) => {
        const response = await axios.get(
            `http://birthdayblitzhub.online:8080/api/orders/guest/${id}`
        );
        console.log("data :", response.data);
        setData(response.data);
    };

    useEffect(() => {
        fetchData(loggedUser.accountID);
    }, []);

    return (
        <div className="container table-orderHistory">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">NO</th>
                        <th scope="col">Name</th>
                        {/* <th scope="col">Quantity</th> */}
                        <th scope="col">Total Price</th>
                        <th scope="col">Description</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <th scope="row">{index}</th>
                            {/* <td>{data.id}</td> */}
                            <td>{item.packageEntity.name}</td>
                            {/* <td>{item.quantity}</td> */}
                            <td>{item.totalPrice}</td>
                            <td>{item.packageEntity.description}</td>
                            <td>
                                <Button>Detail</Button>
                                <Button>FeedBack</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
