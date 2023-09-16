import api from "./api";
import "../styles/trop_style.css";

console.log("Le POULET-MAYONNAISE.JS a démarré ! ");

// Function to create a new list item and add it to the DOM
function createListItem(title) {
    const listItem = document.createElement("li");
    listItem.classList.add("py-2");
    listItem.innerHTML = `
        <div class="flex items-center">
            <div>
                <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                    <i class="fas fa-fingerprint"></i>
                </span>
            </div>
            <div>
                <h4 class="text-gray-600">${title}</h4>
            </div>
        </div>
    `;
    return listItem;
}

const dayNamesFrench = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];

// Function to fetch data from the API and add it to the DOM
async function fetchDataAndPopulateList() {
    try {
      const dataList = document.querySelector("#list-none");
      const titleelement = document.querySelector("#titlesite");
      fetch("http://localhost:8000/api/entreesdujour", {
        method: "GET",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Request failed with status: ${res.status}`);
          }
          return res.json(); // Return the JSON Promise
        })
        .then((data) => {
          // Handle the JSON data here
          dataList.innerHTML = "";
          
          data.forEach((item) => {

            const title = item.jour;
            
            const titleItem = document.createElement("h2");
            titleItem.textContent = item.Nom; // You can set the text content
            titleItem.classList.add("text-lg");
            titleItem.classList.add("font-semibold");
            titleItem.classList.add("text-gray-800");
            titleItem.classList.add("mb-2"); // You can add CSS classes
            
            const descItem = document.createElement("p");
            descItem.textContent = item.Description; // You can set the text content
            descItem.classList.add("text-gray-600"); // You can add CSS classes

            const listItem = document.createElement("li");
            listItem.classList.add("list-none");
            listItem.classList.add("bg-indigo-200");
            listItem.classList.add("rounded-lg");
            listItem.classList.add("shadow-lg");
            listItem.classList.add("mb-4","pl-4");

            listItem.appendChild(titleItem);
            listItem.appendChild(descItem);
            console.log(listItem)
            const newTitle = "Saveurs de "+dayNamesFrench[title-1];
            titleelement.textContent = newTitle;
            // Append the li element to the parent ul element
            dataList.appendChild(listItem);
            
        });
          console.log(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });        
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Add an event listener for when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    fetchDataAndPopulateList(); // Call the function to fetch and populate data
});

console.log("Le POULET-MAYONNAISE.JS a été chargé ! ");
