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
import type { Room } from "./room.types";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Table, TableHead, TableRow, TableCell } from "../ui/table";
import { Modal } from "../ui/modal";

const initialRoom: Omit<Room, "id"> = {
  number: 0,
  capacity: 0,
  rent: 0,
  remarks: "",
  customers: [],
};

const RoomList: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [customers, setCustomers] = useState<any[]>([]); // Add state for customers
  const [form, setForm] = useState<Omit<Room, "id">>(initialRoom);
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<{ open: boolean; id: string | null }>({
    open: false,
    id: null,
  });

  const fetchRooms = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "rooms"));
    const data: Room[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Room[];
    setRooms(data);
    setLoading(false);
  };

  // Fetch customers for dropdown
  const fetchCustomers = async () => {
    const querySnapshot = await getDocs(collection(db, "customers"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCustomers(data);
  };

  useEffect(() => {
    fetchRooms();
    fetchCustomers(); // Fetch customers on mount
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "number" || name === "capacity" || name === "rent" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      // Update
      await updateDoc(doc(db, "rooms", editId), form);
      setEditId(null);
    } else {
      // Add
      await addDoc(collection(db, "rooms"), form);
    }
    setForm(initialRoom);
    setModalOpen(false);
    fetchRooms();
  };

  const handleEdit = (room: Room) => {
    setEditId(room.id);
    setForm({ ...room, id: undefined } as Omit<Room, "id">);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    setConfirmDelete({ open: true, id });
  };

  const confirmDeleteRoom = async () => {
    if (confirmDelete.id) {
      await deleteDoc(doc(db, "rooms", confirmDelete.id));
      fetchRooms();
    }
    setConfirmDelete({ open: false, id: null });
  };

  const openAddModal = () => {
    setEditId(null);
    setForm(initialRoom);
    setModalOpen(true);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Room List</h2>
      <Button onClick={openAddModal} className="mb-6 bg-blue-500 text-white px-4 py-2 rounded shadow">
        Add Room
      </Button>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? "Update Room" : "Add Room"}>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="number" className="mb-1 font-medium">
              Room Number
            </label>
            <Input
              id="number"
              name="number"
              type="number"
              placeholder="Room Number"
              value={form.number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="capacity" className="mb-1 font-medium">
              Capacity
            </label>
            <Input
              id="capacity"
              name="capacity"
              type="number"
              placeholder="Capacity"
              value={form.capacity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="rent" className="mb-1 font-medium">
              Rent
            </label>
            <Input
              id="rent"
              name="rent"
              type="number"
              placeholder="Rent"
              value={form.rent}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="remarks" className="mb-1 font-medium">
              Remarks
            </label>
            <Input
              id="remarks"
              name="remarks"
              type="text"
              placeholder="Remarks"
              value={form.remarks}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="customers" className="mb-1 font-medium">Customers</label>
            <select
              id="customers"
              name="customers"
              multiple
              value={form.customers}
              onChange={e => {
                const selected = Array.from(e.target.selectedOptions, option => option.value);
                setForm(prev => ({ ...prev, customers: selected }));
              }}
              className="border p-2 rounded"
            >
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>{customer.name}</option>
              ))}
            </select>
            <small className="text-gray-500">Hold Ctrl (Windows) or Cmd (Mac) to select multiple</small>
          </div>
          <div className="flex gap-2 md:col-span-2 mt-2">
            <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded shadow">
              {editId ? "Update" : "Add"} Room
            </Button>
            <Button
              type="button"
              onClick={() => {
                setModalOpen(false);
                setEditId(null);
                setForm(initialRoom);
              }}
              className="text-gray-500 bg-gray-200 px-4 py-2 rounded shadow"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      <Modal
        open={confirmDelete.open}
        onClose={() => setConfirmDelete({ open: false, id: null })}
        title="Confirm Delete"
      >
        <div className="py-4">
          <p className="mb-4">Are you sure you want to delete this room?</p>
          <div className="flex gap-2 justify-end">
            <Button onClick={confirmDeleteRoom} className="bg-red-500 text-white px-4 py-2 rounded shadow">
              Delete
            </Button>
            <Button
              onClick={() => setConfirmDelete({ open: false, id: null })}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded shadow"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <Table className="bg-white rounded-lg shadow min-w-[700px]">
            <thead>
              <TableRow>
                <TableHead className="text-left text-lg font-semibold bg-blue-100">Number</TableHead>
                <TableHead className="text-left text-lg font-semibold bg-blue-100">Capacity</TableHead>
                <TableHead className="text-left text-lg font-semibold bg-blue-100">Rent</TableHead>
                <TableHead className="text-left text-lg font-semibold bg-blue-100">Remarks</TableHead>
                <TableHead className="text-left text-lg font-semibold bg-blue-100">Customers</TableHead>
                <TableHead className="text-left text-lg font-semibold bg-blue-100">Actions</TableHead>
              </TableRow>
            </thead>
            <tbody>
              {rooms.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                    No rooms found.
                  </TableCell>
                </TableRow>
              ) : (
                rooms.map((room) => (
                  <TableRow key={room.id} className="hover:bg-blue-50 transition">
                    <TableCell>{room.number}</TableCell>
                    <TableCell>{room.capacity}</TableCell>
                    <TableCell>{room.rent}</TableCell>
                    <TableCell>{room.remarks}</TableCell>
                    <TableCell>{room.customers.join(", ")}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleEdit(room)}
                        className="text-blue-600 mr-2 bg-blue-50 hover:bg-blue-200 px-2 py-1 rounded"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(room.id)}
                        className="text-red-600 bg-red-50 hover:bg-red-200 px-2 py-1 rounded"
                      >
                        Delete
                      </Button>
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

export default RoomList;