import React, { useEffect } from 'react';
import Contact from 'components/Contact/Contact';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import ErrorCard from 'components/ErrorCard/ErrorCard';
import Loader from 'components/Loader/Loader';
import { fetchContacts } from 'redux/contactsOperations';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};

const ContactList = () => {
  const dispatch = useDispatch();
  const { contacts, status } = useSelector(getContacts);
  const filterContact = useSelector(getFilter);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filterContact.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  if (status === STATUS.PENDING) return <Loader />;
  else if (status === STATUS.FULFILLED) {
    return (
      <ul className="list-group">
        {filteredContacts.map(({ id, name, number }) => (
          <li key={id} className="list-group-item justify-content-md-center">
            <Contact id={id} name={name} number={number} />
          </li>
        ))}
      </ul>
    );
  } else if (status === STATUS.REJECTED) return <ErrorCard />;
};
export default ContactList;
