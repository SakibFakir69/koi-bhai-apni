

const tokendFinder = () => {
  const token = localStorage.getItem("token-userId");
  console.log(token, "token");

  if (!token) {
    return null; // or undefined
  }

  
  return token;
};

export default tokendFinder;
