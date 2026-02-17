import { useEffect, useState } from "react";
import {
  nameValidator,
  emailValidator,
  numberValidator,
} from "../utils/validators";
import { createUser, updateUser } from "../services/userservices";
import { userFormFields } from "../config/userFormConfig";

const UserForm = ({ clearSelectedUser, setSelectedUser, getData }) => {
  const validators = {
    nameValidator,
    emailValidator,
    numberValidator,
  };

  const initialForm = userFormFields.reduce(
    (acc, field) => ({ ...acc, [field.name]: "" }),
    {},
  );
  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  console.log(userFormFields);

  useEffect(() => {
    if (clearSelectedUser && clearSelectedUser.length > 0) {
      const user = clearSelectedUser[0];

      const populate = userFormFields.reduce((acc, field) => {
        console.log(`fld`, field);

        acc[field.name] = user[field.name] || "";

        console.log(`acc`, acc);

        return acc;
      }, {});

      setFormData(populate);
    }
  }, [clearSelectedUser]);

  async function handleSubmit(e) {
    e.preventDefault();

    for (let field of userFormFields) {
      const validatorFunc = validators[field.validator];
      if (validatorFunc && !validatorFunc(formData[field.name])) {
        alert(`${field.label} is invalid`);
        return;
      }
    }

    try {
      if (clearSelectedUser && clearSelectedUser.length > 0) {
        const user = clearSelectedUser[0];
        await updateUser(user.id, formData);
        setSelectedUser(null);
        setSubmitting(true);
      } else {
        await createUser(formData);
        setSubmitting(true);
      }

      setFormData(initialForm);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
      getData();
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {userFormFields.map((field) => (
          <div key={field.name}>
            <label>{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
            />
          </div>
        ))}

        <button type="submit" disabled={submitting}>
          {submitting
            ? "Saving..."
            : clearSelectedUser?.length > 0
              ? "Update User"
              : "Create User"}
        </button>
      </form>
    </>
  );
};

export default UserForm;
