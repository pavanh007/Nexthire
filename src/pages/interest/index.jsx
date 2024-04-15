import React, { useEffect, useState } from "react";
import Navbar from "../navbar";
import classnames from "classnames";

export const CategoriesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalItems = 40; 
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const [selectedItems, setSelectedItems] = useState([]); 
  const items = [
    "Shirt",
    "Pants",
    "Shoes",
    "Hat",
    "Jacket",
    "Socks",
    "Dress",
    "Skirt",
    "Tie",
    "Gloves",
    "Scarf",
    "Belt",
    "Sunglasses",
    "Handbag",
    "ShirtOne",
    "PantsOne",
    "ShoesOne",
    "HatOne",
    "JacketOne",
    "SocksOne",
    "DressOne",
    "SkirtOne",
    "TieOne",
    "GlovesOne",
    "ScarfOne",
    "BeltOne",
    "SunglassesOne",
    "HandbagOne",
    "ShirtTwo",
    "PantsTwo",
    "ShoesTwo",
    "HatTwo",
    "JacketTwo",
    "SocksTwo",
    "DressTwo",
    "SkirtTwo",
    "TieTwo",
    "GlovesTwo",
    "ScarfTwo",
    "BeltTwo",
    "SunglassesTwo",
    "HandbagTwo",
  ];

useEffect(() => {
  const userEmail = sessionStorage.getItem("email");
  if (userEmail) {
    fetchInterests(userEmail);
  }
}, []);

const fetchInterests = async (userEmail) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/user/v1/interest?email=${userEmail}`,
      { method: "GET" }
    );
    if (response.status === 200) {
      const data = await response.json();
      setSelectedItems(data.data || []);
    } else {
      throw new Error("Failed to fetch user interests");
    }
  } catch (error) {
    alert("Failed to fetch user interests: " + error.message); 
  }
};
  const handleCheckboxChange = (index) => {
    const selectedItem = items[index];
    if (selectedItems.includes(selectedItem)) {
      setSelectedItems((prevItems) =>
        prevItems.filter((item) => item !== selectedItem)
      );
    } else {
      setSelectedItems((prevItems) => [...prevItems, selectedItem]);
    }

    const email = sessionStorage.getItem("email");
    fetch("http://localhost:3001/api/user/v1/interest", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, interests: selectedItems }),
    })
      .then((response) => {
        if (!response.status === 200) {
          throw new Error("Failed to update selected items");
        }
      })
      .catch((error) => {
        alert("Error updating selected items:", error.message);
      });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);




  return (
    <>
      <Navbar />
      <div
        style={{
          height: "100vh",
          backgroundColor: "#fff",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            height: "500px",
            width: "500px",
            backgroundColor: "white",
            padding: "30px",
            margin: "50px",
            border: "0.5px solid black",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            color: "black",
          }}
        >
          <h2 style={{ color: "#000" }}>Please mark your interests!</h2>
          <h3 style={{ color: "#000", marginBottom: "25px" }}>
            We will keep you notified.
          </h3>
          <h5
            style={{ display: "flex", justifyContent: "start", width: "70%" }}
          >
            My saved interests!
          </h5>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {items.slice(startIndex, endIndex).map((item, index) => (
              <div
                key={index}
                style={{
                  width: "90%",
                  alignSelf: "center",
                  padding: "5px",
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                <input
                  type="checkbox"
                  name="shoppingItem"
                  checked={selectedItems.includes(item)}
                  onChange={() => handleCheckboxChange(index + startIndex)}
                  style={{ height: "20px", width: "20px" }}
                />
                <label
                  className={classnames({
                    "selected-item": selectedItems.includes(item),
                    "not-selected-item": !selectedItems.includes(item),
                  })}
                >
                  {item}
                </label>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "20px" }}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                style={{
                  margin: "0 5px",
                  padding: "5px 10px",
                  cursor: "pointer",
                  backgroundColor:
                    currentPage === i + 1 ? "#ccc" : "black",
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
