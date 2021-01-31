import React from "react";
import PropTypes from "prop-types";
import ContactListItem from "../ContactListItem/ContactListItem";
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import ContactListStyled from "../ContactList/ContactListStyled";

const ContactList = ({ contacts, filter, deleteContactById }) => {
  return (
    <ContactListStyled>
      <TransitionGroup component="ul" className="contact">
        {contacts
          .filter((contact) =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map((contact) => (
            <CSSTransition
            key={contact.id}
            timeout={250}
            classNames="contact-list-item"
            >
              
            
            <ContactListItem
            
              contact={contact}
              deleteContactById={deleteContactById}
              />
              </CSSTransition>
          ))}
      </TransitionGroup>
    </ContactListStyled>
  );
};

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  filter: PropTypes.string,
  deleteContactById: PropTypes.func,
};


