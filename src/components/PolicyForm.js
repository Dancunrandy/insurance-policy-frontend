import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './PolicyForm.scss';

const PolicyForm = () => {
  const [policy, setPolicy] = useState({
    policy_number: '',
    policy_holder: '',
    premium_amount: '',
    coverage_details: '',
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchPolicy();
    }
  }, [id]);

  const fetchPolicy = async () => {
    const response = await axios.get(`http://localhost:3000/policies/${id}`);
    setPolicy(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.put(`http://localhost:3000/policies/${id}`, policy);
    } else {
      await axios.post('http://localhost:3000/policies', policy);
    }
    navigate('/');
  };

  return (
    <div className="policy-form">
      <h1>{id ? 'Edit Policy' : 'Add New Policy'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Policy Number</label>
          <input
            type="text"
            placeholder="Policy Number"
            value={policy.policy_number}
            onChange={(e) => setPolicy({ ...policy, policy_number: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Policy Holder</label>
          <input
            type="text"
            placeholder="Policy Holder"
            value={policy.policy_holder}
            onChange={(e) => setPolicy({ ...policy, policy_holder: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Premium Amount</label>
          <input
            type="number"
            placeholder="Premium Amount"
            value={policy.premium_amount}
            onChange={(e) => setPolicy({ ...policy, premium_amount: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Coverage Details</label>
          <textarea
            placeholder="Coverage Details"
            value={policy.coverage_details}
            onChange={(e) => setPolicy({ ...policy, coverage_details: e.target.value })}
            rows="4"
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default PolicyForm;