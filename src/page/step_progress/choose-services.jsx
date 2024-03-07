import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { Col, Image, Row } from "antd";
import "./package.css";
import { useDispatch, useSelector } from "react-redux";
import { selectService } from "../../redux/features/bookingSlice";
export const ChooseServices = () => {
  const [services, setServices] = useState([]);
  const dispatch = useDispatch();
  const selectedServices = useSelector((store) => store.booking.services);
  const fetchServices = async () => {
    const response = await api.get(`/api/services/host/${68}`);
    setServices(response.data);
    console.log(response);
  };

  const handleSelectService = (item) => {
    console.log(item);
    dispatch(selectService(item));
  };

  useEffect(() => {
    fetchServices();
  }, []);
  return (
    <div className="services">
      <Row gutter={[12, 12]}>
        {services.map((item) => (
          <Col
            span={4}
            onClick={() => {
              handleSelectService(item);
            }}
          >
            <Service
              data={item}
              isSelected={selectedServices?.map((item) => item.serviceID).includes(item.serviceID)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

const Service = ({ isSelected, data }) => {
  return (
    <div className={`service-item-order ${isSelected ? "select" : ""}`}>
      <img src={data.picture} />
      <p>
        {data.name}
      </p>
      <p><strong>Price: {data.price} VND</strong></p>
      
    </div>
  );
};

export default ChooseServices;
