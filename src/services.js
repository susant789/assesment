import { url_api, token } from "./constants";

export async function fetchProducts() {
  const res = await fetch(`${url_api}/products`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.ok) {
    const data = await res.json();
    return data.products;
  }
}

export async function fetchColors() {
  const res = await fetch(`${url_api}/colors`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.ok) {
    const data = await res.json();
    return data.colors;
  }
}
export async function fetchMaterial() {
  const res = await fetch(`${url_api}/material`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.ok) {
    const data = await res.json();
    return data.material;
  }
}
export async function fetchFeatured() {
  const res = await fetch(`${url_api}/featured`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.ok) {
    const data = await res.json();
    return data.featured;
  }
}
