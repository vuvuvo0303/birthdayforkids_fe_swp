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
      <Button fontSize="small" onClick={onOpen} bg="none" _hover={{ bg: "none", shadow: "none" }}>
        (see more)
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="900px">
          <ModalHeader>Term and Condition of Birthday Blitz Hub</ModalHeader>
          <ModalBody>
            <Box p={10}>
              <div className="container ">
                <section className="user-policy">
                  <h1 className="heading">Privacy Policy</h1>
                  <div className="policy-content">
                    <p className="policy-title">
                      Welcome to Birthday Blitz Hub Website! We are thrilled to have you celebrate your special day with
                      us. Before you proceed with booking and enjoying our services, please take a moment to review our
                      policies outlined below.
                    </p>

                    <div className="policy-desc">
                      <div className="policy-container">
                        <p className="policy-desc__header">1. Reservation and Booking</p>
                        <p className="policy-desc__content">
                          - To make a reservation, you must be at least 18 years old.
                        </p>
                        <p className="policy-desc__content">- Booking requests can be made through our website.</p>
                        <p className="policy-desc__content">
                          - A valid email address and contact number are required for reservation confirmation.
                        </p>
                      </div>
                      <div className="policy-container">
                        <p className="policy-desc__header">2. Payment and Fees:</p>
                        <p className="policy-desc__content">
                          - All bookings require a full payment while booking, payable at the time of reservation.
                        </p>
                        <p className="policy-desc__content">- Full payment must be received before the event date.</p>
                        <p className="policy-desc__content">
                          - Additional charges may apply for extra services requested after the initial booking.
                        </p>
                      </div>
                      <div className="policy-container">
                        <p className="policy-desc__header">3. Cancellation and Refund:</p>
                        <p className="policy-desc__content">
                          - Cancellations must be made at least 10 days before the event to receive a partial refund.
                        </p>
                        <p className="policy-desc__content">- Refunds are processed within 5 business days.</p>
                      </div>
                      <div className="policy-container">
                        <p className="policy-desc__header">4. Changes and Modifications:</p>
                        <p className="policy-desc__content">
                          - Changes to the booking details, such as the number of guests or event date, are subject to
                          availability.
                        </p>
                        <p className="policy-desc__content">
                          - Requests for modifications should be made at least 10 days before the event.
                        </p>
                      </div>
                      <div className="policy-container">
                        <p className="policy-desc__header">5. Damages and Liabilities:</p>
                        <p className="policy-desc__content">
                          - The customer is responsible for any damages caused to the premises or equipment during the
                          event.
                        </p>
                        <p className="policy-desc__content">
                          - Birthday Blitz Hub and our Associated Host is not liable for any injuries, accidents, or
                          loss of personal belongings.
                        </p>
                      </div>
                      <div className="policy-container">
                        <p className="policy-desc__header">6. Privacy Policy:</p>
                        <p className="policy-desc__content">
                          - We respect your privacy. Personal information provided during the booking process will only
                          be used for reservation purposes and will not be shared with third parties.
                        </p>
                      </div>
                      <div className="policy-container">
                        <p className="policy-desc__header">7. Force Majeure:</p>
                        <p className="policy-desc__content">
                          - Birthday Blitz Hub is not liable for any failure or delay in performance due to
                          circumstances beyond our control, such as natural disasters, strikes, or government actions.
                          If any of the above circumstances does occurred, you can contact our associated host to make
                          changes.
                        </p>
                      </div>
                      <div className="policy-container">
                        <p className="policy-desc__header">8. Feedback and Reviews:</p>
                        <p className="policy-desc__content">
                          - We encourage guests to provide feedback and reviews about their experience. Your insights
                          help us improve our services.
                        </p>
                      </div>
                    </div>

                    <p className="policy-end">
                      By proceeding with the booking, you agree to adhere to the policies outlined above. Birthday Blitz
                      Hub reserves the right to modify these policies at any time, with the updated version being
                      effective immediately.
                    </p>
                    <p className="policy-end">
                      Thank you for choosing Birthday Blitz Hub to celebrate your special occasion! If you have any
                      questions or concerns, please contact our customer service team at birtdayblitzhub@gmail.com.
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
