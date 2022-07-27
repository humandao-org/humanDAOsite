export async function registerAffiliate(data) {
  const url = 'https://pocket-assistant-api.vercel.app/api/affiliate'
  console.log(typeof data)
  console.log(JSON.stringify(data))
  const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'text/plain'
      }
  })
  
  if (response.status >= 200 && response.status < 300) {
    let reply = await response.json();
    return { success: true, message: reply.message, id: reply.id }
  } else {
    let reply = await response.json();
    return { success: false, message: reply.message, status: response.status }
  }
  // throw new Error(`Error with code ${response?.status}`);  
}

export async function registerReservation(data) {
  const url = 'https://pocket-assistant-api.vercel.app/api/reservation'
  console.log(typeof data)
  console.log(JSON.stringify(data))
  const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'text/plain'
      }
  })
  
  if (response.status >= 200 && response.status < 300) {
    let reply = await response.json();
    return { success: true, message: reply.message, id: reply.id }
  } else {
    let reply = await response.json();
    return { success: false, message: reply.message, status: response.status }
  }
  // throw new Error(`Error with code ${response?.status}`);  
}