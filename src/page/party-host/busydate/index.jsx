import { Breadcrumb, Button, DatePicker, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { CheckOutlined, HomeOutlined, MoreOutlined } from "@ant-design/icons";
import { Box, Flex, Input, Text, useDisclosure } from "@chakra-ui/react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { format } from "date-fns";
import dayjs from "dayjs";

import { useSelector } from "react-redux";
import api from "../../../config/axios";
const BusyDate = () => {
    const [schedules, setSchedules] = useState([]);
    const loggedUser = useSelector((store) => store.user);
    const [editingSchedule, setEditingSchedule] = useState(null);
    const [newDate, setNewDate] = useState(null);
    const handleDelete = async (id) => {
        if (window.confirm("Do you want to delete this schedule?")) {
            try {
                await api.delete(`/api/schedulebusy/deleteBusySchedule/${id}`);
                setSchedules((prev) =>
                    prev.filter((schedule) => schedule.id !== id)
                );
                toast.success("Delete schedule successfully!");
                fetchData();
            } catch (error) {
                console.error("Error deleting schedule:", error);
                toast.error("Failed to delete schedule");
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await api.get(
                `/api/schedulebusy/getAllBusySchedule/${loggedUser.accountID}`
            );
            setSchedules(response.data);
        } catch (error) {
            console.error("Error fetching schedules:", error);
            toast.error("Failed to fetch schedules");
        }
    };

    function isDateValid(dateArray, dateObject) {
        var result = true;
        const currentDate = new Date();
        if (dateObject <= currentDate) {
            toast.error("Date cannot be set in the past");
            result = false;
        }
        for (let i = 0; i < dateArray.length; i++) {
            const arrayDate = new Date(dateArray[i].date);

            if (arrayDate.getTime() === dateObject.getTime()) {
                toast.error("The date was mixed");
                result = false;
            }
        }

        return result;
    }
    const handleEdit = (id, date) => {
        setEditingSchedule(id);
        setNewDate(date);
    };
    const handleSaveEdit = async (date) => {
        if (new Date(newDate).getTime() == new Date(date).getTime()) {
            toast.info("Nothing is updated!");
            setEditingSchedule(null);
            return;
        }
        if (!isDateValid(schedules, new Date(newDate))) {
            return;
        }

        const request = {
            date: dayjs(newDate).format("YYYY-MM-DD"),
            busy: true,
        };
        const response = await api.put(
            `/api/schedulebusy/updateBusySchedule/${editingSchedule}`,
            request
        );
        toast.success("Update successfully!");
        setEditingSchedule(null);
        fetchData();
    };

    const Row = ({ id, date }) => {
        const formattedDate = format(new Date(date), "dd/MM/yyyy");
        const isEditing = editingSchedule && editingSchedule == id;
        return (
            <Tr>
                <Td>
                    {isEditing ? (
                        <DatePicker
                            defaultValue={dayjs(newDate)}
                            format="DD/MM/YYYY"
                            onChange={(e) => {
                                setNewDate(e.toISOString());
                            }}
                        />
                    ) : (
                        formattedDate
                    )}
                </Td>
                <Td textAlign="right">
                    {isEditing ? (
                        <Button
                            shape="circle"
                            onClick={() => handleSaveEdit(date)}
                        >
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
                                    color="Green"
                                    onClick={() => handleEdit(id, date)}
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
        const [newDate, setNewDate] = useState(null);

        const handleAddClick = async () => {
            try {
                const formattedDate = format(new Date(newDate), "yyyy-MM-dd");
                if (!isDateValid(schedules, new Date(newDate))) {
                    return;
                }
                const response = await api.post(
                    `/api/schedulebusy/addBusySchedule`,
                    {
                        date: formattedDate,
                        accountId: loggedUser.accountID,
                    }
                );
                setSchedules((prev) => [
                    ...prev,
                    {
                        id: response.data.id,
                        date: response.data.date,
                    },
                ]);
                toast.success("Add new Busy Date successfully!");
                fetchData();
                onClose();
            } catch (error) {
                console.error("Error adding new Busy Date:", error);
                toast.error("Failed to add new Busy Date");
            }
        };

        return (
            <>
                <Button type="primary" onClick={onOpen}>
                    Add
                </Button>
                <Modal
                    title="Add new schedule"
                    visible={isOpen}
                    onCancel={onClose}
                    footer={[
                        <Button key="cancel" danger onClick={onClose}>
                            Cancel
                        </Button>,
                        <Button
                            key="add"
                            type="primary"
                            onClick={handleAddClick}
                        >
                            Add
                        </Button>,
                    ]}
                >
                    <DatePicker
                        onChange={(date) => setNewDate(date)}
                        format="DD/MM/YYYY"
                    />
                </Modal>
            </>
        );
    };

    return (
        <div>
            <Breadcrumb
                style={{ margin: "16px 0" }}
                items={[
                    { href: "/", title: <HomeOutlined /> },
                    { href: "", title: "Hosts" },
                    { title: "Schedule" },
                    { title: "Manage Busy Date" },
                ]}
            />
            <Flex justifyContent="space-between">
                <Text fontSize="3xl" mb={5}>
                    Manage Busy Date
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
                            <Th textAlign="right">Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {schedules.map((schedule, index) => {
                            return (
                                <Row
                                    key={`schedule-${index}`}
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

export default BusyDate;
