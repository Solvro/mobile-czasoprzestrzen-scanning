FROM python:3.6

# The enviroment variable ensures that the python output is set straight
# to the terminal with out buffering it first
ENV PYTHONUNBUFFERED 1

# create root directory for our project in the container
RUN mkdir /scanning_app
                                                                                                                                                
# Set the working directory to /scanning_app
WORKDIR /scanning_app

# Copy the current directory contents into the container at /scanning_app
ADD . /scanning_app/

RUN apt-get update
RUN apt-get install -y python-dev default-libmysqlclient-dev
RUN apt-get install -y python3-dev

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt
