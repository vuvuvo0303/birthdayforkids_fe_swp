import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

const cartItemsData = [
  {
    id: 1,
    name: "Package 5",
    imageURL: "https://livforcake.com/wp-content/uploads/2017/02/chocolate-strawberry-cake-3.jpg",
    quantity: 1,
    price: 110.99,
  },
  {
    id: 2,
    name: "Package 3",
    imageURL: "https://livforcake.com/wp-content/uploads/2017/02/chocolate-strawberry-cake-3.jpg",
    quantity: 2,
    price: 259.99,
  },
  {
    id: 3,
    name: "Package 1",
    imageURL: "https://livforcake.com/wp-content/uploads/2017/02/chocolate-strawberry-cake-3.jpg",
    quantity: 1,
    price: 109.99,
  },
  {
    id: 4,
    name: "Package 2",
    imageURL: "https://livforcake.com/wp-content/uploads/2017/02/chocolate-strawberry-cake-3.jpg",
    quantity: 1,
    price: 110.99,
  },
  {
    id: 5,
    name: "Package 2",
    imageURL: "https://livforcake.com/wp-content/uploads/2017/02/chocolate-strawberry-cake-3.jpg",
    quantity: 1,
    price: 110.99,
  },
  {
    id: 6,
    name: "Package 2",
    imageURL: "https://livforcake.com/wp-content/uploads/2017/02/chocolate-strawberry-cake-3.jpg",
    quantity: 1,
    price: 110.99,
  },
  {
    id: 7,
    name: "Package 2",
    imageURL: "https://livforcake.com/wp-content/uploads/2017/02/chocolate-strawberry-cake-3.jpg",
    quantity: 1,
    price: 110.99,
  },
  {
    id: 8,
    name: "Package 2",
    imageURL: "https://livforcake.com/wp-content/uploads/2017/02/chocolate-strawberry-cake-3.jpg",
    quantity: 1,
    price: 110.99,
  },
  {
    id: 9,
    name: "Package 2",
    imageURL: "https://livforcake.com/wp-content/uploads/2017/02/chocolate-strawberry-cake-3.jpg",
    quantity: 1,
    price: 110.99,
  },
];

const Checkout = () => {
  const booking = useSelector((store) => store.booking);
  const [cartItems, setCartItems] = useState(cartItemsData);
  const handleDeleteItem = (id) => {
    setCartItems((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  };
  const handleIncrease = (id) => {
    setCartItems((prev) => {
      return prev.map((item) => {
        if (item.id == id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
    });
  };
  const handleDecrease = (id) => {
    setCartItems((prev) => {
      return prev.map((item) => {
        if (item.id == id) {
          if (item.quantity == 1) {
            handleDeleteItem(item.id);
            return item;
          }
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      });
    });
  };
  console.log(booking);
  var subtotal = 0;
  cartItems.forEach((item) => {
    subtotal += item.price * item.quantity;
  });
  return (
    <Flex w="full" mt="50px" gap={10}>
      <Box w="full">
        <Flex justifyContent="space-between" w="full" fontWeight="bold">
          <Text fontSize="20px">Bill</Text>
          <Link as={RouterLink} to="/">
            Continue Oder &gt;
          </Link>
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
                  <Tr key={`cart-item-${index}`}>
                    <Td>{item.name}</Td>
                    <Td>
                      <Image src={item.imageURL} w="50px" h="50px" />
                    </Td>
                    <Td>
                      <Flex alignItems="center" gap={5}>
                        <Button borderRadius="50%" onClick={() => handleDecrease(item.id)}>
                          -
                        </Button>{" "}
                        {item.quantity}
                        <Button
                          borderRadius="50%"
                          onClick={() => {
                            handleIncrease(item.id);
                          }}
                        >
                          +
                        </Button>
                      </Flex>
                    </Td>
                    <Td>${(item.price * item.quantity).toFixed(2)}</Td>
                    <Td>
                      <Button
                        onClick={() => {
                          handleDeleteItem(item.id);
                        }}
                      >
                        x
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
        <Text textAlign="right" mt={10}>
          Total: ${subtotal.toFixed(2)}
        </Text>
        <Divider my={10} />
      </Box>
      <Box bgColor="#f7f2f7" p={10} borderRadius="20px">
        <Text fontSize="20px" fontWeight="bold" mb={10}>
          Information
        </Text>
        <FormControl>
          <FormLabel fontSize="15px">Email address</FormLabel>
          <Input disabled value="Enter name" fontSize="15px" p={8} border="1px solid black" w="200px" mb={10} />
          <FormLabel fontSize="15px">Phone Number</FormLabel>
          <Input disabled value="XXXXXXXXXX" fontSize="15px" p={8} border="1px solid black" w="200px" mb={10} />
          <FormLabel fontSize="15px">Username</FormLabel>
          <Input disabled value="username" fontSize="15px" p={8} border="1px solid black" w="200px" mb={10} />
          <FormLabel fontSize="15px">Address</FormLabel>
          <Input disabled value="address" fontSize="15px" p={8} border="1px solid black" w="200px" mb={10} />
          <FormLabel fontSize="15px">Date</FormLabel>
          <Input
            disabled
            value="2003-10-20"
            fontSize="15px"
            p={8}
            border="1px solid black"
            w="200px"
            mb={10}
            type="date"
          />
        </FormControl>
      </Box>
    </Flex>
  );
};

export default Checkout;
