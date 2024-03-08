import { Breadcrumb, Button } from "antd";
import React, { useState } from "react";
import { HomeOutlined, MoreOutlined, CheckOutlined } from "@ant-design/icons";
import { Box, Flex, Input, Text, useDisclosure } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableContainer } from "@chakra-ui/react";
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
const schedulesData = [
  // {
  //   id: 1,
  //   time: "05:30",
  // },
  // {
  //   id: 2,
  //   time: "08:00",
  // },
  // {
  //   id: 3,
  //   time: "12:30",
  // },
  // {
  //   id: 4,
  //   time: "13:15",
  // },
  // {
  //   id: 5,
  //   time: "15:30",
  // },
];

const ManageSchedule = () => {
  const [schedules, setSchedules] = useState(schedulesData);
  const [newTime, setNewTime] = useState("12:00");
  const handleDelete = (id) => {
    if (confirm("Do you want to delete this schedule?")) {
      setSchedules((prev) => {
        return prev.filter((schedule) => schedule.id != id);
      });
      toast.success("Delete schedule successfully!");
    }
  };
  const handleAdd = async (time) => {
    if (schedules.find((item) => item.time === time)) {
      toast.error("Schedule already exist!");
    } else {
      setSchedules((prev) => {
        return [
          ...prev,
          {
            id: prev.length + 1,
            time: time,
          },
        ];
      });
      toast.success("Add new schedule successfully!");
      onClose();
    }
    const response = await api.post("api/schedules");
    console.log(response.data);
  };
  const handleEdit = (id, time) => {
    if (schedules.find((item) => item.time === time)) {
      toast.error("Schedule already exist!");
    } else {
      setSchedules((prev) => {
        return prev.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              time: time,
            };
          }
          return item;
        });
      });
      toast.success("Update schedule successfully!");
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  const Row = ({ id, time }) => {
    const [isEdit, setisEdit] = useState(false);
    const [currentTime, setCurrentTime] = useState(time);
    console.log(currentTime);
    const handleSave = () => {
      handleEdit(id, currentTime);
      setisEdit(false);
    };
    return (
      <Tr>
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
                <MenuItem p={5} onClick={() => setisEdit(!isEdit)}>
                  Edit
                </MenuItem>
                <MenuItem p={5} color="red" onClick={() => handleDelete(id)}>
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Td>
      </Tr>
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
          <Button type="primary" onClick={onOpen}>
            Add
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add new schedule</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Flex justifyContent="center" mt={10}>
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
                <Button type="primary" onClick={() => handleAdd(newTime)}>
                  Add
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Flex>

      <TableContainer>
        <Table variant="simple" size="lg">
          <Thead>
            <Tr>
              <Th>Time</Th>
              <Th textAlign="right">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {schedules.map((schedule, index) => {
              return <Row key={`schedule-${index}`} time={schedule.time} id={schedule.id} />;
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ManageSchedule;
