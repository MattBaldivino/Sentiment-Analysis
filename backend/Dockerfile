# Use the official Python image as the base image
FROM python:3.1-slim

# Set the working directory
WORKDIR /Sentiment-Analysis

# Copy the requirements file into the container
COPY /Sentiment-Analysis/requirements.txt .

# Install the required Python packages
RUN pip install -r /Sentiment-Analysis/requirements.txt

# Copy the rest of the application code into the container
COPY .. .

# Expose the port that your Flask app listens on
EXPOSE 5000

# Start the Flask app
CMD ["python", "base.py"]