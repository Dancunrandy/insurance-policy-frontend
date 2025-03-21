import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.scss';

const Dashboard = () => {
  const [policies, setPolicies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    const response = await axios.get('http://localhost:3000/policies');
    setPolicies(response.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/policies/${id}`);
    fetchPolicies();
  };

  const filteredPolicies = policies.filter((policy) =>
    policy.policy_holder.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard">
      <h1>Insurance Policies</h1>
      <div className="search-add-container">
        <input
          type="text"
          placeholder="Search by policy holder"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => navigate('/add-policy')}>Add New Policy</button>
      </div>
      <ul className="policy-list">
        {filteredPolicies.map((policy) => (
          <li key={policy.id}>
            <div className="policy-info">
              <h2>{policy.policy_holder}</h2>
              <p>{policy.policy_number}</p>
              <p>${policy.premium_amount}</p>
            </div>
            <div className="policy-actions">
              <button className="edit" onClick={() => navigate(`/edit-policy/${policy.id}`)}>
                Edit
              </button>
              <button className="delete" onClick={() => handleDelete(policy.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;