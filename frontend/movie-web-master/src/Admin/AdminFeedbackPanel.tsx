import React, { useState, useEffect } from 'react';
import { Feedback } from './feedback.interface'; // Import the Feedback interface

const AdminFeedbackPanel = () => {
  const [feedbackData, setFeedbackData] = useState<Feedback[]>([]); // Apply the type here

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        // Fetch feedback data from your backend API
        const response = await fetch('/api/feedback'); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch feedback data');
        }
        const data = await response.json();
        setFeedbackData(data);
      } catch (error) {
        console.error('Error fetching feedback data:', error);
      }
    };

    fetchFeedbackData();
  }, []);

  return (
    <div>
      <h1>Admin Feedback Panel</h1>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Movie ID</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {feedbackData.map((feedback) => (
            <tr key={feedback._id}>
              <td>{feedback.userId?.username || 'N/A'}</td>
              <td>{feedback.movieId}</td>
              <td>{feedback.command}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminFeedbackPanel;
