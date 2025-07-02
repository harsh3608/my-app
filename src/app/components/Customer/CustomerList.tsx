import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import type { Customer } from "./customer.types";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Table, TableHead, TableRow, TableCell } from "../ui/table";
import { Modal } from "../ui/modal";

const initialCustomer: Omit<Customer, "id"> = {
  name: "",
  phone: "",
  roomNumber: 0,
  rent: 0,
  joiningDate: "",
  age: 0,
  address: "",
  adhaarNumber: "",
};

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [rooms, setRooms] = useState<any[]>([]); // Add state for rooms
  const [form, setForm] = useState<Omit<Customer, "id">>(initialCustomer);
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<{ open: boolean; id: string | null }>({ open: false, id: null });

  const fetchCustomers = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "customers"));
    const data: Customer[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Customer[];
    setCustomers(data);
    setLoading(false);
  };

  // Fetch rooms for dropdown
  const fetchRooms = async () => {
    const querySnapshot = await getDocs(collection(db, "rooms"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setRooms(data);
  };

  useEffect(() => {
    fetchCustomers();
    fetchRooms(); // Fetch rooms on mount
  }, []);

  // Enhanced handleChange to support select (roomNumber) and input fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // For roomNumber, ensure value is a number or empty string
    if (name === "roomNumber") {
      setForm((prev) => ({
        ...prev,
        roomNumber: value === "" ? 0 : Number(value),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: ["rent", "age"].includes(name) ? Number(value) : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await updateDoc(doc(db, "customers", editId), form);
      setEditId(null);
    } else {
      await addDoc(collection(db, "customers"), form);
    }
    setForm(initialCustomer);
    setModalOpen(false);
    fetchCustomers();
  };

  const handleEdit = (customer: Customer) => {
    setEditId(customer.id);
    setForm({ ...customer, id: undefined } as Omit<Customer, "id">);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    setConfirmDelete({ open: true, id });
  };

  const confirmDeleteCustomer = async () => {
    if (confirmDelete.id) {
      await deleteDoc(doc(db, "customers", confirmDelete.id));
      fetchCustomers();
    }
    setConfirmDelete({ open: false, id: null });
  };

  const openAddModal = () => {
    setEditId(null);
    setForm(initialCustomer);
    setModalOpen(true);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Customer List</h2>
      <Button onClick={openAddModal} className="mb-6 bg-blue-500 text-white px-4 py-2 rounded shadow">Add Customer</Button>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? "Update Customer" : "Add Customer"}>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 font-medium">Name</label>
            <Input id="name" name="name" type="text" placeholder="Name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="mb-1 font-medium">Phone</label>
            <Input id="phone" name="phone" type="text" placeholder="Phone" value={form.phone} onChange={handleChange} required />
          </div>
          <div className="flex flex-col">
            <label htmlFor="roomNumber" className="mb-1 font-medium">Room Number</label>
            <select
              id="roomNumber"
              name="roomNumber"
              value={form.roomNumber === 0 ? "" : String(form.roomNumber)}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            >
              <option value="">Select Room</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.number}>{room.number}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="rent" className="mb-1 font-medium">Rent</label>
            <Input id="rent" name="rent" type="number" placeholder="Rent" value={form.rent} onChange={handleChange} required />
          </div>
          <div className="flex flex-col">
            <label htmlFor="joiningDate" className="mb-1 font-medium">Joining Date</label>
            <Input id="joiningDate" name="joiningDate" type="date" placeholder="Joining Date" value={form.joiningDate} onChange={handleChange} required />
          </div>
          <div className="flex flex-col">
            <label htmlFor="age" className="mb-1 font-medium">Age</label>
            <Input id="age" name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} required />
          </div>
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="address" className="mb-1 font-medium">Address</label>
            <Input id="address" name="address" type="text" placeholder="Address" value={form.address} onChange={handleChange} required />
          </div>
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="adhaarNumber" className="mb-1 font-medium">Adhaar Number</label>
            <Input id="adhaarNumber" name="adhaarNumber" type="text" placeholder="Adhaar Number" value={form.adhaarNumber} onChange={handleChange} required />
          </div>
          <div className="flex gap-2 md:col-span-2 mt-2">
            <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded shadow">
              {editId ? "Update" : "Add"} Customer
            </Button>
            <Button type="button" onClick={() => { setModalOpen(false); setEditId(null); setForm(initialCustomer); }} className="text-gray-500 bg-gray-200 px-4 py-2 rounded shadow">Cancel</Button>
          </div>
        </form>
      </Modal>
      <Modal open={confirmDelete.open} onClose={() => setConfirmDelete({ open: false, id: null })} title="Confirm Delete">
        <div className="py-4">
          <p className="mb-4">Are you sure you want to delete this customer?</p>
          <div className="flex gap-2 justify-end">
            <Button onClick={confirmDeleteCustomer} className="bg-red-500 text-white px-4 py-2 rounded shadow">Delete</Button>
            <Button onClick={() => setConfirmDelete({ open: false, id: null })} className="bg-gray-200 text-gray-700 px-4 py-2 rounded shadow">Cancel</Button>
          </div>
        </div>
      </Modal>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <Table className="bg-white rounded-xl shadow min-w-[900px]">
            <thead>
              <TableRow>
                <TableHead className="text-left text-lg font-semibold bg-blue-100">Name</TableHead>
                <TableHead className="text-left text-lg font-semibold bg-blue-100">Phone</TableHead>
                <TableHead className="text-left text-lg font-semibold bg-blue-100">Room</TableHead>
                <TableHead className="text-left text-lg font-semibold bg-blue-100">Rent</TableHead>
                <TableHead className="text-left text-lg font-semibold bg-blue-100">Joining Date</TableHead>
                <TableHead className="text-left text-lg font-semibold bg-blue-100">Age</TableHead>
                <TableHead className="text-left text-lg font-semibold bg-blue-100">Address</TableHead>
                <TableHead className="text-left text-lg font-semibold bg-blue-100">Adhaar</TableHead>
                <TableHead className="text-left text-lg font-semibold bg-blue-100">Actions</TableHead>
              </TableRow>
            </thead>
            <tbody>
              {customers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-6 text-gray-500">No customers found.</TableCell>
                </TableRow>
              ) : (
                customers.map((customer) => (
                  <TableRow key={customer.id} className="hover:bg-blue-50 transition">
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.roomNumber}</TableCell>
                    <TableCell>{customer.rent}</TableCell>
                    <TableCell>{customer.joiningDate}</TableCell>
                    <TableCell>{customer.age}</TableCell>
                    <TableCell>{customer.address}</TableCell>
                    <TableCell>{customer.adhaarNumber}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleEdit(customer)} className="text-blue-600 mr-2 bg-blue-50 hover:bg-blue-200 px-2 py-1 rounded">Edit</Button>
                      <Button onClick={() => handleDelete(customer.id)} className="text-red-600 bg-red-50 hover:bg-red-200 px-2 py-1 rounded">Delete</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default CustomerList;