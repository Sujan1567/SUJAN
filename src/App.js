import logo from './logo.svg';
import './App.css';
// import { RiDeleteBin6Fill } from "react-icons/ri";
// import { FaCheck } from "react-icons/fa";
import study from './Images/student.jpg';
import gandhi from './Images/gandhi.jpg';
import nepal from './Images/Nepal.png';
import { useEffect, useState } from 'react';
// import { FaEdit } from "react-icons/fa";
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // Adding the functionalities.
  const [newName, setnewName] = useState("");
  const [newNumber, setnewNumber] = useState("");
  const [newEmail, setnewEmail] = useState("");
  const [newCity, setnewCity] = useState("");
  const [newState, setnewState] = useState("");
  const [newDate, setnewDate] = useState("");
  const [newgender, setnewgender] = useState("");
  const [newGaurname, setnewGaurname] = useState("");
  const [newGaurnumber, setnewGaurnumber] = useState("");
  const [newid, setnewid] = useState("");
  const [newfile, setnewfile] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [iscompleted, setiscompleted] = useState(false);
  const [Todos, setTodos] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editName, setEditName] = useState("");
  const [editNumber, setEditNumber] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editCity, setEditCity] = useState("");
  const [editState, setEditState] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editgender, setEditgender] = useState("");
  const [editGaurname, setEditGaurname] = useState("");
  const [editGaurnumber, setEditGaurnumber] = useState("");
  const [editid, setEditid] = useState("");
  const [editfile, setEditfile] = useState("");
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showDeleteCompletedConfirmationModal, setShowDeleteCompletedConfirmationModal] = useState(false);
  const [deleteCompletedIndex, setDeleteCompletedIndex] = useState(null);
  const [showJoinConfirmationModal, setShowJoinConfirmationModal] = useState(false);
  const [joinConfirmationIndex, setJoinConfirmationIndex] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const handlesubmit = () => {
    // Check if any of the required fields are empty
    if (
      newName.trim() === "" ||
      newNumber.trim() === "" ||
      newEmail.trim() === "" ||
      newCity.trim() === "" ||
      newState.trim() === "" ||
      newDate.trim() === "" ||
      newgender.trim() === "" ||
      newGaurname.trim() === "" ||
      newGaurnumber.trim() === "" ||
      newid.trim() === "" ||
      newfile.trim() === ""
    ) {
      setShowToast(true);
      return;
    }

    let newTodoitem = {
      Name: newName,
      Number: newNumber,
      Email: newEmail,
      City: newCity,
      State: newState,
      Date: newDate,
      gender: newgender,
      Gaurname: newGaurname,
      Gaurnumber: newGaurnumber,
      id: newid,
      file: newfile
    }

    let updatedTodoArr = [...Todos];
    updatedTodoArr.push(newTodoitem);
    setTodos(updatedTodoArr);

    setnewName("");
    setnewNumber("");
    setnewEmail("");
    setnewCity("");
    setnewState("");
    setnewDate("");
    setnewgender("");
    setnewGaurname("");
    setnewGaurnumber("");
    setnewid("");
    setnewfile("");

    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));

  };

  //Making the function for the edition.
  const handleEdit = (index) => {
    const todoToEdit = Todos[index];
    setEditIndex(index);
    setEditName(todoToEdit.Name);
    setEditNumber(todoToEdit.Number);
    setEditEmail(todoToEdit.Email);
    setEditCity(todoToEdit.City);
    setEditState(todoToEdit.State);
    setEditDate(todoToEdit.Date);
    setEditgender(todoToEdit.gender);
    setEditGaurname(todoToEdit.Gaurname);
    setEditGaurnumber(todoToEdit.Gaurnumber);
    setEditid(todoToEdit.id);
    setEditfile(todoToEdit.file);
    setShowEditModal(true);
  };

  const handleSave = () => {
    let updatedTodoArr = [...Todos];
    updatedTodoArr[editIndex] = {
      Name: editName,
      Number: editNumber,
      Email: editEmail,
      City: editCity,
      State: editState,
      Date: editDate,
      gender: editgender,
      Gaurname: editGaurname,
      Gaurnumber: editGaurnumber,
      id: editid,
      file: editfile
    };
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
    handleCloseEditModal();
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditIndex(null);
    setEditName("");
    setEditNumber("");
    setEditEmail("");
    setEditCity("");
    setEditState("");
    setEditDate("");
    setEditgender("");
    setEditGaurname("");
    setEditGaurnumber("");
    setEditid("");
    setEditfile("");

  };

  const handleComplete = (index) => {
    // Set the index for the item being confirmed
    setJoinConfirmationIndex(index);
    setShowJoinConfirmationModal(true);
  };

  const handleJoinConfirmationConfirmed = () => {
    // Perform the completion actions (similar to the existing handleComplete logic)
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;

    let completedItem = {
      ...Todos[joinConfirmationIndex],
      completedOn: completedOn
    }

    let updatedCompleteArr = [...completedTodos];
    updatedCompleteArr.push(completedItem);
    setCompletedTodos(updatedCompleteArr);


    let updatedTodoArr = [...Todos];
    updatedTodoArr.splice(joinConfirmationIndex, 1);
    setTodos(updatedTodoArr);


    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompleteArr));

    // Close the join confirmation modal
    setShowJoinConfirmationModal(false);
  };

  const handleJoinConfirmationCancelled = () => {
    // Close the join confirmation modal without completing the action
    setShowJoinConfirmationModal(false);
    setJoinConfirmationIndex(null);
  };


  // Making the function for delete-button which help to delete the Tasks. 
  const handleDeleteTodo = (index) => {
    setDeleteIndex(index);
    setShowDeleteConfirmationModal(true);
  };

  const handleDeleteConfirmed = () => {
    let reducedTodo = [...Todos];
    reducedTodo.splice(deleteIndex, 1);

    // Removing the data from localStorage.
    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodos(reducedTodo);

    // Close the delete confirmation modal after deletion.
    setShowDeleteConfirmationModal(false);
    setDeleteIndex(null);
  };

  const handleDeleteCancelled = () => {
    // Close the delete confirmation modal without deletion.
    setShowDeleteConfirmationModal(false);
    setDeleteIndex(null);
  };



  //Making the Functions for operating the delete icons for the completed.
  const handleDeleteCompletedTodo = (index) => {
    setDeleteCompletedIndex(index);
    setShowDeleteCompletedConfirmationModal(true);
  };

  const handleDeleteCompletedConfirmed = () => {
    let reducedCompletedTodo = [...completedTodos];
    reducedCompletedTodo.splice(deleteCompletedIndex, 1);

    // Removing the data from localStorage.
    localStorage.setItem('completedTodos', JSON.stringify(reducedCompletedTodo));
    setCompletedTodos(reducedCompletedTodo);

    // Close the delete confirmation modal after deletion.
    setShowDeleteCompletedConfirmationModal(false);
    setDeleteCompletedIndex(null);
  };

  const handleDeleteCompletedCancelled = () => {
    // Close the delete confirmation modal without deletion.
    setShowDeleteCompletedConfirmationModal(false);
    setDeleteCompletedIndex(null);
  };


  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
    if (savedTodo) {
      setTodos(savedTodo);
    }

    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg" id='bar'>
        <div className="container-fluid">
          <a className="navbar-brand" href="#"><img src={study} className='img-fluid rounded-circle' alt='student' width="60px" />Student records.</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Details</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Records</a></li>
                  <li><a className="dropdown-item" href="#">performances</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Other details</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Attendence records</a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-light" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>

      {/* Making the quotation for students. */}
      <section class="vh-80" >
        <div class="container py-3 h-80">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col col-lg-9 col-xl-7">
              <div class="card" >
                <div class="card-body p-3">

                  <div class="text-center mb-4 pb-1">
                    <img src={gandhi} className='rounded-circle'
                      alt="Bulb" width="100" />
                  </div>

                  <figure class="text-center mb-0">
                    <blockquote class="blockquote">
                      <p class="pb-3">
                        <i class="fas fa-quote-left fa-xs text-primary"></i>
                        <span class="lead font-italic">Live as if you were to die tomorrow. Learn as if you were to live forever.</span>
                        <i class="fas fa-quote-right fa-xs text-primary"></i>
                      </p>
                    </blockquote>
                    <figcaption class="blockquote-footer mb-0">
                      Mahatma Gandhi
                    </figcaption>
                  </figure>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Making the form for the student to be updated. */}
      <div className='container mt-5 mb-4 rounded' id='data'>
        <form class="row g-3 needs-validation" novalidate>
          <h3 className='mb-4'>Student Form</h3>
          <div class="col-md-3">
            <label for="validationCustom01" class="form-label">Full name</label>
            <input type="text" class="form-control" value={newName} onChange={(e) => setnewName(e.target.value)} id="validationCustom01" required />
            <div class="valid-feedback">
              Looks good!
            </div>
          </div>
          <div class="col-md-3">
            <label for="validationCustom02" class="form-label">Address</label>
            <input type="text" value={newCity} onChange={(e) => setnewCity(e.target.value)} class="form-control" id="validationCustom02" required />
            <div class="valid-feedback">
              Looks good!
            </div>
          </div>
          <div class="col-md-3">
            <label for="validationCustomUsername" class="form-label">Email address</label>
            <div class="input-group has-validation">
              <span class="input-group-text" id="inputGroupPrepend">@</span>
              <input type="text" value={newEmail} onChange={(e) => setnewEmail(e.target.value)} class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" placeholder="name@example.com" required />
              <div class="invalid-feedback">
                Please choose a username.
              </div>
            </div>
          </div>

          <div class="col-md-3">
            <label for="validationCustom03" class="form-label">Phone number</label>
            <div class="input-group has-validation">
              <span class="input-group-text" id="inputGroupPrepend"><i class="bi bi-telephone-fill"></i></span>
              <input type="text" value={newNumber} onChange={(e) => setnewNumber(e.target.value)} class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required />
              <div class="invalid-feedback">
                Please choose a username.
              </div>
            </div>
          </div>


          <div class="col-md-3">
            <label for="validationCustom03" class="form-label">Gaurdain name</label>
            <input type="text" value={newGaurname} onChange={(e) => setnewGaurname(e.target.value)} class="form-control" id="validationCustom03" required />
            <div class="invalid-feedback">
              Please provide a valid city.
            </div>
          </div>


          <div class="col-md-3">
            <label for="validationCustom04" class="form-label">Guardian Contact number</label>
            <div class="input-group has-validation">
              <span class="input-group-text" id="inputGroupPrepend"><i class="bi bi-telephone-fill"></i></span>
              <input type="text" value={newGaurnumber} onChange={(e) => setnewGaurnumber(e.target.value)} class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required />
              <div class="invalid-feedback">
                Please enter contact number.
              </div>
            </div>
          </div>

          <div class="col-md-3">
            <label for="validationCustom04" class="form-label">State</label>
            <div class="input-group has-validation">
              <span class="input-group-text" id="inputGroupPrepend"><img src={nepal} width='20px' alt='' /></span>
              <select value={newState} onChange={(e) => setnewState(e.target.value)} class="form-select" id="validationCustom04" required>
                <option value="">Choose...</option>
                <option>Biratnagar</option>
                <option>Janakpur</option>
                <option>Bagmati</option>
                <option>Ganadki</option>
                <option>Lumbini</option>
                <option>Karnali</option>
                <option>Sudurpaschmin</option>
              </select>
              <div class="invalid-feedback">
                Please select a valid state.
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <label for="validationCustom05" class="form-label">Student ID</label>
            <input type="text" value={newid} onChange={(e) => setnewid(e.target.value)} class="form-control" id="validationCustom05" required />
            <div class="invalid-feedback">
              Please provide a valid student id.
            </div>
          </div>
          <div className='col-md-3'>
            <label for="validationCustom05" className="form-label">Choose gender</label>
            <div className="form-check">
              <input value="Male" checked={newgender === 'Male'} onChange={(e) => setnewgender(e.target.value)} class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
              <label className="form-check-label" for="flexRadioDefault1">
                Male
              </label>
            </div>
            <div className="form-check">
              <input value="Female" checked={newgender === 'Female'} onChange={(e) => setnewgender(e.target.value)} class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
              <label className="form-check-label" for="flexRadioDefault2">
                Female
              </label>
            </div>

          </div>

          <div className="col-md-3">
            <label for="validationCustom05" className="form-label">Date of birth</label>
            <input type="date" value={newDate} onChange={(e) => setnewDate(e.target.value)} class="form-control" id="validationCustom05" required />
            <div class="invalid-feedback">
              Please provide a valid date.
            </div>
          </div>

          <div className='col-md-3' >
            <label for="validationCustom05" className="form-label">Choose image</label>
            <input type="file" value={newfile} onChange={(e) => setnewfile(e.target.value)} class="form-control" aria-label="file example" required />
            <div class="invalid-feedback">Example invalid form file feedback</div>
          </div>


          <div class="col-12">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required />
              <label class="form-check-label" for="invalidCheck">
                Agree to terms and conditions
              </label>
              <div class="invalid-feedback">
                You must agree before submitting.
              </div>
            </div>
          </div>
          <div class="col-12">
            <button class="btn btn-primary" onClick={handlesubmit} type="submit">Submit form</button>
          </div>

          <div className="row pt-4 pb-3">
            <div className="col-4">
              <Button
                variant={` ${!iscompleted ? 'active' : 'red'}`}
                onClick={() => setiscompleted(false)}
                className="secbutton todo-button"
              // className='btn'

              >
                Joining
              </Button>
              <Button
                variant={` ${iscompleted ? 'active' : "green"}`}
                onClick={() => setiscompleted(true)}
                className="secbutton complete-button"
              // className='btn'

              >
                Already joined.
              </Button>


            </div>
          </div>
        </form>

      </div>

      {/* Making the conditions for submitting the form. */}
      <div className='container-fluid mt-4'>
        {/* Making the list of the incomplete list. */}
        {iscompleted === false && (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">S.NO</th>
                <th scope="col">Name</th>
                <th scope="col">Address</th>
                <th scope="col">Email</th>
                <th scope="col">Ph.number</th>
                <th scope="col">Gr.name</th>
                <th scope="col">Gr.number</th>
                <th scope="col">State</th>
                <th scope="col">Stud.id</th>
                <th scope="col">Gender</th>
                <th scope="col">birthdate</th>
                <th scope="col">Image</th>
                <th scope="col">Edit</th>

              </tr>
            </thead>
            <tbody>
              {Todos.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.Name}</td>
                  <td>{item.City}</td>
                  <td>{item.Email}</td>
                  <td>{item.Number}</td>
                  <td>{item.Gaurname}</td>
                  <td>{item.Gaurnumber}</td>
                  <td>{item.State}</td>
                  <td>{item.id}</td>
                  <td>{item.gender}</td>
                  <td>{item.Date}</td>
                  <td>{item.file}</td>
                  <td style={{ display: 'flex', gap: '25px' }}>
                    <i className="bi bi-trash3 text-danger" fontSize="25px" onClick={() => handleDeleteTodo(index)} ></i>
                    {/* <RiDeleteBin6Fill className="text-danger" fontSize="25px" onClick={() => handleDeleteTodo(index)} /> */}
                    <i class="bi bi-check-circle text-success" fontSize="20px" onClick={() => handleComplete(index)}></i>
                    {/* <FaCheck className="text-success" fontSize="20px" onClick={() => handleComplete(index)} /> */}
                    <i className="bi bi-pencil-square text-warning" fontSize="20px" onClick={() => handleEdit(index)}></i>
                    {/* <FaEdit className="text-warning" fontSize="20px" onClick={() => handleEdit(index)} /> */}

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {/* Making the modal for the deletion process. */}
        <Modal show={showDeleteConfirmationModal} onHide={handleDeleteCancelled}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this item?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDeleteCancelled}>
              No
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirmed}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Code for the modal for the edition. */}
        <Modal show={showEditModal} onHide={handleCloseEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Student data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>Full name</label>
            <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="form-control" required />
            <label>Address</label>
            <input type="tel" value={editCity} onChange={(e) => setEditCity(e.target.value)} className="form-control" required />
            <label>Email</label>
            <input type="text" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} className="form-control" required />
            <label>Phone number</label>
            <input type="text" value={editNumber} onChange={(e) => setEditNumber(e.target.value)} className="form-control" required />
            <label>Gaurdian name</label>
            <input type="text" value={editGaurname} onChange={(e) => setEditGaurname(e.target.value)} className="form-control" required />
            <label>Gaurdian number</label>
            <input type="text" value={editGaurnumber} onChange={(e) => setEditGaurnumber(e.target.value)} className="form-control" required />
            <label>State</label>
            <select value={editState} onChange={(e) => setEditState(e.target.value)} className="form-select" required>
              <option selected disabled value="">Choose...</option>
              <option>Biratnagar</option>
              <option>Janakpur</option>
              <option>Bagmati</option>
              <option>Ganadki</option>
              <option>Lumbini</option>
              <option>Karnali</option>
              <option>Sudurpaschmin</option>
              {/* ... Other options ... */}
            </select>
            <label>Stud.ID</label>
            <input type="text" value={editid} onChange={(e) => setEditid(e.target.value)} className="form-control" required />
            <label>Gender</label>
            <input type="text" value={editgender} onChange={(e) => setEditgender(e.target.value)} className="form-control" required />
            <label>Birth date</label>
            <input type="date" value={editDate} onChange={(e) => setEditDate(e.target.value)} className="form-control" required />
            <label>file</label>
            <input type="text" value={editfile} onChange={(e) => setEditfile(e.target.value)} className="form-control" required />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* //Making the modal for the check icon. */}
        <Modal show={showJoinConfirmationModal} onHide={handleJoinConfirmationCancelled}>
          <Modal.Header closeButton>
            <Modal.Title>Join Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to mark this student as ready to join the college?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleJoinConfirmationCancelled}>
              No
            </Button>
            <Button variant="success" onClick={handleJoinConfirmationConfirmed}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Making the toasts components. */}
        <div
          className={`toast show position-fixed ${showToast ? 'visible' : 'invisible'}`}
          style={{ top: '10px', right: '10px', zIndex: 9999 }}
        >
          <div className="toast-header">
            <strong className="me-auto text-danger"><i class="bi bi-ban text-danger" fontSize="25px"></i> Error</strong>
            <button type="button" className="btn-close" onClick={() => setShowToast(false)}></button>
          </div>
          <div className="toast-body">
            Please fill in all the required fields.
          </div>
        </div>




        {/* Making for the completed list. */}
        {iscompleted === true && (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">S.NO</th>
                <th scope="col">Name</th>
                <th scope="col">Address</th>
                <th scope="col">Email</th>
                <th scope="col">Ph.number</th>
                <th scope="col">Gr.name</th>
                <th scope="col">Gr.number</th>
                <th scope="col">State</th>
                <th scope="col">Stud.id</th>
                <th scope="col">Gender</th>
                <th scope="col">birthdate</th>
                <th scope="col">Image</th>
                <th scope="col">Edit</th>

              </tr>
            </thead>
            <tbody>
              {completedTodos.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.Name}</td>
                  <td>{item.City}</td>
                  <td>{item.Email}</td>
                  <td>{item.Number}</td>
                  <td>{item.Gaurname}</td>
                  <td>{item.Gaurnumber}</td>
                  <td>{item.State}</td>
                  <td>{item.id}</td>
                  <td>{item.gender}</td>
                  <td>{item.Date}</td>
                  <td>{item.file}</td>
                  <td style={{ display: 'flex', gap: '25px' }}>
                    <i className="bi bi-trash3 text-danger" fontSize="25px" onClick={() => handleDeleteCompletedTodo(index)} ></i>
                    {/* <RiDeleteBin6Fill className="text-danger" fontSize="25px" onClick={() => handleDeleteCompletedTodo(index)} /> */}
                    {/* <FaCheck className="text-success" fontSize="20px" />
                    <FaEdit className="text-warning" fontSize="20px" /> */}

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Code for the modal for the completed item deletion. */}
        <Modal show={showDeleteCompletedConfirmationModal} onHide={handleDeleteCompletedCancelled}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this completed item?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDeleteCompletedCancelled}>
              No
            </Button>
            <Button variant="danger" onClick={handleDeleteCompletedConfirmed}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>



      </div>


    </>

  );
}

export default App;
