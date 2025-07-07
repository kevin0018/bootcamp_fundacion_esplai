export default class NocodbController {

  constructor(table, token) {
    this.apiUrl = `https://app.nocodb.com/api/v2/tables/${table}/records`;
    this.token = token;
  }

  getAllItems2() {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'xc-token': this.token
      }
    }

    return fetch(`${this.apiUrl}`, options)
      .then(x => x.json())
      .then(data => data.list)

  }


  async getAllItems() {
    const response = await fetch(`${this.apiUrl}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'xc-token': this.token
      }
    });
    const data = await response.json();
    return data.list;
  }

  async getItemById(id) {
    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'xc-token': this.token
      }
    });

    const data = await response.json();
    return data;
  }

  async createItem(nuevoItem) {
    const response = await fetch(`${this.apiUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xc-token': this.token
      },
      body: JSON.stringify(nuevoItem)
    });

    const data = await response.json();
    return data;
  }

  async updateItem(nuevosDatos, id) {
    nuevosDatos.Id = id
    const response = await fetch(`${this.apiUrl}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'xc-token': this.token
      },
      body: JSON.stringify(nuevosDatos)
    });

    const data = await response.json();
    return data;
  }

  async deleteItem(id) {
    const response = await fetch(`${this.apiUrl}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'xc-token': this.token
      },
      body: JSON.stringify({
        Id: id
      })
    });

    const data = await response.json();
    return data;
  }
}