const ProtectedRoute = ({ children }) => {
  console.log("ProtectedRoute rendered"); // For debug
  return children; // Just render children without any checks
};

export default ProtectedRoute;
