import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../utils/api';
import { addContact, setContacts, deleteContactFromList } from '../features/contactSlice';
import LogoutButton from './Logout';

const Contacts = () => {
    const dispatch = useDispatch();
    const contacts = useSelector((state) => state.contacts.contacts);
    const [newContact, setNewContact] = useState({ name: '', email: '', phone: '' });

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await api.get('/contacts');
                dispatch(setContacts(response.data));
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        };
        fetchContacts();
    }, [dispatch]);

    const handleDelete = async (id) => {
        try {
            await api.delete(`/contacts/${id}`);
            dispatch(deleteContactFromList(id));
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/contacts', newContact);
            dispatch(addContact(response.data));
            setNewContact({ name: '', email: '', phone: '' });
        } catch (error) {
            console.error('Error creating contact:', error);
        }
    };

    return (
        <div className="app-layout">
            <header className="app-header">
                <h2>Contacts</h2>
                <div className="logout-wrapper">
                    <LogoutButton />
                </div>
            </header>
            <main className="contacts-container">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={newContact.name}
                        onChange={(e) =>
                            setNewContact({ ...newContact, name: e.target.value })
                        }
                        autoComplete="name"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={newContact.email}
                        onChange={(e) =>
                            setNewContact({ ...newContact, email: e.target.value })
                        }
                        autoComplete="email"
                    />
                    <input
                        type="text"
                        placeholder="Phone"
                        value={newContact.phone}
                        onChange={(e) =>
                            setNewContact({ ...newContact, phone: e.target.value })
                        }
                        autoComplete="tel"
                    />
                    <button type="submit">Add Contact</button>
                </form>

                <div className="contacts-list">
                    {contacts.map((contact) => (
                        <div key={contact._id} className="contact-card">
                            <h3>{contact.name}</h3>
                            <p>{contact.email}</p>
                            <p>{contact.phone}</p>
                            <button onClick={() => handleDelete(contact._id)}>Delete</button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Contacts;
