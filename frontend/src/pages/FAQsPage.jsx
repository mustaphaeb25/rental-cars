import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './FAQsPage.css';

const faqs = [
  {
    id: "1",
    question: "What documents do I need to rent a car?",
    answer: "You typically need a valid driver's license (held for at least 1 year), a valid ID (passport or national ID card), and a credit card in the main driver's name for the security deposit."
  },
  {
    id: "2",
    question: "What is the minimum age to rent a car?",
    answer: "The minimum age to rent a car is usually 21 years old. Drivers aged 21-24 may be subject to a young driver surcharge, and certain car categories might have higher age restrictions."
  },
  {
    id: "3",
    question: "Can I pick up the car in one city and drop it off in another?",
    answer: "Yes, we offer one-way rentals between select locations. A one-way fee may apply, which will be specified during the booking process."
  },
  {
    id: "4",
    question: "What is included in the rental price?",
    answer: "Our standard rental price typically includes unlimited mileage, basic third-party liability insurance, and 24/7 roadside assistance. Additional insurance options and extras can be added during booking."
  },
  {
    id: "5",
    question: "How do I extend my rental period?",
    answer: "If you wish to extend your rental, please contact our customer service team as soon as possible. Extensions are subject to vehicle availability and may incur additional charges."
  },
];

const FAQItem = ({ faq, active, onToggle }) => {
  return (
    <div className={`faq-item ${active ? 'active' : ''}`}>
      <button className="faq-question" onClick={onToggle}>
        <span>{faq.question}</span>
        <div className="faq-icon">
          {active ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </button>
      <div className="faq-answer">
        <p>{faq.answer}</p>
      </div>
    </div>
  );
};

const FAQsPage = () => {
  const { darkMode } = useTheme();
  const [activeKey, setActiveKey] = useState(null);

  const handleToggle = (id) => {
    setActiveKey(activeKey === id ? null : id);
  };

  return (
    <div className={`new-faqs-page ${darkMode ? 'dark' : 'light'}`}>
      <header className="faqs-header">
        <div className="container">
          <h1>Frequently Asked Questions</h1>
          <p>Your questions, answered.</p>
        </div>
      </header>

      <div className="container">
        <div className="faqs-list">
          {faqs.map(faq => (
            <FAQItem
              key={faq.id}
              faq={faq}
              active={activeKey === faq.id}
              onToggle={() => handleToggle(faq.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQsPage;
