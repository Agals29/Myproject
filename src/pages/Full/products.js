import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Form,
  Pagination,
  Modal,
  Dropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../Full/products.css";
import { IoIosSettings } from "react-icons/io";
import {
  FaAngleDoubleRight,
  FaEye,
  FaTrash,
  FaEdit,
  FaPlus,
  FaBars,
} from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

export const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [showCatalogDropdown, setShowCatalogDropdown] = useState(false);
  const [productImage, setProductImage] = useState(null);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [filterStatus, setFilterStatus] = useState("All"); // State for filter by status

  const productsPerPage = 5;

  // Fetch products from API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  // Handle View, Edit, Delete
  const handleView = (id) => {
    const product = products.find((p) => p._id === id);
    setSelectedProduct(product);
    setShowViewModal(true);
  };

  const handleEdit = (id) => {
    const product = products.find((p) => p._id === id);
    setMainCategory(product.mainCategory);
    setSubCategory(product.subCategory);
    setProductImage(product.image);
    setPrice(product.price);
    setQuantity(product.quantity);
    setStatus(product.status);
    setEditMode(true);
    setEditId(id);
    setShowAddProductForm(true);
  };

  const handleDeleteClick = (id) => {
    setProductToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (productToDelete) {
      try {
        await axios.delete(
          `http://localhost:5000/api/products/${productToDelete}`
        );
        fetchProducts();
        setShowDeleteModal(false);
        setProductToDelete(null);
      } catch (error) {
        console.error("Error deleting product", error);
      }
    }
  };

  // Handle checkbox selection
  const handleCheckboxChange = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(
        selectedProducts.filter((productId) => productId !== id)
      );
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mainCategory || !subCategory || !price || !quantity || !status) {
      setError("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("mainCategory", mainCategory);
    formData.append("subCategory", subCategory);
    if (productImage) formData.append("image", productImage);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("status", status);

    try {
      if (editMode) {
        await axios.put(
          `http://localhost:5000/api/products/${editId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setEditMode(false);
        setEditId(null);
      } else {
        await axios.post("http://localhost:5000/api/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      fetchProducts();
      setMainCategory("");
      setSubCategory("");
      setProductImage(null);
      setPrice("");
      setQuantity("");
      setStatus("");
      setShowAddProductForm(false);
      setError("");
    } catch (error) {
      console.error("Error submitting product:", error);
      setError(
        "Failed to submit product. Please check your input and try again."
      );
    }
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Filter and search logic
  const filteredProducts = products.filter((product) => {
    const matchesSearchQuery =
      product.mainCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.price.toString().includes(searchQuery) ||
      product.status.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilterStatus =
      filterStatus === "All" || product.status === filterStatus;

    return matchesSearchQuery && matchesFilterStatus;
  });

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const renderPaginationItems = () => {
    const items = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => paginate(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    return items;
  };

  // Export functions (unchanged)
  const exportProductsToCSV = () => {
    if (selectedProducts.length === 0) {
      setShowExportModal(true);
      return;
    }
    const selectedProductsData = products.filter((product) =>
      selectedProducts.includes(product._id)
    );
    const csv = Papa.unparse(selectedProductsData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "products.csv");
  };

  const exportProductsToPDF = () => {
    if (selectedProducts.length === 0) {
      setShowExportModal(true);
      return;
    }
    const selectedProductsData = products.filter((product) =>
      selectedProducts.includes(product._id)
    );
    const doc = new jsPDF();
    const columns = [
      { title: "Main Category", dataKey: "mainCategory" },
      { title: "Sub Category", dataKey: "subCategory" },
      { title: "Price", dataKey: "price" },
      { title: "Quantity", dataKey: "quantity" },
      { title: "Status", dataKey: "status" },
      { title: "Image URL", dataKey: "image" },
    ];
    const rows = selectedProductsData.map((product) => ({
      mainCategory: product.mainCategory,
      subCategory: product.subCategory,
      price: `$${product.price}`,
      quantity: product.quantity,
      status: product.status,
      image: `http://localhost:5000/${product.image}`,
    }));
    doc.autoTable({
      columns: columns,
      body: rows,
      startY: 20,
      margin: { top: 20 },
      styles: { overflow: "linebreak" },
    });
    doc.save("products.pdf");
  };

  const exportProductsToExcel = () => {
    if (selectedProducts.length === 0) {
      setShowExportModal(true);
      return;
    }
    const selectedProductsData = products.filter((product) =>
      selectedProducts.includes(product._id)
    );
    const worksheet = XLSX.utils.json_to_sheet(selectedProductsData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
    XLSX.writeFile(workbook, "products.xlsx");
  };

  return (
    <Container fluid className="header-section">
      {/* Header Section */}
      <Row className="align-items-center py-3 bg-light border-bottom">
        <Col xs={12} md={6}>
          <h2 className="logo-admin-play ms-3 fw-bold">Administration</h2>
        </Col>
        <Col xs={12} md={6} className="d-flex justify-content-end">
          <button className="settings-admin">
            <IoIosSettings className="settings-icon" />
          </button>
        </Col>
      </Row>

      <Row>
        {/* Sidebar */}
        <Col
          md={2}
          className="column-left d-none d-md-block vh-103 bg-dark text-white"
          style={{ height: "300vh" }}
        >
          <div className="navigation-title mb-2">
            <FaBars /> NAVIGATION
          </div>
          <div className="col-for-menu p-3">
            <h5 className="mb-3">Categories</h5>
            <ul className="navigation-menu list-unstyled">
              <li
                className="drop-down-value"
                onClick={() => navigate("/dashboard")}
              >
                <AiFillDashboard /> Dashboard
              </li>
              <li
                className="drop-down-value"
                onClick={() => setShowCatalogDropdown(!showCatalogDropdown)}
              >
                <FaAngleDoubleRight /> Catalog
              </li>
              {showCatalogDropdown && (
                <ul className="sub-menu list-unstyled ms-3">
                  <li
                    className="drop-down-value"
                    onClick={() => navigate("/categories")}
                  >
                    <FaAngleDoubleRight /> Categories
                  </li>
                  <li
                    className="drop-down-value"
                    onClick={() => navigate("/products")}
                  >
                    <FaAngleDoubleRight /> Products
                  </li>
                </ul>
              )}
            </ul>
          </div>
        </Col>

        {/* Main Content */}
        <Col className="market-data p-4">
          <Container fluid>
            <h4 className="dashboard-data">Products</h4>
            <div className="d-flex justify-content-end mb-3">
              <Button
                variant="primary"
                onClick={() => setShowAddProductForm(!showAddProductForm)}
              >
                <FaPlus /> Add Product
              </Button>
            </div>
            <div
              className="d-flex justify-content-end gap-2"
              style={{ marginBottom: "20px" }}
            >
              <Button variant="success" onClick={exportProductsToCSV}>
                Export CSV
              </Button>
              <Button variant="danger" onClick={exportProductsToPDF}>
                Export PDF
              </Button>
              <Button variant="warning" onClick={exportProductsToExcel}>
                Export Excel
              </Button>
            </div>

            {/* Search and Filter Section */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Control
                  type="text"
                  placeholder="Search by category, price, or status"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Col>
              <Col md={3}>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="dropdown-filter">
                    Filter by Status: {filterStatus}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setFilterStatus("All")}>
                      All
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setFilterStatus("Available")}>
                      Available
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setFilterStatus("Out of Stock")}
                    >
                      Out of Stock
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
          </Container>

          {/* Product Form */}
          {showAddProductForm && (
            <Row className="justify-content-center">
              <Col md={10} className="product-form">
                <div
                  style={{
                    border: "2px solid black",
                    padding: "10px",
                    borderRadius: "5px",
                    width: "1040px",
                    height: "360px",
                    marginLeft: "-90px",
                  }}
                >
                  <h5>{editMode ? "Edit Product" : "Add Product"}</h5>
                  {error && <p className="text-danger ">{error}</p>}

                  <Form onSubmit={handleSubmit}>
                    <Row className="mb-3  ">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Main Category</Form.Label>
                          <Form.Control
                            type="text "
                            value={mainCategory}
                            onChange={(e) => setMainCategory(e.target.value)}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Sub Category</Form.Label>
                          <Form.Control
                            type="text"
                            value={subCategory}
                            onChange={(e) => setSubCategory(e.target.value)}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Product Image</Form.Label>
                          <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            required={!editMode}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={3}>
                        <Form.Group>
                          <Form.Label>Price</Form.Label>
                          <Form.Control
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col md={3}>
                        <Form.Group>
                          <Form.Label>Quantity</Form.Label>
                          <Form.Control
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Status</Form.Label>
                          <Form.Select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                          >
                            <option value="">Select Status</option>
                            <option value="Available">Available</option>
                            <option value="Out of Stock">Out of Stock</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>

                    <div className="d-flex justify-content-end">
                      <Button variant="primary" type="submit">
                        {editMode ? "Update Product" : "submit"}
                      </Button>
                    </div>
                  </Form>
                </div>
              </Col>
            </Row>
          )}

          {/* Product List */}
          <Row className="mt-4 ">
            <Col>
              <h5>Product List</h5>
              <Table
                striped
                bordered
                hover
                style={{
                  border: "2px solid black",
                  tableLayout: "fixed",
                  borderRadius: "5px",
                  width: "1000px",
                  marginLeft: "25px",
                }}
              >
                <thead>
                  <tr>
                    <th style={{ width: "5%", padding: "10px" }}>
                      <Form.Check
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedProducts(products.map((p) => p._id));
                          } else {
                            setSelectedProducts([]);
                          }
                        }}
                      />
                    </th>
                    <th style={{ width: "5%", padding: "10px" }}>S.No</th>
                    <th style={{ width: "20%", padding: "10px" }}>
                      Main Category
                    </th>
                    <th style={{ width: "20%", padding: "10px" }}>
                      Sub Category
                    </th>
                    <th
                      style={{
                        width: "10%",
                        padding: "10px",
                        textAlign: "left",
                      }}
                    >
                      Product Image
                    </th>
                    <th style={{ width: "10%", padding: "10px" }}>Price</th>
                    <th style={{ width: "10%", padding: "10px" }}>Quantity</th>
                    <th style={{ width: "10%", padding: "10px" }}>Status</th>
                    <th style={{ width: "13%", padding: "5px" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map((product, index) => (
                    <tr key={product._id}>
                      <td style={{ padding: "10px" }}>
                        <Form.Check
                          type="checkbox"
                          checked={selectedProducts.includes(product._id)}
                          onChange={() => handleCheckboxChange(product._id)}
                        />
                      </td>
                      <td style={{ padding: "10px" }}>
                        {filteredProducts.length -
                          (currentPage - 1) * productsPerPage -
                          index}
                      </td>
                      <td
                        style={{
                          maxWidth: "20%",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          padding: "10px",
                        }}
                      >
                        {product.mainCategory}
                      </td>
                      <td
                        style={{
                          maxWidth: "20%",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          padding: "10px",
                        }}
                      >
                        {product.subCategory}
                      </td>
                      <td style={{ padding: "10px" }}>
                        <img
                          src={`http://localhost:5000/${product.image}`}
                          alt={product.mainCategory}
                          style={{
                            width: "100%",
                            maxWidth: "100px",
                            height: "auto",
                            marginLeft: "2px",
                          }}
                        />
                      </td>
                      <td style={{ padding: "10px" }}>
                        $
                        {typeof product.price === "object"
                          ? product.price.amount
                          : product.price}
                      </td>
                      <td style={{ padding: "10px" }}>{product.quantity}</td>
                      <td style={{ padding: "10px" }}>{product.status}</td>
                      <td style={{ padding: "10px" }}>
                        <div className="d-flex gap-1">
                          <Button
                            size="sm"
                            variant="info"
                            onClick={() => handleView(product._id)}
                          >
                            <FaEye />
                          </Button>
                          <Button
                            size="sm"
                            variant="warning"
                            onClick={() => handleEdit(product._id)}
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleDeleteClick(product._id)}
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* Pagination */}
              <Pagination>
                <Pagination.Prev
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                />
                {renderPaginationItems()}
                <Pagination.Next
                  onClick={() =>
                    paginate(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Modal for Viewing Product Details */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <div>
              <p>
                <strong>Main Category:</strong> {selectedProduct.mainCategory}
              </p>
              <p>
                <strong>Sub Category:</strong> {selectedProduct.subCategory}
              </p>
              <p>
                <strong>Price:</strong> ${selectedProduct.price}
              </p>
              <p>
                <strong>Quantity:</strong> {selectedProduct.quantity}
              </p>
              <p>
                <strong>Status:</strong> {selectedProduct.status}
              </p>
              <div>
                <strong>Product Image:</strong>
                <img
                  src={`http://localhost:5000/${selectedProduct.image}`}
                  alt={selectedProduct.mainCategory}
                  style={{ width: "100px", marginTop: "10px" }}
                />
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Export Confirmation Modal */}
      <Modal show={showExportModal} onHide={() => setShowExportModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Export Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please select at least one product to export.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowExportModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
