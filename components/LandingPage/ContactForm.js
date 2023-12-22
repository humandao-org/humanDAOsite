import React, { useState } from 'react';
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import axios from 'axios'; // Assumes you will use Axios for HTTP requests

const ContactForm = ({ blok }) => {
  const initialFormData = {
    name: '',
    email: '',
    //phone: '',
    //company: '',
    message: '',
    accept: true,
  };

  // Style objects
  const successTextStyle = {
    fontWeight: 'bold',
    marginTop: '2rem',
    border: 'solid 2px',
    borderColor: '#0E6165',
    backgroundColor: '#0e61654f',
    borderRadius: '5px',
    textAlign: 'center',
    padding: '1rem',
    color: 'white',
  };

  const errorTextStyle = {
    color: '#b71234',
    fontSize: '0.75rem',
    marginTop: '0.25rem',
  };

  const failureTextStyle = {
    fontWeight: 'bold',
    marginTop: '2rem',
    border: 'solid 2px',
    color: 'white',
    borderColor: '#b71234',
    backgroundColor: '#b712344f',
    borderRadius: '5px',
    textAlign: 'center',
    padding: '1rem',
  };
  
  const initialErrors = {
    name: false,
    email: false,
    message: false,
    accept: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);
  const [emailSent, setEmailSent] = useState(false);
  const [formInvalid, setFormInvalid] = useState(false);
  const [sendError, setSendError] = useState(false);

  const isFieldInvalid = (field, value) => {
    if (field === 'email') {
      return !validateEmail(value);
    } else if (field === 'accept') {
      if (blok.conditions) {
        return !value;
      }
    } else if (!value || value.trim() === '') {
      return true;
    }
    return false;
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateField = (field) => {
    let error = isFieldInvalid(field, formData[field]);
    // Update the errors state to reflect the latest field's validity
    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
  };

  const sendEmail = async () => {
    // Create an object to accumulate current validation results
    let currentErrors = {};
    for (const field in formData) {
      // Direct check instead of using setState to avoid async delay
      currentErrors[field] = isFieldInvalid(field, formData[field]);
    }

    // Update the error state with new validation results
    setErrors(currentErrors);

    // Check for any validation errors in the currentErrors object
    const anyInvalid = Object.values(currentErrors).some((error) => error);
    console.log('sendiong email', anyInvalid)

    if (!anyInvalid) {
      setFormInvalid(false)
      setSendError(false);
      try {
        const response = await axios.post('https://pocket-assistant-api.vercel.app/api/automation/contact', formData);
        console.log(response)
        if (response.status === 200) {
          setEmailSent(true);
          setFormData(initialFormData); // Clear the form data
        } else {
          setSendError(true);
        }
      } catch (error) {
        console.log(error)
        setSendError(true);
      }
    } else {
      setFormInvalid(true);
    }
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="space-y-4" {...storyblokEditable(blok)}>
      <div>
        { blok.use_labels && <label className="block text-sm font-medium mb-1" htmlFor="name">Name:</label> }
        <input
          className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
          type="text"
          placeholder={blok.use_placeholders ? "Name" : undefined}
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={() => validateField('name')}
        />
        {errors.name && <div className="text-xs text-red-500 mt-1">This field must be filled.</div>}
      </div>
      
      <div>
        { blok.use_labels && <label className="block text-sm font-medium mb-1" htmlFor="email">Email:</label> }
        <input
          className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
          type="text"
          placeholder={blok.use_placeholders ? "Email" : undefined}
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={() => validateField('email')}
        />
        {errors.email && <div className="text-xs text-red-500 mt-1">Invalid email address!</div>}
      </div>

      <div className="py-4">
        { blok.use_labels && <label className="block text-sm font-medium mb-1" htmlFor="message">Message:</label> }
        <textarea
          className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 h-32"
          placeholder={blok.use_placeholders ? "Message" : undefined}
          name="message"
          id="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={() => validateField('message')}
        ></textarea>
        {errors.message && <div className="text-xs text-red-500 mt-1">This field must be filled.</div>}
      </div>

      { blok.conditions && 
      <div className="flex items-start">
        <input
          className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          type="checkbox"
          name="accept"
          id="accept"
          checked={formData.accept}
          onChange={handleChange}
        />
        <label htmlFor="accept" className="ml-2 block text-sm text-gray-900">
          {blok.conditions}
        </label>
      </div>}
      {blok.conditions && errors.accept && <div className="text-xs text-red-500 mt-1">Kindly accept the conditions.</div>}

      { blok.button && <StoryblokComponent methodToCall={sendEmail} blok={blok.button[0]} key={blok._uid} /> }
      { !blok.button && <button
        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none"
        onClick={sendEmail}
      >
        Send
      </button> }
      {emailSent && <div style={successTextStyle}>Thank you for your message. It was delivered successfully.</div>}
      {formInvalid && <div style={errorTextStyle}>Please correct the errors in the form.</div>}
      {sendError && <div style={failureTextStyle}>The message could not be sent. Please try again later.</div>}
    </div>
  );

};

export default ContactForm;