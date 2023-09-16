function api() {
  const getEntreesDuJour = () => {
    return fetch("http://localhost:8000/api/entreesdujour", {
      method: "GET",
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Request failed with status: ${res.status}`);
      }
      return res.json();
    });
  };

  return {
    getEntreesDuJour,
  };
}
