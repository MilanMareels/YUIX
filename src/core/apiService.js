const cache = new Map();

export async function getApi(url) {
  if (cache.has(url)) {
    console.log(`[Cache] Hit: ${url}`);
    return cache.get(url);
  }

  console.log(`[API] Fetch: ${url}`);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    cache.set(url, data);

    return data;
  } catch (error) {
    console.error(`Fout bij getApi(${url}):`, error);
    throw error;
  }
}

export async function postApi(url, body) {
  console.log(`[API] Post: ${url}`);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Fout bij postApi(${url}):`, error);
    throw error;
  }
}
