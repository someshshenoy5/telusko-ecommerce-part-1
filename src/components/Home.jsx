import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
      }
    };

    fetchData();
  }, []);

  if (isError) {
    return (
      <h2 className="text-center" style={{ padding: "10rem" }}>
        Something went wrong...
      </h2>
    );
  }

  return (
    <>
      <div className="grid">
        {products.map((product) => (
          <div
            className="card mb-3"
            key={product.id}
            style={{
              width: "18rem",
              height: "14rem",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 3px",
              margin: "10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              className="card-body"
              style={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "10px",
              }}
            >
              <div>
                <h5 className="card-title" style={{ margin: "0 0 10px 0" }}>
                  {product.name.toUpperCase()}
                </h5>
                <span className="card-brand">
                  by <i style={{ fontStyle: "italic" }}>{product.brand}</i>
                </span>
              </div>
              <div>
                <h5
                  className="card-text"
                  style={{ fontWeight: "600", margin: "10px 0" }}
                >
                  {"$" + product.price}
                </h5>
                <button
                  className="btn btn-primary"
                  style={{ width: "100%", marginTop: "15px" }}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
