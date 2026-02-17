function nameValidator(name) {
  if (typeof name !== "string") return false;
  if (name.trim() === "") return false;

  return true;
}

function numberValidator(num) {
  if (!num) return false;
  return /^[0-9]{10}$/.test(num);
}

function emailValidator(email) {
  if (typeof email !== "string") return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export { nameValidator, numberValidator, emailValidator };
