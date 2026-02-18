const UserList = ({ datas, handleDelete, handleEdit }) => {
  return (
    <div>
      {datas.map((user) => (
        <div key={user.id} className="user-card">
          <b>{user.firstName} {user.lastName}</b>
          <p>Phone: {user.phone}</p>
          <p>Email: {user.email}</p>
          <button onClick={() => handleEdit(user.id)}>Edit</button>
          <button onClick={() => handleDelete(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default UserList;


