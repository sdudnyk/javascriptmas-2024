export class LocalStorage {
  get(key){
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  }
}
