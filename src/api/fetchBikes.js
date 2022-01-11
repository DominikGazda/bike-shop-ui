import axios from "axios";

export async function fetchItems() {
  try {
    const response = await axios({
      method: "GET",
      url: "http://localhost:8765/api/bikes",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.data;
  } catch (error) {
    console.log("Test erroru");
  }
}
