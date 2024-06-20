class ValidationError extends Error {
    constructor(message) {
      super(message)
      this.name = "ValidationError"
      this.statusCode = 400
    }
}

class ForeignKeyConstraintError extends Error {
  constructor(message) {
      super(message)
      this.name = "ForeignKeyConstraintError"
      this.statusCode = 409
  }
}


module.exports = { ValidationError, ForeignKeyConstraintError }
