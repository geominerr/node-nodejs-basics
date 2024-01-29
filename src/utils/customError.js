class CustomError extends Error {
  constructor({ name, path, description, message }) {
    super(message || 'FS operation failed');
    this.name = name;
    this.path = path;
    this.description = description;
  }
}

export default CustomError;
