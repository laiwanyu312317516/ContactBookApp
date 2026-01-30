import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert, SafeAreaView, StatusBar, Platform } from 'react-native';
import { initDatabase, addContact, getContacts, updateContact, deleteContact } from '../database/db';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';

interface Contact {
    id: number;
    name: string;
    phone: string;
}

export default function App() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [editingContact, setEditingContact] = useState<Contact | null>(null);

    useEffect(() => {
        const initialize = async () => {
            try {
                await initDatabase();
                await loadContacts();
            } catch (error) {
                console.error('Initialization failed:', error);
                Alert.alert('Error', 'Failed to initialize database.');
            }
        };
        initialize();
    }, []);

    const loadContacts = async () => {
        try {
            const data = await getContacts();
            setContacts(data as Contact[]);
        } catch (error) {
            console.error('Failed to load contacts:', error);
        }
    };

    const handleAdd = async (name: string, phone: string) => {
        try {
            await addContact(name, phone);
            await loadContacts();
        } catch (error) {
            console.error('Failed to add contact:', error);
            Alert.alert('Error', 'Failed to add contact.');
        }
    };

    const handleUpdate = async (name: string, phone: string) => {
        if (!editingContact) return;
        try {
            await updateContact(editingContact.id, name, phone);
            setEditingContact(null);
            await loadContacts();
        } catch (error) {
            console.error('Failed to update contact:', error);
            Alert.alert('Error', 'Failed to update contact.');
        }
    };

    const handleDelete = (id: number) => {
        Alert.alert(
            '確認刪除',
            '確定要刪除這位聯絡人嗎？',
            [
                { text: '取消', style: 'cancel' },
                {
                    text: '刪除',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteContact(id);
                            await loadContacts();
                        } catch (error) {
                            console.error('Failed to delete contact:', error);
                        }
                    },
                },
            ]
        );
    };

    const handleEdit = (contact: Contact) => {
        setEditingContact(contact);
    };

    const handleCancelEdit = () => {
        setEditingContact(null);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>公司聯絡簿</Text>
            </View>
            <View style={styles.content}>
                <ContactForm
                    onSubmit={editingContact ? handleUpdate : handleAdd}
                    initialName={editingContact ? editingContact.name : ''}
                    initialPhone={editingContact ? editingContact.phone : ''}
                    isEditing={!!editingContact}
                    onCancel={handleCancelEdit}
                />
                <ContactList
                    contacts={contacts}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        padding: 16,
        flex: 1,
    },
});
