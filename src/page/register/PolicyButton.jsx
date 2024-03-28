import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from "@chakra-ui/react";
import React from "react";

const PolicyButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Button
                fontSize="small"
                onClick={onOpen}
                bg="none"
                _hover={{ bg: "none", shadow: "none" }}
            >
                (see more)
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent maxW="900px">
                    <ModalHeader>
                        Term and Condition of Birthday Blitz Hub
                    </ModalHeader>
                    <ModalBody>
                        <Box p={10}>
                            <div className="container ">
                                <section className="user-policy">
                                    <h1 className="heading">Privacy Policy</h1>
                                    <div className="policy-content">
                                        <p className="policy-title">
                                            Welcome to Birthday Blitz Hub
                                            Website! We are thrilled to have you
                                            celebrate your special day with us.
                                            Before you proceed with booking and
                                            enjoying our services, please take a
                                            moment to review our policies
                                            outlined below.
                                        </p>

                                        <div className="policy-desc">
                                            <div className="policy-container">
                                                <h1 className="policyForGuest">
                                                    Policy for Guest
                                                </h1>
                                                <p className="policy-desc__header">
                                                    I. Reservation and Booking
                                                    Policy.
                                                </p>
                                                <p className="policy-desc__content">
                                                    1. Party booking time: -
                                                    Please book your party at
                                                    least 1 week before the
                                                    party date.
                                                </p>
                                                <p className="policy-desc__content">
                                                    - Booking requests can be
                                                    made through our website.
                                                </p>
                                                <p className="policy-desc__content">
                                                    - A valid email address and
                                                    contact number are required
                                                    for reservation
                                                    confirmation.
                                                </p>
                                            </div>
                                            <div className="policy-container">
                                                <p className="policy-desc__header">
                                                    2. Payment and Fees:
                                                </p>
                                                <p className="policy-desc__content">
                                                    - All bookings require a
                                                    full payment while booking,
                                                    payable at the time of
                                                    reservation.
                                                </p>
                                                <p className="policy-desc__content">
                                                    - Full payment must be
                                                    received before the event
                                                    date.
                                                </p>
                                                <p className="policy-desc__content">
                                                    - Additional charges may
                                                    apply for extra services
                                                    requested after the initial
                                                    booking.
                                                </p>
                                            </div>
                                            <div className="policy-container">
                                                <p className="policy-desc__header">
                                                    3. Cancellation and Refund:
                                                </p>
                                                <p className="policy-desc__content">
                                                    - Cancellations must be made
                                                    at least 10 days before the
                                                    event to receive a partial
                                                    refund.
                                                </p>
                                                <p className="policy-desc__content">
                                                    - Refunds are processed
                                                    within 5 business days.
                                                </p>
                                            </div>
                                            <div className="policy-container">
                                                <p className="policy-desc__header">
                                                    4. Changes and
                                                    Modifications:
                                                </p>
                                                <p className="policy-desc__content">
                                                    - Changes to the booking
                                                    details, such as the number
                                                    of guests or event date, are
                                                    subject to availability.
                                                </p>
                                                <p className="policy-desc__content">
                                                    - Requests for modifications
                                                    should be made at least 10
                                                    days before the event.
                                                </p>
                                            </div>
                                            <div className="policy-container">
                                                <p className="policy-desc__header">
                                                    5. Damages and Liabilities:
                                                </p>
                                                <p className="policy-desc__content">
                                                    - The customer is
                                                    responsible for any damages
                                                    caused to the premises or
                                                    equipment during the event.
                                                </p>
                                                <p className="policy-desc__content">
                                                    - Birthday Blitz Hub and our
                                                    Associated Host is not
                                                    liable for any injuries,
                                                    accidents, or loss of
                                                    personal belongings.
                                                </p>
                                            </div>
                                            <div className="policy-container">
                                                <p className="policy-desc__header">
                                                    6. Privacy Policy:
                                                </p>
                                                <p className="policy-desc__content">
                                                    - We respect your privacy.
                                                    Personal information
                                                    provided during the booking
                                                    process will only be used
                                                    for reservation purposes and
                                                    will not be shared with
                                                    third parties.
                                                </p>
                                            </div>
                                            <div className="policy-container">
                                                <p className="policy-desc__header">
                                                    7. Force Majeure:
                                                </p>
                                                <p className="policy-desc__content">
                                                    - Birthday Blitz Hub is not
                                                    liable for any failure or
                                                    delay in performance due to
                                                    circumstances beyond our
                                                    control, such as natural
                                                    disasters, strikes, or
                                                    government actions. If any
                                                    of the above circumstances
                                                    does occurred, you can
                                                    contact our associated host
                                                    to make changes.
                                                </p>
                                            </div>
                                            <div className="policy-container">
                                                <p className="policy-desc__header">
                                                    8. Feedback and Reviews:
                                                </p>
                                                <p className="policy-desc__content">
                                                    - We encourage guests to
                                                    provide feedback and reviews
                                                    about their experience. Your
                                                    insights help us improve our
                                                    services.
                                                </p>
                                            </div>
                                        </div>

                                        <p className="policy-end">
                                            By proceeding with the booking, you
                                            agree to adhere to the policies
                                            outlined above. Birthday Blitz Hub
                                            reserves the right to modify these
                                            policies at any time, with the
                                            updated version being effective
                                            immediately.
                                        </p>
                                        <p className="policy-end">
                                            Thank you for choosing Birthday
                                            Blitz Hub to celebrate your special
                                            occasion! If you have any questions
                                            or concerns, please contact our
                                            customer service team at
                                            birtdayblitzhub@gmail.com.
                                        </p>

                                        <div className="policy-desc">
                                            <div className="policy-container">
                                                <h1 className="policyForHost">
                                                    Policy for Host
                                                </h1>
                                                <p className="policy-desc__header">
                                                    Birthday Blitz Hub Website
                                                    Host Policy
                                                </p>
                                                <p className="policy-desc__content">
                                                    Introduction: Welcome to our
                                                    Birthday Blitz Hub Website!
                                                    We're thrilled that you're
                                                    considering hosting your
                                                    event with us. To ensure
                                                    that all guests have a
                                                    memorable and enjoyable
                                                    experience, we have
                                                    developed this policy to
                                                    outline the terms and
                                                    conditions for hosting a
                                                    birthday party through our
                                                    platform.
                                                </p>
                                            </div>
                                            <div className="policy-container">
                                                <p className="policy-desc__header">
                                                    Reservation Providing
                                                    Condition:
                                                </p>
                                                <p className="policy-desc__content">
                                                    1. Condition: In order to
                                                    provide parties and services
                                                    for the platform's guests,
                                                    you need to be an associated
                                                    host with our birthday party
                                                    booking website.
                                                </p>
                                                <p className="policy-desc__content">
                                                    2. Confirmation: Once the
                                                    booking request is received,
                                                    you will review the details
                                                    and confirm the reservation
                                                    via our system. Please note
                                                    that the booking is not
                                                    considered confirmed until
                                                    this confirmation is
                                                    received from the booked
                                                    guest.
                                                </p>
                                                <p className="policy-desc__content">
                                                    3. Payment: A deposit will
                                                    be required to secure the
                                                    booking. Our system will
                                                    temporarily keep that
                                                    deposit, and we will
                                                    transfer 80% of the deposit
                                                    to you after the party is
                                                    completed. The remaining
                                                    amount will be directly
                                                    handled between both clients
                                                    at the reservation date.
                                                </p>
                                                <p className="policy-desc__content">
                                                    4. Platform’s Fee: In order
                                                    to use our services, a fee
                                                    must be paid after every
                                                    successful reservation
                                                    booked. That fee will be
                                                    calculated based on 20% of
                                                    the total deposit amount.
                                                </p>
                                            </div>
                                            <div className="policy-container">
                                                <p className="policy-desc__header">
                                                    Host Responsibilities:
                                                </p>
                                                <p className="policy-desc__content">
                                                    1. Communication: Hosts are
                                                    responsible for providing
                                                    accurate information and
                                                    communicating any special
                                                    requests or changes to the
                                                    booking in a timely manner.
                                                </p>
                                                <p className="policy-desc__content">
                                                    2. Guest Management: Hosts
                                                    must ensure that all guests
                                                    adhere to our policies and
                                                    guidelines during the event,
                                                    including any age
                                                    restrictions or safety
                                                    regulations.
                                                </p>
                                                <p className="policy-desc__content">
                                                    3. Commitment: Hosts must
                                                    ensure that they provide
                                                    accurate and complete
                                                    information. If hosts do not
                                                    comply with the policy, they
                                                    will be forever banned from
                                                    the platform.
                                                </p>
                                                <p className="policy-desc__content">
                                                    4. Supervision: Hosts are
                                                    required to supervise the
                                                    event and ensure the safety
                                                    and well-being of all
                                                    guests, especially children,
                                                    throughout the duration of
                                                    the party.
                                                </p>
                                                <p className="policy-desc__content">
                                                    5. Cleanliness: Hosts must
                                                    maintain a clean and tidy
                                                    environment during and after
                                                    the event. Trash should be
                                                    properly disposed of, and
                                                    any damages to the venue or
                                                    equipment must be reported
                                                    immediately.
                                                </p>
                                            </div>
                                            <div className="policy-container">
                                                <p className="policy-desc__header">
                                                    Code of Conduct:
                                                </p>
                                                <p className="policy-desc__content">
                                                    1. Respect: Hosts and guests
                                                    must treat each other with
                                                    respect and courtesy at all
                                                    times.
                                                </p>
                                                <p className="policy-desc__content">
                                                    2. Safety: Hosts are
                                                    responsible for ensuring the
                                                    safety of all guests and
                                                    complying with any safety
                                                    regulations or guidelines
                                                    provided by the venue.
                                                </p>
                                                <p className="policy-desc__content">
                                                    3. Compliance: Hosts and
                                                    guests must comply with all
                                                    local laws and regulations,
                                                    including those related to
                                                    alcohol consumption, noise
                                                    levels, and capacity limits.
                                                </p>
                                            </div>
                                        </div>

                                        <p className="policy-end">
                                            By becoming a host at Birthday Blitz
                                            Hub Website, hosts agree to abide by
                                            the terms and conditions outlined in
                                            this policy. We strive to provide a
                                            safe and enjoyable experience for
                                            all guests and appreciate your
                                            cooperation in making your event a
                                            success. If you have any questions
                                            or concerns regarding this policy,
                                            please don't hesitate to contact us.
                                            Thank you for choosing the Birthday
                                            Blitz Hub Website!
                                        </p>
                                    </div>
                                </section>
                            </div>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default PolicyButton;
