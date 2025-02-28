import logging
import os

def setup_logging() -> logging.Logger:
    os.makedirs('logs', exist_ok=True) # ensure that the logs directory exists
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s: %(name)s - %(levelname)s - %(message)s (Line: %(lineno)d [%(filename)s])",
        datefmt="%d/%m/%Y %H:%M:%S",
        filename=os.path.join('logs', 'app.log'),  # Save log file inside the 'logs' directory
        filemode="w",
        encoding="utf-8"
    )

    logger = logging.getLogger(__name__)
    return logger

if __name__ == '__main__':
    logger = setup_logging()
    logger.debug("This is a debug message.")
    logger.info("This is an informational message.")
    logger.warning("This is a warning message.")
    logger.error("This is an error message.")
    logger.critical("This is a critical message.")


