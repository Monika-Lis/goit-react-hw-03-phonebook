import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Section } from './Section/Section';
import { Input } from './Input/Input';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';

import css from './App.module.css';

export const App = () => {
  const state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };
  const [userData, setUserData] = useState(() => {
    const savedUserData = localStorage.getItem('userData');
    return savedUserData ? JSON.parse(savedUserData) : state;
  });

  const onChange = event => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    const { name, number, contacts } = userData;

    const isPresent = contacts.some(
      contact => contact.name.toLowerCase() === name.trim().toLowerCase()
    );
    if (isPresent) {
      alert(`${name} is already in contacts`);
      return;
    }

    setUserData({
      ...userData,
      contacts: [...contacts, { name, number, id: nanoid() }],
      name: '',
      number: '',
    });
  };

  const onFilterChange = event => {
    setUserData({ ...userData, filter: event.target.value });
  };

  const onDelete = id => {
    setUserData({
      ...userData,
      contacts: userData.contacts.filter(contact => contact.id !== id),
    });
  };

  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]);

  return (
    <div className={css.app}>
      <Section title="Phonebook">
        <Input
          userData={userData}
          onChange={onChange}
          onSubmit={onSubmit}
        ></Input>
      </Section>
      <Section title="Contacts">
        <Filter filter={userData.filter} onFilterChange={onFilterChange} />
        <Contacts
          contacts={userData.contacts}
          filter={userData.filter}
          onDelete={onDelete}
        />
      </Section>
    </div>
  );
};
