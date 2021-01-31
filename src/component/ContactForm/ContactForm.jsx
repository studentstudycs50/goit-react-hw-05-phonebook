import React, { Component } from "react";
import { v4 as uuidv4 } from 'uuid';
import ContFormStyled from "../ContactForm/ContactFormStyled";

class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };

  onHandleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onHandleSubmit = (event) => {
    event.preventDefault();
    this.props.onHandlerSubmit({ ...this.state, id: uuidv4() });
    this.setState({ name: "", number: "" });
  };

  render() {
    const { name, number } = this.state;

    return (
      <ContFormStyled>
        <form className="contForm" onSubmit={this.onHandleSubmit}>
          <label className="title-form">
            Name
            <input
              type="text"
              value={name}
              name="name"
              onChange={this.onHandleChange}
              className="input-form"
            />
          </label>
          <label className="title-form">
            Number
            <input
              type="text"
              value={number}
              name="number"
              onChange={this.onHandleChange}
              className="input-form"
            />
          </label>
          <button type="submit" className="button">
            Add contact
          </button>
        </form>
      </ContFormStyled>
    );
  }
}

export default ContactForm;
