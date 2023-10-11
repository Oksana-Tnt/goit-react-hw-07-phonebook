import React from 'react';
import { useDispatch } from 'react-redux';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import IconButton from 'components/IconButton/IconButton';
import { deleteContacts } from 'redux/contactsOperations';

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();

  return (
    <div className="d-grid gap-2 d-flex justify-content-between">
      {name} : {number}
      <IconButton
        onClick={() => dispatch(deleteContacts(id))}
        area-label="Delete contact"
      >
        <RiDeleteBin6Fill />
      </IconButton>
    </div>
  );
};

export default Contact;
