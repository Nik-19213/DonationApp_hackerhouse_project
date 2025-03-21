// Convert ICP tokens to e8s (1 ICP = 100000000 e8s)
function tokenToE8s(amount) {
    return Math.round(Number(amount) * 100000000);
  }
  
  // Convert e8s to ICP tokens
  function e8sToToken(e8s) {
    return Number(e8s) / 100000000;
  }
  
  // Format timestamp to readable date
  function formatDate(timestamp) {
    const date = new Date(Number(timestamp) / 1000000); // Convert nanoseconds to milliseconds
    return date.toLocaleString();
  }
  
  // Extract principal ID to string
  function principalToString(principal) {
    if (!principal) return '';
    return principal.toString();
  }