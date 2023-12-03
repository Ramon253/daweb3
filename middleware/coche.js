const cochesKeys = ["modelo", "cv", "precio"];

module.exports = {
  checkBodyCoche: (coche) => {
    coche = coche.filter((key) => cochesKeys.includes(key));
    return coche.length === 3;
  }
};