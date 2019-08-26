// This component is a Modal that has a submit and cancel button
// It opens whenever the prop `open` is true and shows a loader
// whenver the prop `loading` is true
// cancelAction and submitAction must deal with the logic of these props
import React from 'react'
import ReactLoading from 'react-loading'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Col, Row } from 'reactstrap'

const closeBtn = ({ toggle }) => (
  <button className="close" onClick={toggle}>
    &times;
  </button>
)

const VerificationModal = ({
  loading,
  open,
  cancelAction,
  submitAction,
  submitText,
  header,
  body,
  danger,
}) => (
  <Modal isOpen={open}>
    <ModalHeader close={() => closeBtn(cancelAction)}> {header}</ModalHeader>
    {!loading ? (
      <>
        {body && <ModalBody>{body}</ModalBody>}
        <ModalFooter>
          <Button onClick={cancelAction} color="secondary">
            Cancel
          </Button>
          <Button onClick={submitAction} color={danger ? 'danger' : 'primary'}>
            {submitText ? submitText : 'Submit'}
          </Button>
        </ModalFooter>
      </>
    ) : (
      <ModalBody>
        <Row>
          <Col md="5" />
          <Col md="2">
            <ReactLoading type="spinningBubbles" color="#000" />
          </Col>
          <Col md="5" />
        </Row>
      </ModalBody>
    )}
  </Modal>
)

export default VerificationModal
