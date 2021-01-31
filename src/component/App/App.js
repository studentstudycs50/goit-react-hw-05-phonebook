import React, { Component } from 'react';
import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import Filter from "../Filter/Filter";
import {CSSTransition} from 'react-transition-group'
import Notification from '../Notification/Notification'
import AppStyled from '../App/AppStyled';

class App extends Component{
state = {
  contacts: [{id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},],
  filter: "",
  notification: "",
  openNotification: false,
  }

 componentDidMount() {
    if (localStorage.getItem("contacts")) {
      const contactsFromLS = JSON.parse(localStorage.getItem("contacts"));
      this.setState({
        contacts: [...contactsFromLS],
      });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  showNotificationAlert = (notification) => {
    this.setState({ notification: notification });
    this.setState({ openNotification: true });
    setTimeout(() => {
      this.setState({ openNotification: false });
    }, 2000)
    setTimeout(() => {
      this.setState({notification: ""})
    }, 2500)
  }

onHandlerSubmit = (contact) => {
    if (this.state.contacts.some((item) => item.name === contact.name)) {
     this.showNotificationAlert(`${contact.name} is already in contacts`);
      return;
    }

    if (this.state.contacts.some((item) => item.number === contact.number)) {
     this.showNotificationAlert(`Contact with number ${contact.number} is already in contacts`);
      return;
    }

    if (!contact.name.length) {
      this.showNotificationAlert("Please, enter a name");
      return;
    }
    if (!contact.number.length) {
     this.showNotificationAlert("Please, enter a number");
      return;
    }
    this.setState((prev) => {
      return {
        contacts: [...prev.contacts, contact],
      };
    });
  };

  deleteContactById = (event) => {
    const id = event.target.dataset.id;
    this.setState({
      contacts: this.state.contacts.filter((contact) => contact.id !== id),
    });
    this.setState({ filter: "" });
  };

  onChangeFilter = (event) => {
    this.setState({ filter: event.target.value });
  };

  render() {
    const { contacts, filter, notification, openNotification } = this.state;

    return (
      <AppStyled>
        <CSSTransition
        in={openNotification}
          timeout={250}
          classNames="notification"
          unmountOnExit>
          <Notification notification={notification}/>
        </CSSTransition>
        <CSSTransition
          in={true}
          timeout={500}
          appear={true}
        classNames="phonebook">
        <h2 className="phbook-title">PhoneBook</h2>
        </CSSTransition>
        <ContactForm onHandlerSubmit={this.onHandlerSubmit} />

        <h2 className="contacts-title">Contacts</h2>
        <CSSTransition
        in={contacts.length > 1}
          timeout={250}
          appear={true}
          classNames="filter"
          unmountOnExit>
        <Filter value={filter} onChangeFilter={this.onChangeFilter} />
        </CSSTransition>
        <ContactList
          contacts={contacts}
          filter={filter}
          deleteContactById={this.deleteContactById}
        />
      </AppStyled>
    );
  }
}

export default App



