import { useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Form, Field, Input, SubmitButton } from './Form.styled';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from '../../redux/selectors';
import { addContact } from 'redux/operations';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const dispatch = useDispatch();

  const contacts = useSelector(getContacts);

  const onChangeInputValue = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'phone':
        setPhone(value);
        break;

      default:
        return;
    }
  };

  const onSubmitForm = e => {
    e.preventDefault();
    const contact = {
      name,
      phone,
    };
    const isExisted = contacts.find(contact => contact.name === name);
    reset();
    if (isExisted) {
      return Notify.warning(`${name} is already in contacts`);
    }
    dispatch(addContact(contact));
  };

  const reset = () => {
    setName('');
    setPhone('');
  };

  return (
    <Form onSubmit={onSubmitForm}>
      <Field>
        Name
        <Input
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+((['\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={onChangeInputValue}
        />
      </Field>
      <Field>
        Number
        <Input
          type="tel"
          name="phone"
          value={phone}
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={onChangeInputValue}
        />
      </Field>
      <SubmitButton type="submit">Add contact</SubmitButton>
    </Form>
  );
};

export default ContactForm;
