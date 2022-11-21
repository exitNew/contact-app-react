import "./App.css";
import List from "./List";
import { useState } from 'react';
import { uid } from "uid";

function App() {

  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'John Doe',
      phoneNumber: '088812314412',
    },
    {
      id: 2,
      name: 'Leon Bartoletti',
      phoneNumber: '(221) 372-7362 x9117',
    }
  ]);

  const [isUpdate, setIsUpdate] = useState({ id: null, status: false });

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
  });

  function handleChange(e) { // apabila user mengganti data pada text field maka isi target pada text field berubah
    let data = { ...formData };
    data[e.target.name] = e.target.value;
    setFormData(data);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // alert('oke')
    let data = [...contacts]

    if (formData.name === "") { // name form tidak boleh kosong 
      return false;
    }
    if (formData.phoneNumber === "") { // name phone number tidak boleh kosong 
      return false;
    }

    if (isUpdate.status) {
      // apabila true, lakukan update data
      data.forEach((contact) => {
        if (contact.id === isUpdate.id) {
          contact.name = formData.name;
          contact.phoneNumber = formData.phoneNumber;
        }
      });
    } else {
      // kalau statusnya false, lakukan insert data kedalam contacts
      data.push({
        id: uid(),
        name: formData.name,
        phoneNumber: formData.phoneNumber
      });
    }
    setContacts(data);

    if(isUpdate.status) {
      setIsUpdate({
        id: null,
        status: false,
      });
    }

    setFormData({ // mengkosongkan field text jika sudah dienter 
      id: "",
      name: "",
      phoneNumber: "",
    });
  }

  function handleEdit(id) {
    let data = [...contacts];
    let foundData = data.find((contact) => contact.id === id);

    setFormData({ // mengembalikan data kedalam text box
      name: foundData.name,
      phoneNumber: foundData.phoneNumber,
    });

    setIsUpdate({ id: id, status: true }); // ubah status menjadi update ketika user menekan handle edit
  }

  function handleDelete(id) {
    let data = [...contacts];
    let filterData = data.filter((contact) => contact.id !== id);
    setContacts(filterData);
  }

  return (
    <div className="App">
      <h1 className="px-3 py-3">My Contact List</h1>

      <form className="px-3 py-4" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            onChange={handleChange}
            value={formData.name}
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="">No. Telp</label>
          <input
            type="text"
            className="form-control"
            name="phoneNumber"
            onChange={handleChange}
            value={formData.phoneNumber}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Save
          </button>
        </div>
      </form>

      <List handleDelete={handleDelete} handleEdit={handleEdit} data={contacts} />
    </div>
  );
}

export default App;
