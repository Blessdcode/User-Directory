export function getInitials(value) {
  let result = "";
  const name = value.split(/\s/);
  for (let i = 0; i < name.length; i++) {
    result += name[i].substring(0, 1).toUpperCase();
  }
  return result;
}
