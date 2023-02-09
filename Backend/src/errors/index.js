import createError from "http-errors";

export const missingDataError = createError(404, 'Necessary data is missing')

export const noUserFoundError = createError(404, 'No user found')