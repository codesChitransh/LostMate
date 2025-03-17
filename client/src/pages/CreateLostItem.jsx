import React, { useState } from "react";
import axios from "axios";


const CreateLostItem = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    dateLost: "",
    contactInfo: "",
    images: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  
  const categories = ["Electronics", "Documents", "Clothing", "Jewellery", "Accessories", "Others"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });

  
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData.images.forEach((image) => {
          data.append("images", image);
        });
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post("server/lost/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}` 
        }
      });

      alert("Lost item reported successfully!");
      setFormData({ title: "", description: "", category: "", location: "", dateLost: "", contactInfo: "", images: [] });
      setImagePreviews([]);
    } catch (error) {
      console.error("Error reporting lost item:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Report a Lost Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required className="w-full p-2 border rounded" />
        
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="w-full p-2 border rounded" />
        
        <select name="category" value={formData.category} onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Select Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>

        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required className="w-full p-2 border rounded" />

        <input type="date" name="dateLost" value={formData.dateLost} onChange={handleChange} required className="w-full p-2 border rounded" />

        <input type="text" name="contactInfo" placeholder="Contact Information" value={formData.contactInfo} onChange={handleChange} required className="w-full p-2 border rounded" />

        <input type="file" multiple accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded" />

        {imagePreviews.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {imagePreviews.map((src, index) => (
              <img key={index} src={src} alt="Preview" className="w-20 h-20 object-cover rounded" />
            ))}
          </div>
        )}

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default CreateLostItem;
