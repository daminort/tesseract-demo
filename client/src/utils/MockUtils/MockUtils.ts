class MockUtils {

  static parseJSON<T>(json: string): T {
    let result = {};
    try {
      result = JSON.parse(json);
    } catch (error: unknown) {
      // nothing
    }

    return (result as unknown as T);
  }
}

export {
  MockUtils,
};
