// Car data storage
let cars = JSON.parse(localStorage.getItem('cars')) || [];

// Function to render car listings
function renderCars(carsToRender = cars) {
  const carList = document.getElementById('car-list');
  carList.innerHTML = '';
  carsToRender.forEach((car, index) => {
    const carElement = document.createElement('div');
    carElement.classList.add('car-item');
    carElement.innerHTML = `
      ${car.imageUrl ? `<img src="${car.imageUrl}" alt="${car.year} ${car.make} ${car.model}" class="car-image">` : ''}
      <h3>${car.year} ${car.make} ${car.model}</h3>
      <p>Price: $${car.price}</p>
      <p>${car.description}</p>
      <button onclick="contactSeller(${index})">Contact Seller</button>
    `;
    carList.appendChild(carElement);
  });
}

// Function to add a new car
function addCar(event) {
  event.preventDefault();
  const car = {
    make: document.getElementById('car-make').value,
    model: document.getElementById('car-model').value,
    year: document.getElementById('car-year').value,
    price: document.getElementById('car-price').value,
    description: document.getElementById('car-description').value,
    imageUrl: document.getElementById('car-image').value
  };
  cars.push(car);
  localStorage.setItem('cars', JSON.stringify(cars));
  renderCars();
  event.target.reset();
}

// Function to contact seller (placeholder)
window.contactSeller = function(index) {
  alert(`Contact the seller for the ${cars[index].year} ${cars[index].make} ${cars[index].model}`);
}

// Function to search cars
function searchCars() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase();
  const filteredCars = cars.filter(car => 
    car.make.toLowerCase().includes(searchTerm) ||
    car.model.toLowerCase().includes(searchTerm) ||
    car.year.toString().includes(searchTerm) ||
    car.description.toLowerCase().includes(searchTerm)
  );
  renderCars(filteredCars);
}

// Function to scroll to add car form
function scrollToAddCarForm() {
  const addCarForm = document.getElementById('add-car-form');
  addCarForm.scrollIntoView({ behavior: 'smooth' });
}

// Event listeners
document.getElementById('car-form').addEventListener('submit', addCar);
document.getElementById('search-button').addEventListener('click', searchCars);
document.getElementById('search-input').addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    searchCars();
  }
});
document.getElementById('add-car-button').addEventListener('click', scrollToAddCarForm);

// Initial render
renderCars();