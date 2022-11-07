import React, { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';
import './App.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number:'',
  };

  changeFilter = evt => {
    this.setState({ filter: evt.currenTarget.value })
  };

  getVisibleContact = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

    nameInpudId = nanoid();

  addContact = contact => {
    if (this.state.contacts.some(el => el.name === contact.name)) {
      return alert(`Contact already exist`)
    }
    this.setState(prev=>({contacts:[...prev.contacts, {id:nanoid(),...contact}]}))
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContact = JSON.parse(contacts);
    if (parsedContact) {
      this.setState({ contacts: parsedContact });
    }
  }

  // formSubmit = ({ name, number }) => {
  //   const contact = {
  //     id: nanoid(),
  //     name,
  //     number,
  //   };
  //   this.state.contacts.some(
  //     i =>
  //       (i.name.toLowerCase() === contact.name.toLowerCase() &&
  //         i.number === contact.number) ||
  //       i.number === contact.number
  //   )
  //     ? alert(`${name} is already in contacts`)
  //     : this.setState(({ contacts }) => ({
  //         contacts: [contact, ...contacts],
  //       }));
  // };

  render() {
    const { filter } = this.state;
    const visibleContact = this.getVisibleContact();
    return (
      <section>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} changeFilterInput={this.changeFilter} />
        <ContactList
          contacts={visibleContact}
          deleteContact={this.deleteContact}
        />
      </section>
    );
  }
};
