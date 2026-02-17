import { useContext, useState } from "react";
import UserForm from "../components/UserForm";
import Loader from "../components/Loader";
import UserList from "../components/UserList";
import { ContextContext } from "../context/useContext";
import { deleteUser, updateUser } from "../services/userservices";
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
    <div>
      {loading && <Loader />}
      {error && <div style={{ color: "red" }}>Error: {error}</div>}{" "}
      {!loading && !error && (
        <>
          <UserForm
            clearSelectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            getData={getData}
          />
          <UserList
            datas={data}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
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
