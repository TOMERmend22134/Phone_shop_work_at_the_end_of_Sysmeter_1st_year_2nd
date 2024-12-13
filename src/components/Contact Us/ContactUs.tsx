import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import styles from "./contactus.module.css";

export default function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    emailjs.send('service_xsw4gtb', 'template_zns3ipr', { name, email, message, phoneNumber }, 'EXJwMadS5WkmmYCID')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      }, (err) => {
        console.log('FAILED...', err);
      });

    setName('');
    setEmail('');
    setMessage('');
    setPhoneNumber('');
  };

  return (
    <form className={styles['form-container']} onSubmit={sendEmail}>
      <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" />
      <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" />
      <input type="tel" name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Your Phone Number" />
      <textarea name="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" />
      <input type="submit" value="Send" />
    </form>
  );
};
