import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleInputChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  addContact = ({ name, number }) => {
    const contactExists = this.state.contacts.find(
      value => value.name.toLowerCase() === name.toLowerCase()
    );

    contactExists
      ? alert(`${name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [
            ...prevState.contacts,
            {
              id: nanoid(),
              name: name,
              number: number,
            },
          ],
        }));
  };

  displayedContactList = () => {
    const { contacts, filter } = this.state;
    const contactList = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return contactList;
  };

  deleteContact = id => {
    const { contacts } = this.state;
    const index = contacts.findIndex(a => a.id === id);

    if (index === -1) return;
    contacts.splice(index, 1);

    this.setState({ ...contacts });
  };

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter
          value={this.state.filter}
          onChangeFilter={this.handleInputChange}
        />
        <ContactList
          deleteContact={this.deleteContact}
          contacts={this.displayedContactList()}
        />
      </div>
    );
  }
}
