import React, { useState } from "react";
import Sweetpagination from "sweetpagination";
import Navbar from "../navbar";

export const CategoriesPage = () => {
  const [currentPageData, setCurrentPageData] = useState(Array(40).fill(false)); // Initialize all checkboxes as unchecked
  const [selectedItems, setSelectedItems] = useState([]); // Array to store selected items
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

  // const handleCheckboxChange = (index) => {
  //   const updatedData = [...currentPageData];
  //   updatedData[index] = !updatedData[index];


  //   const selectedItem = items[index];
  //   if (updatedData[index]) {
  //     setSelectedItems((prevItems) => [...prevItems, selectedItem]);
  //   } else {
  //     setSelectedItems((prevItems) =>
  //       prevItems.filter((item) => item !== selectedItem)
  //     );
  //   }

  //   fetch("your-backend-api-url/updateSelectedItems", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ selectedItems }),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Failed to update selected items");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error updating selected items:", error.message);
  //     });
  // };

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
            {currentPageData.map((isChecked, index) => (
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
                  checked={isChecked}
                  // onChange={() => handleCheckboxChange(index)}
                  style={{ height: "20px", width: "20px" }}
                />
                <label>{items[index]}</label>
              </div>
            ))}
            <Sweetpagination
              currentPageData={setCurrentPageData}
              getData={items}
              dataPerPage={6}
              // navigation={true}
              getStyle={"style-4"}
            />
          </div>
        </div>
      </div>
    </>
  );
};
