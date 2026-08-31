import { ENV } from "../utils/env.util";
import { logger } from "./logger";

export const ErrorLogger = (
    error?:  unknown,
    customMessage?: string,
) => {
    if (error instanceof Error) {
        logger.error({
            name: error.name,
            message: error.message,
            stack: ENV.NODE_ENV === "development" ? error.stack : "An error occured",
            customMessage,
        });
    } else {
        logger.error({
            message: "Unknown error",
            error,
            customMessage,
        });
    }
};
