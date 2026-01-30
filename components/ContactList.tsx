import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

interface Contact {
    id: number;
    name: string;
    phone: string;
}

interface ContactListProps {
    contacts: Contact[];
    onEdit: (contact: Contact) => void;
    onDelete: (id: number) => void;
}

const ContactList: React.FC<ContactListProps> = ({ contacts, onEdit, onDelete }) => {
    const renderItem = ({ item }: { item: Contact }) => (
        <View style={styles.itemContainer}>
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.phone}>{item.phone}</Text>
            </View>
            <View style={styles.actionsContainer}>
                <TouchableOpacity onPress={() => onEdit(item)} style={[styles.button, styles.editButton]}>
                    <Text style={styles.buttonText}>編輯</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDelete(item.id)} style={[styles.button, styles.deleteButton]}>
                    <Text style={styles.buttonText}>刪除</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <FlatList
            data={contacts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
        paddingBottom: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        marginBottom: 8,
        borderRadius: 8,
        elevation: 1,
        borderWidth: 1,
        borderColor: '#eee',
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    phone: {
        fontSize: 16,
        color: '#666',
    },
    actionsContainer: {
        flexDirection: 'row',
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 4,
        marginLeft: 8,
    },
    editButton: {
        backgroundColor: '#2196F3',
    },
    deleteButton: {
        backgroundColor: '#F44336',
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default ContactList;
