const fmtPersonResponse = (person: string) => {
  if (!person) return;
  const personDetails = person.split(" | ");
  return {
    email: personDetails[0],
    name: personDetails[1],
  };
};
export default fmtPersonResponse;

