export class ArrayHelpers {
  public static arrayToObject(array: Array<any>, keyField) {
    return array.reduce((obj, item) => {
      obj[item[keyField]] = item;
      return obj;
    }, {});
  }
}
