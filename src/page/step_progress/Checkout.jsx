import {
    Box,
    Button,
    CheckboxGroup,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Link,
    RadioGroup,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import { Checkbox, Form, Radio } from "antd";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import api from "../../config/axios";
import "./checkout.css";
import { Image } from "antd";
import moment from "moment";

const Checkout = ({ setCartItemsIndex }) => {
    const booking = useSelector((store) => store.booking);
    const [cartItems, setCartItems] = useState([]);
    const [value, setValue] = useState(1);
    const onChange = (e) => {
        console.log("radio checked", e.target.value);
        setValue(e.target.value);
    };
    const handleDeleteItem = (index) => {
        cartItems.splice(index, 1);

        setCartItems([...cartItems]);
    };
    const handleIncrease = (index) => {
        cartItems[index].quantity += 1;
        setCartItems([...cartItems]);
        // setCartItems((prev) => {
        //   return prev.map((item) => {
        //     if (item.id == id) {
        //       return {
        //         ...item,
        //         quantity: item.quantity + 1,
        //       };
        //     }
        //     return item;
        //   });
        // });
    };
    const handleDecrease = (index) => {
        const quantity = cartItems[index].quantity;

        if (quantity > 1) {
            cartItems[index].quantity -= 1;
            setCartItems([...cartItems]);
        } else {
            handleDeleteItem(index);
        }
        // setCartItems((prev) => {
        //   return prev.map((item) => {
        //     if (item.id == id) {
        //       if (item.quantity == 1) {
        //         handleDeleteItem(item.id);
        //         return item;
        //       }
        //       return {
        //         ...item,
        //         quantity: item.quantity - 1,
        //       };
        //     }
        //     return item;
        //   });
        // });
    };
    useEffect(() => {
        const fetch = async () => {
            let services = [];
            const response = await api.get(
                `/api/services/package/${booking.package.packageID}`
            );
            console.log(response.data);
            services = [
                ...response.data?.map((item) => {
                    return {
                        ...item,
                        type: "package",
                    };
                }),
            ];
            services = [...services, ...booking.services];
            setCartItems(
                services.map((item) => {
                    return {
                        id: 1,
                        name: item.name,
                        imageURL: item.picture,
                        quantity: 1,
                        price: item.price,
                        type: item.type,
                    };
                })
            );
            console.log(services);
        };
        fetch();
        // data.push(booking.services);
        // console.log(data);
    }, []);

    useEffect(() => {
        if (cartItems) setCartItemsIndex(cartItems);
    }, [cartItems]);

    var subtotal = 0;
    cartItems.forEach((item) => {
        subtotal += item.price * item.quantity;
    });

    return (
        <Flex w="full" mt="50px" gap={10}>
            <Box w="full">
                <Flex justifyContent="space-between" w="full" fontWeight="bold">
                    <Text fontSize="20px">Bill</Text>
                </Flex>
                <TableContainer>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th fontSize="15px">Product</Th>
                                <Th fontSize="15px">Image</Th>
                                <Th fontSize="15px">Quantity</Th>
                                <Th fontSize="15px">Price</Th>
                                <Th fontSize="15px">Clear all</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {cartItems.map((item, index) => {
                                return (
                                    <Tr
                                        key={`cart-item-${index} `}
                                        className={`row-checkout ${
                                            item?.type === "package"
                                                ? "disable"
                                                : ""
                                        }`}
                                    >
                                        <Td>{item.name}</Td>
                                        <Td>
                                            <Image
                                                src={item.imageURL}
                                                width={70}
                                            />
                                        </Td>
                                        <Td>
                                            <Flex alignItems="center" gap={5}>
                                                {item.type !== "package" && (
                                                    <Button
                                                        borderRadius="50%"
                                                        onClick={() =>
                                                            handleDecrease(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        -
                                                    </Button>
                                                )}
                                                {item.quantity}
                                                {item.type !== "package" && (
                                                    <Button
                                                        borderRadius="50%"
                                                        onClick={() => {
                                                            handleIncrease(
                                                                index
                                                            );
                                                        }}
                                                    >
                                                        +
                                                    </Button>
                                                )}
                                            </Flex>
                                        </Td>
                                        <Td>
                                            {new Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format(
                                                item.price * item.quantity
                                            )}
                                            {/* {(
                                                item.price * item.quantity
                                            ).toFixed(0)}{" "} */}
                                        </Td>
                                        <Td>
                                            {item.type !== "package" && (
                                                <Button
                                                    onClick={() => {
                                                        handleDeleteItem(index);
                                                    }}
                                                >
                                                    x
                                                </Button>
                                            )}
                                        </Td>
                                    </Tr>
                                );
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
                <Text textAlign="right" mt={10}>
                    Total:
                    {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    }).format(subtotal.toFixed(0))}
                </Text>
                <Divider my={10} />
            </Box>
            <Box bgColor="#f7f2f7" p={10} borderRadius="20px">
                <Text fontSize="20px" fontWeight="bold" mb={10}>
                    Information
                </Text>
                <FormControl>
                    <FormLabel fontSize="15px">Email address</FormLabel>
                    <Input
                        disabled
                        value={booking?.information?.email}
                        fontSize="15px"
                        p={8}
                        border="1px solid black"
                        w="200px"
                        mb={10}
                    />
                    <FormLabel fontSize="15px">Phone Number</FormLabel>
                    <Input
                        disabled
                        value={booking?.information?.phoneNumber}
                        fontSize="15px"
                        p={8}
                        border="1px solid black"
                        w="200px"
                        mb={10}
                    />
                    <FormLabel fontSize="15px">Customer's Name</FormLabel>
                    <Input
                        disabled
                        value={booking?.information?.username}
                        fontSize="15px"
                        p={8}
                        border="1px solid black"
                        w="200px"
                        mb={10}
                    />
                    <FormLabel fontSize="15px">Venue</FormLabel>
                    <Input
                        disabled
                        value={booking?.information?.venue}
                        fontSize="15px"
                        p={8}
                        border="1px solid black"
                        w="200px"
                        mb={10}
                    />
                    <FormLabel fontSize="15px">Date</FormLabel>
                    <Input
                        disabled
                        value={booking?.information?.dateString}
                        fontSize="15px"
                        p={8}
                        border="1px solid black"
                        w="200px"
                        mb={10}
                        type="text"
                    />
                    <FormLabel fontSize="15px">Time</FormLabel>
                    <Input
                        disabled
                        value={booking?.information?.timeString}
                        fontSize="15px"
                        p={8}
                        border="1px solid black"
                        w="200px"
                        mb={10}
                        type="time"
                    />
                    {/* <Form.Item
            label="Payments Method's"
            name="role"
            rules={[
              {
                required: true,
                message: "Please choose Payments Method's",
              },
            ]}
          ></Form.Item> */}
                    {/* <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>VNPay</Radio>
            <Radio value={2}>Wallet</Radio>
          </Radio.Group> */}
                </FormControl>
            </Box>
        </Flex>
    );
};

export default Checkout;
