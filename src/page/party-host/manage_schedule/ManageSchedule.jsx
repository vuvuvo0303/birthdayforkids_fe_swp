import { Breadcrumb, Button } from "antd";
import React, { useState } from "react";
import { HomeOutlined, MoreOutlined, CheckOutlined } from "@ant-design/icons";
import { Box, Flex, Input, Text, useDisclosure } from "@chakra-ui/react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableContainer,
} from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import api from "../../../config/axios";
import { format } from "date-and-time";
import date from "date-and-time";
const schedulesData = [
    {
        id: 1,
        time: "05:30",
        date: "2024-03-09",
    },
    {
        id: 2,
        time: "08:00",
        date: "2024-03-09",
    },
    {
        id: 3,
        time: "12:30",
        date: "2024-03-09",
    },
    {
        id: 4,
        time: "13:15",
        date: "2024-03-09",
    },
    {
        id: 5,
        time: "15:30",
        date: "2024-03-09",
    },
];

const ManageSchedule = () => {
    const [schedules, setSchedules] = useState(schedulesData);

    const handleDelete = (id) => {
        if (confirm("Do you want to delete this schedule?")) {
            setSchedules((prev) => {
                return prev.filter((schedule) => schedule.id != id);
            });
            toast.success("Delete schedule successfully!");
        }
    };
    const handleAdd = async (time, date) => {
        if (
            schedules.find((item) => item.time === time && item.date === date)
        ) {
            toast.error("Schedule already exist!");
        } else {
            setSchedules((prev) => {
                return [
                    ...prev,
                    {
                        id: prev.length + 1,
                        time: time,
                        date: date,
                    },
                ];
            });
            toast.success("Add new schedule successfully!");
        }
        const response = await api.post("api/schedules");
        console.log(response.data);
    };
    const handleEdit = (id, time, date) => {
        if (
            schedules.find((item) => item.time === time && item.date === date)
        ) {
            toast.error("Schedule already exist!");
        } else {
            setSchedules((prev) => {
                return prev.map((item) => {
                    if (item.id === id) {
                        return {
                            ...item,
                            time: time,
                            date: date,
                        };
                    }
                    return item;
                });
            });
            toast.success("Update schedule successfully!");
        }
    };

    const Row = ({ id, time, date }) => {
        const [isEdit, setisEdit] = useState(false);
        const [currentTime, setCurrentTime] = useState(time);
        const [currentDate, setCurrentDate] = useState(date);
        console.log(currentTime);
        const handleSave = () => {
            handleEdit(id, currentTime, currentDate);
            setisEdit(false);
        };
        return (
            <Tr>
                <Td>
                    {isEdit ? (
                        <Input
                            type="date"
                            value={currentDate}
                            w="120px"
                            h="40px"
                            fontSize="lg"
                            onChange={(e) => {
                                if (
                                    date
                                        .subtract(
                                            new Date(),
                                            new Date(e.target.value)
                                        )
                                        .toDays() > 0
                                ) {
                                    toast.error(
                                        "Noooooooooooooooooooooooooooo"
                                    );
                                } else {
                                    setCurrentDate(e.target.value);
                                }
                            }}
                        />
                    ) : (
                        format(date, "dd/MM/yyyy")
                    )}
                </Td>
                <Td>
                    {isEdit ? (
                        <Input
                            type="time"
                            value={currentTime}
                            w="120px"
                            h="40px"
                            fontSize="lg"
                            onChange={(e) => {
                                setCurrentTime(e.target.value);
                            }}
                        />
                    ) : (
                        time
                    )}
                </Td>
                <Td textAlign="right">
                    {isEdit ? (
                        <Button shape="circle" onClick={handleSave}>
                            <CheckOutlined />
                        </Button>
                    ) : (
                        <Menu>
                            <MenuButton as="span" cursor="pointer">
                                <Button shape="circle">
                                    <MoreOutlined />
                                </Button>
                            </MenuButton>
                            <MenuList p={0}>
                                <MenuItem
                                    p={5}
                                    onClick={() => setisEdit(!isEdit)}
                                >
                                    Edit
                                </MenuItem>
                                <MenuItem
                                    p={5}
                                    color="red"
                                    onClick={() => handleDelete(id)}
                                >
                                    Delete
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    )}
                </Td>
            </Tr>
        );
    };

    const AddButton = () => {
        const { isOpen, onOpen, onClose } = useDisclosure();
        const [newTime, setNewTime] = useState("12:00");
        const [newDate, setNewDate] = useState(
            format(new Date(), "yyyy-MM-dd")
        );
        return (
            <>
                <Button type="primary" onClick={onOpen}>
                    Add
                </Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Add new schedule</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Flex
                                justifyContent="center"
                                mt={10}
                                flexDir="column"
                                alignItems="center"
                                gap={5}
                            >
                                <Input
                                    placeholder="Select date"
                                    type="date"
                                    w="120px"
                                    h="40px"
                                    fontSize="lg"
                                    value={newDate}
                                    onChange={(e) => {
                                        if (
                                            date
                                                .subtract(
                                                    new Date(),
                                                    new Date(e.target.value)
                                                )
                                                .toDays() > 0
                                        ) {
                                            toast.error(
                                                "Noooooooooooooooooooooooooooo"
                                            );
                                        } else {
                                            setNewDate(e.target.value);
                                        }
                                    }}
                                />
                                <Input
                                    placeholder="Select time"
                                    type="time"
                                    w="120px"
                                    h="40px"
                                    fontSize="lg"
                                    value={newTime}
                                    onChange={(e) => setNewTime(e.target.value)}
                                />
                            </Flex>
                        </ModalBody>

                        <ModalFooter display="flex" gap={5}>
                            <Button type="primary" danger onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                type="primary"
                                onClick={() =>
                                    handleAdd(newTime, new Date(newDate))
                                }
                            >
                                Add
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        );
    };

    return (
        <div>
            <Breadcrumb
                style={{ margin: "16px 0" }}
                items={[
                    { href: "/homepage", title: <HomeOutlined /> },
                    { href: "", title: "Hosts" },
                    { title: "Schedule" },
                    { title: "Manage" },
                ]}
            />
            <Flex justifyContent="space-between">
                <Text fontSize="3xl" mb={5}>
                    Manage Schedules
                </Text>
                <Box>
                    <AddButton />
                </Box>
            </Flex>

            <TableContainer>
                <Table variant="simple" size="lg">
                    <Thead>
                        <Tr>
                            <Th>Date</Th>
                            <Th>Time</Th>
                            <Th textAlign="right">Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {schedules.map((schedule, index) => {
                            return (
                                <Row
                                    key={`schedule-${index}`}
                                    time={schedule.time}
                                    id={schedule.id}
                                    date={schedule.date}
                                />
                            );
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ManageSchedule;
