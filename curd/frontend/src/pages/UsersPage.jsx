import { useContext, useState } from "react";
import UserForm from "../components/UserForm";
import Loader from "../components/Loader";
import UserList from "../components/UserList";
import { ContextContext } from "../context/useContext";
import { deleteUser } from "../services/userservices";
import ConfirmDialog from "../components/ConfirmDialog";

const UsersPage = () => {
  const { data, loading, error, getData } = useContext(ContextContext);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  async function handleEdit(id) {
    const user = data.find((d) => d.id === id);
    setSelectedUser(user ? [user] : null);
  }

  function handleDelete(id) {
    setDeleteId(id);
    setShowDialog(true);
  }

  async function confirmDelete() {
    if (!deleteId) return;
    try {
      await deleteUser(deleteId);
      getData();
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setShowDialog(false);
      setDeleteId(null);
    }
  }

  function cancelDelete() {
    setShowDialog(false);
    setDeleteId(null);
  }

  return (
    <div className="app-container">
      {loading && <Loader />}
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      {!loading && !error && (
        <>
          {/* Form Card - Centered */}
          <div className="card user-form-card">
            <UserForm
              clearSelectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              getData={getData}
            />
          </div>

          {/* User List Card - Left aligned */}
          <div className="card user-list">
            <h2>User List</h2>
            <UserList
              datas={data}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          </div>

          {/* Confirm Dialog */}
          <ConfirmDialog
            isOpen={showDialog}
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
          />
        </>
      )}
    </div>
  );
};

export default UsersPage;
