import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Form,
  Modal,
  Pagination,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IoIosSettings } from "react-icons/io";
import {
  FaAngleDoubleRight,
  FaBars,
  FaEye,
  FaTrash,
  FaEdit,
} from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import axios from "axios";
import "../Full/categories.css";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Papa from "papaparse";


export const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [menu, setMenu] = useState("");
  const [subMenu, setSubMenu] = useState("");
  const [status, setStatus] = useState("enabled");
  const [showCatalogDropdown, setShowCatalogDropdown] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // New state for delete confirmation modal
  const [viewCategory, setViewCategory] = useState(null);
  const [editCategory, setEditCategory] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null); // New state to store the category to delete
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/categories")
      .then((response) => {
        // Sort by createdAt in descending order
        const sortedData = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setCategories(sortedData);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const currentCategories = [...categories]
    .reverse()
    .slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (menu && subMenu) {
      const newCategory = { menu, subMenu, status };

      axios
        .post("http://localhost:5000/api/categories", newCategory)
        .then((response) => {
          // Add the new category at the beginning of the array
          setCategories((prevCategories) => [response.data, ...prevCategories]);
          setMenu("");
          setSubMenu("");
          setStatus("enabled");
        })
        .catch((error) => console.error("Error adding category:", error));
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((categoryId) => categoryId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCategories(currentCategories.map((category) => category._id));
    } else {
      setSelectedCategories([]);
    }
  };

  const handleView = (category) => {
    setViewCategory(category);
    setShowViewModal(true);
  };

  const handleEdit = (category) => {
    console.log("Editing category:", category); // Debugging log
    setEditCategory(category);
    setShowEditModal(true);
  };

  const handleUpdate = () => {
    if (!editCategory || !editCategory._id) {
      console.error("No category selected for update.");
      return;
    }

    console.log("Updating category:", editCategory); // Debugging log

    axios
      .put(
        `http://localhost:5000/api/categories/${editCategory._id}`,
        editCategory
      )
      .then((response) => {
        console.log("Update successful:", response.data);

        // Update categories state
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category._id === editCategory._id ? response.data : category
          )
        );

        setShowEditModal(false); // Close modal
        setEditCategory(null); // Reset state
      })
      .catch((error) => {
        console.error("Error updating category:", error);
      });
  };

  const handleDeleteClick = (id) => {
    setCategoryToDelete(id); // Set the category ID to delete
    setShowDeleteModal(true); // Show the delete confirmation modal
  };

  const handleDeleteConfirm = () => {
    if (categoryToDelete) {
      axios
        .delete(`http://localhost:5000/api/categories/${categoryToDelete}`)
        .then((response) => {
          setCategories((prevCategories) =>
            prevCategories.filter(
              (category) => category._id !== categoryToDelete
            )
          );
          setShowDeleteModal(false); // Close the modal
          setCategoryToDelete(null); // Reset the state
        })
        .catch((error) => console.error("Error deleting category:", error));
    }
  };

  const exportToCSV = () => {
    const csv = Papa.unparse(categories);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "categories.csv");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["Menu", "Sub Menu", "Status"]],
      body: categories.map((category) => [
        category.menu,
        category.subMenu,
        category.status,
      ]),
    });
    doc.save("categories.pdf");
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(categories);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Categories");
    XLSX.writeFile(workbook, "categories.xlsx");
  };

  return (
    <Container fluid className="header-section">
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

      <Row className="col-for-dropdown">
        <Col md={2} className="column-left vh-100 bg-dark text-white">
          <div className="col-for-menu p-3">
            <div className="navigation-title mb-2">
              <FaBars /> NAVIGATION
            </div>
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

        <Col className="market-data p-4 color">
          <Container fluid className="border border border-secondary py-4">
            <div className="dashboard-value d-flex justify-content-between">
              <h4 className="dashboard-data">Categories</h4>
              

              <div>
                <Button
                  variant="success"
                  onClick={exportToCSV}
                  className="me-2"
                >
                  Export to CSV
                </Button>
                <Button variant="danger" onClick={exportToPDF} className="me-2">
                  Export to PDF
                </Button>
                <Button variant="primary" onClick={exportToExcel}>
                  Export to Excel
                </Button>
              </div>
            </div>

            <Form onSubmit={handleSubmit} className="mt-3">
              <Row>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Main category</Form.Label>
                    <Form.Control
                      type="text"
                      value={menu}
                      onChange={(e) => setMenu(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Sub category</Form.Label>
                    <Form.Control
                      type="text"
                      value={subMenu}
                      onChange={(e) => setSubMenu(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="enabled">Enabled</option>
                      <option value="disabled">Disabled</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-flex justify-content-end mt-2">
                <Button type="submit">Submit</Button>
              </div>
            </Form>
          </Container>

          <Row className="mt-4 p-2">
            <Col className="border border border-secondary py-4">
              <h5>Category List</h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>
                      <Form.Check type="checkbox" onChange={handleSelectAll} />
                    </th>
                    <th>S.No</th>
                    <th>Menu</th>
                    <th>Sub Menu</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCategories.length > 0 ? (
                    currentCategories.map((category, index) => {
                      // Calculate the serial number in descending order
                      const serialNumber =
                        categories.length - (indexOfFirstItem + index);
                      return (
                        <tr key={category._id}>
                          <td>
                            <Form.Check
                              type="checkbox"
                              checked={selectedCategories.includes(
                                category._id
                              )}
                              onChange={() =>
                                handleCheckboxChange(category._id)
                              }
                            />
                          </td>
                          <td>{serialNumber}</td>
                          <td>{category.menu}</td>
                          <td>{category.subMenu}</td>
                          <td>{category.status}</td>
                          <td>
                            <Button
                              variant="info"
                              size="sm"
                              onClick={() => handleView(category)}
                            >
                              <FaEye />
                            </Button>
                            <Button
                              variant="warning"
                              size="sm"
                              className="ms-2"
                              onClick={() => handleEdit(category)}
                            >
                              <FaEdit />
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              className="ms-2"
                              onClick={() => handleDeleteClick(category._id)}
                            >
                              <FaTrash />
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No Categories Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
              <Pagination className="justify-content-center">
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />
                {Array.from({ length: totalPages }, (_, i) => (
                  <Pagination.Item
                    key={i + 1}
                    active={i + 1 === currentPage}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* View Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>View Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewCategory && (
            <div>
              <p>
                <strong>Menu:</strong> {viewCategory.menu}
              </p>
              <p>
                <strong>Sub Menu:</strong> {viewCategory.subMenu}
              </p>
              <p>
                <strong>Status:</strong> {viewCategory.status}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editCategory && (
            <Form>
              <Form.Group>
                <Form.Label>Main category</Form.Label>
                <Form.Control
                  type="text"
                  value={editCategory.menu}
                  onChange={(e) =>
                    setEditCategory({ ...editCategory, menu: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Sub category</Form.Label>
                <Form.Control
                  type="text"
                  value={editCategory?.subMenu || ""}
                  onChange={(e) =>
                    setEditCategory({
                      ...editCategory,
                      subMenu: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={editCategory.status}
                  onChange={(e) =>
                    setEditCategory({ ...editCategory, status: e.target.value })
                  }
                >
                  <option value="enabled">Enabled</option>
                  <option value="disabled">Disabled</option>
                </Form.Select>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this category?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
