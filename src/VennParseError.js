class VennParseError extends Error {
    constructor(errorIndex, ...params) {
        super(...params);

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.hasOwnProperty("captureStackTrace")) {
            Error.captureStackTrace(this, VennParseError);
        }

        this.errorIndex = errorIndex;
    }
}

export default VennParseError;