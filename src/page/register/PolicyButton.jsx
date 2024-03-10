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
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>
            <Box p={10}>
              <div>
                <h2>Terms and Conditions</h2>
                <p>
                  By accessing and using this website, you accept and agree to be bound by the terms and provision of
                  this agreement. In addition, when using this website's particular services, you shall be subject to
                  any posted guidelines or rules applicable to such services, which may be posted and modified from time
                  to time. All such guidelines or rules are hereby incorporated by reference into the T&C.
                </p>
                <h3>Use License</h3>
                <ol>
                  <li>
                    Permission is granted to temporarily download one copy of the materials (information or software) on
                    our website for personal, non-commercial transitory viewing only. This is the grant of a license,
                    not a transfer of title, and under this license you may not:
                    <ol type="a">
                      <li>modify or copy the materials;</li>
                      <li>
                        use the materials for any commercial purpose, or for any public display (commercial or
                        non-commercial);
                      </li>
                      <li>attempt to decompile or reverse engineer any software contained on our website;</li>
                      <li>remove any copyright or other proprietary notations from the materials; or</li>
                      <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
                    </ol>
                  </li>
                  <li>
                    This license shall automatically terminate if you violate any of these restrictions and may be
                    terminated by our website at any time. Upon terminating your viewing of these materials or upon the
                    termination of this license, you must destroy any downloaded materials in your possession whether in
                    electronic or printed format.
                  </li>
                </ol>
                <h3>Disclaimer</h3>
                <p>
                  The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or
                  implied, and hereby disclaims and negates all other warranties including, without limitation, implied
                  warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of
                  intellectual property or other violation of rights. Further, we do not warrant or make any
                  representations concerning the accuracy, likely results, or reliability of the use of the materials on
                  its website or otherwise relating to such materials or on any sites linked to this site.
                </p>
                <h3>Limitations</h3>
                <p>
                  In no event shall we or our suppliers be liable for any damages (including, without limitation,
                  damages for loss of data or profit, or due to business interruption) arising out of the use or
                  inability to use the materials on our website, even if we or an authorized representative has been
                  notified orally or in writing of the possibility of such damage. Because some jurisdictions do not
                  allow limitations on implied warranties, or limitations of liability for consequential or incidental
                  damages, these limitations may not apply to you.
                </p>
                <h3>Accuracy of materials</h3>
                <p>
                  The materials appearing on our website could include technical, typographical, or photographic errors.
                  We do not warrant that any of the materials on its website are accurate, complete, or current. We may
                  make changes to the materials contained on its website at any time without notice. However, we do not
                  make any commitment to update the materials.
                </p>
                <h3>Modifications</h3>
                <p>
                  We may revise these terms of service for its website at any time without notice. By using this website
                  you are agreeing to be bound by the then current version of these terms of service.
                </p>
                <h3>Governing Law</h3>
                <p>
                  These terms and conditions are governed by and construed in accordance with the laws of [Your Country]
                  and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                </p>
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
