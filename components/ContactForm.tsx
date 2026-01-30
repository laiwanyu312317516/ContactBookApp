import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

interface ContactFormProps {
    onSubmit: (name: string, phone: string) => void;
    initialName?: string;
    initialPhone?: string;
    onCancel?: () => void;
    isEditing?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, initialName = '', initialPhone = '', onCancel, isEditing = false }) => {
    const [name, setName] = useState(initialName);
    const [phone, setPhone] = useState(initialPhone);

    useEffect(() => {
        setName(initialName);
        setPhone(initialPhone);
    }, [initialName, initialPhone]);

    const handleSubmit = () => {
        if (name.trim() && phone.trim()) {
            onSubmit(name, phone);
            if (!isEditing) {
                setName('');
                setPhone('');
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>姓名:</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="輸入員工姓名"
            />
            <Text style={styles.label}>電話號碼:</Text>
            <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="輸入電話號碼"
                keyboardType="phone-pad"
            />
            <View style={styles.buttonContainer}>
                <Button title={isEditing ? "更新" : "新增"} onPress={handleSubmit} />
                {isEditing && onCancel && (
                    <Button title="取消" onPress={onCancel} color="red" />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 16,
        elevation: 2,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 16,
        borderRadius: 4,
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

export default ContactForm;
