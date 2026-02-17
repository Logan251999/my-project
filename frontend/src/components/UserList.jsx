const UserList = ({ datas, handleDelete, handleEdit }) => {
  return (
    <div>
      <h1>user list</h1>
      <ul>
        {datas.map((user) => (
          <li key={user.id}>
            <b>
              {user.firstName} {user.lastName}
            </b>
            <br />
            Phone: {user.phone}
            <br />
            Email: {user.email}
            <button onClick={() => handleEdit(user.id)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
