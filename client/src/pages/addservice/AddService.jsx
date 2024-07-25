import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import './AddService.css'; 
const AddService = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [deliveryTime, setDeliveryTime] = useState(0);
  const [cookies] = useCookies(["token"]);

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleCategoryChange(e) {
    setCategory(e.target.value);
  }

  function handlePriceChange(e) {
    setPrice(e.target.value);
  }

  function handleDeliveryTimeChange(e) {
    setDeliveryTime(e.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/service/add-service/${cookies.userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
        body: JSON.stringify({
          title,
          desc: description,
          category,
          price,
          deliveryTime,
        }),
      });
      console.log(await response.json());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-1 mx-auto form-container">
      <form className="p-5 row g-3" onSubmit={handleSubmit}>
        <div className="col-md-12">
          <label htmlFor="inputTitle" className="form-label">Title</label>
          <input type="text" className="form-control" id="inputTitle" value={title} onChange={handleTitleChange} required />
        </div>
        <div className="col-md-12">
          <label htmlFor="inputDescription" className="form-label">Description</label>
          <textarea className="form-control" id="inputDescription" value={description} onChange={handleDescriptionChange} required></textarea>
        </div>
        <div className="col-md-12">
          <label htmlFor="inputCategory" className="form-label">Category</label>
          <input type="text" className="form-control" id="inputCategory" value={category} onChange={handleCategoryChange} required />
        </div>
        <div className="col-md-12">
          <label htmlFor="inputPrice" className="form-label">Price</label>
          <input type="number" className="form-control" id="inputPrice" value={price} onChange={handlePriceChange} required />
        </div>
        <div className="col-md-12">
          <label htmlFor="inputDeliveryTime" className="form-label">Delivery Time (days)</label>
          <input type="number" className="form-control" id="inputDeliveryTime" value={deliveryTime} onChange={handleDeliveryTimeChange} required />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AddService;
