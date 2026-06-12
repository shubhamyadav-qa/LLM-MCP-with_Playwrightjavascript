const fs = require('fs');
const path = require('path');

class DataUtil {
  static loadTestData(filename) {
    const filePath = path.join(__dirname, '..', 'test-data', filename);
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  }

  static generateRandomString(length = 8) {
    return Math.random().toString(36).substring(2, length + 2);
  }

  static getCurrentDate() {
    return new Date().toISOString().split('T')[0];
  }

  static getCurrentDateTime() {
    return new Date().toISOString();
  }
}

//module.exports = DataUtil;