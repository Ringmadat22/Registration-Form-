// src/components/ContentList.js
import React, { useState, useEffect } from 'react';
import api from '../components/api';

function ContentList() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get('/posts');
        setContent(response.data);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Content List</h1>
      <ul>
        {content.map(item => (
          <li key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContentList;
