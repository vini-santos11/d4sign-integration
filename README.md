# d4sign Integration

This repository contains code for integrating with d4sign, a digital signature platform. The integration allows you to automatically download files from d4sign using cron.

## Prerequisites

Before you can use this integration, make sure you have the following:

- An account with d4sign
- Access to a server or machine where you can set up cron jobs
- The necessary credentials to authenticate with d4sign's API

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/your-username/d4sign-integration.git
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Configure the integration by updating the `.env` file with your d4sign API credentials. Use .env.example as example

## Usage

To use the integration, follow these steps:

1. Set up a cron job on your server or machine to run the `downloadFiles.js` script every hour:

   npm start

This cron job will run the script every hour, downloading 100 files from d4sign.
